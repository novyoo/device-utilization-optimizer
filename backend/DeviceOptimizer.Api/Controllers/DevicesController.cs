using Microsoft.AspNetCore.Mvc;
using DeviceOptimizer.Api.DTOs;
using DeviceOptimizer.Api.Models;
using DeviceOptimizer.Api.Services;

namespace DeviceOptimizer.Api.Controllers
{
    [ApiController]
    [Route("api/devices")]
    public class DevicesController : ControllerBase
    {
        private readonly IDeviceService _deviceService;

        public DevicesController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        // GET /api/devices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeviceDto>>> GetAllDevices()
        {
            var devices = await _deviceService.GetAllDevicesAsync();
            return Ok(devices.Select(MapToDto));
        }

        // GET /api/devices/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DeviceDto>> GetDeviceById(int id)
        {
            var device = await _deviceService.GetDeviceByIdAsync(id);
            if (device == null)
                return NotFound($"Device with Id {id} was not found.");

            return Ok(MapToDto(device));
        }

        // POST /api/devices
        [HttpPost]
        public async Task<ActionResult<DeviceDto>> CreateDevice(CreateDeviceDto dto)
        {
            var device = new Device
            {
                TenantId = dto.TenantId, // now string = string, no cast needed
                DeviceName = dto.DeviceName,
                AssignedUser = dto.AssignedUser,
                LastActiveDate = dto.LastActiveDate ?? DateTime.UtcNow,
                Status = DeviceStatus.Active
            };

            var created = await _deviceService.CreateDeviceAsync(device);
            return CreatedAtAction(nameof(GetDeviceById), new { id = created.Id }, MapToDto(created));
        }

        // PUT /api/devices/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<DeviceDto>> UpdateDevice(int id, CreateDeviceDto dto)
        {
            var existing = await _deviceService.GetDeviceByIdAsync(id);
            if (existing == null)
                return NotFound($"Device with Id {id} was not found.");

            existing.TenantId = dto.TenantId; // now string = string, no cast needed
            existing.DeviceName = dto.DeviceName;
            existing.AssignedUser = dto.AssignedUser;
            if (dto.LastActiveDate.HasValue)
                existing.LastActiveDate = dto.LastActiveDate.Value;

            var success = await _deviceService.UpdateDeviceAsync(existing);
            if (!success)
                return StatusCode(500, "Failed to update device.");

            var updated = await _deviceService.GetDeviceByIdAsync(id);
            return Ok(MapToDto(updated!));
        }

        // DELETE /api/devices/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            var deleted = await _deviceService.DeleteDeviceAsync(id);
            if (!deleted)
                return NotFound($"Device with Id {id} was not found.");

            return NoContent();
        }

        // POST /api/devices/{id}/checkin
        [HttpPost("{id}/checkin")]
        public async Task<ActionResult<DeviceDto>> CheckIn(int id)
        {
            var existing = await _deviceService.GetDeviceByIdAsync(id);
            if (existing == null)
                return NotFound($"Device with Id {id} was not found.");

            var success = await _deviceService.CheckInDeviceAsync(id);
            if (!success)
                return StatusCode(500, "Failed to check in device.");

            var updated = await _deviceService.GetDeviceByIdAsync(id);
            return Ok(MapToDto(updated!));
        }

        // POST /api/devices/{id}/return
        [HttpPost("{id}/return")]
        public async Task<ActionResult<DeviceDto>> MarkReturned(int id)
        {
            var existing = await _deviceService.GetDeviceByIdAsync(id);
            if (existing == null)
                return NotFound($"Device with Id {id} was not found.");

            var success = await _deviceService.MarkAsReturnedAsync(id);
            if (!success)
                return StatusCode(500, "Failed to mark device as returned.");

            var updated = await _deviceService.GetDeviceByIdAsync(id);
            return Ok(MapToDto(updated!));
        }

        // GET /api/devices/tenant-utilization
        [HttpGet("tenant-utilization")]
        public async Task<ActionResult<IEnumerable<TenantUtilizationDto>>> GetTenantUtilization()
        {
            var summaryDict = await _deviceService.GetTenantUtilizationAsync();

            var result = summaryDict.Select(kvp => new TenantUtilizationDto
            {
                TenantId = kvp.Key, 
                TotalDevices = kvp.Value.TotalDevices,
                ActiveDevices = kvp.Value.ActiveDevices,
                IdleDevices = kvp.Value.IdleDevices,
                ReturnedDevices = kvp.Value.ReturnedDevices,
                UtilizationPercentage = kvp.Value.UtilizationRate
            });

            return Ok(result);
        }

        private static DeviceDto MapToDto(Device device)
        {
            return new DeviceDto
            {
                Id = device.Id,
                TenantId = device.TenantId, // now string = string, no cast needed
                DeviceName = device.DeviceName,
                AssignedUser = device.AssignedUser,
                LastActiveDate = device.LastActiveDate,
                Status = device.Status.ToString(),
                DaysSinceLastActive = (int)(DateTime.UtcNow - device.LastActiveDate).TotalDays
            };
        }
    }
}