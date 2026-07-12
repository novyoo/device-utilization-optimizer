using DeviceOptimizer.Api.Models;
using DeviceOptimizer.Api.Repositories;

namespace DeviceOptimizer.Api.Services
{
    public class DeviceService : IDeviceService
    {
        private readonly IDeviceRepository _repository;
        private readonly int _idleThresholdDays;

        public DeviceService(IDeviceRepository repository, IConfiguration config)
        {
            _repository = repository;

            _idleThresholdDays = config.GetValue<int?>("IdleSettings:IdleThresholdDays") ?? 7;
        }

        public async Task<List<Device>> GetAllDevicesAsync()
        {
            var devices = await _repository.GetAllAsync();
            devices.ForEach(RecalculateStatus);
            return devices;
        }

        public async Task<Device?> GetDeviceByIdAsync(int id)
        {
            var device = await _repository.GetByIdAsync(id);
            if (device != null) RecalculateStatus(device);
            return device;
        }

        public async Task<Device> CreateDeviceAsync(Device device)
        {
            // A freshly created device counts as active
            device.LastActiveDate = DateTime.UtcNow;
            device.Status = DeviceStatus.Active;
            await _repository.AddAsync(device);
            return device;
        }

        public async Task<bool> UpdateDeviceAsync(Device device)
        {
            var existing = await _repository.GetByIdAsync(device.Id);
            if (existing == null) return false;

            existing.TenantId = device.TenantId;
            existing.DeviceName = device.DeviceName;
            existing.AssignedUser = device.AssignedUser;
            existing.LastActiveDate = device.LastActiveDate;
            existing.Status = device.Status;

            await _repository.UpdateAsync(existing);
            return true;
        }

        public async Task<bool> DeleteDeviceAsync(int id)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return false;

            await _repository.DeleteAsync(id);
            return true;
        }

        public async Task<bool> CheckInDeviceAsync(int id)
        {
            var device = await _repository.GetByIdAsync(id);
            if (device == null) return false;

            device.LastActiveDate = DateTime.UtcNow;
            device.Status = DeviceStatus.Active;
            await _repository.UpdateAsync(device);
            return true;
        }

        public async Task<bool> MarkAsReturnedAsync(int id)
        {
            var device = await _repository.GetByIdAsync(id);
            if (device == null) return false;

            // Returned is a manual
            device.Status = DeviceStatus.Returned;
            await _repository.UpdateAsync(device);
            return true;
        }

        public async Task<bool> HeartbeatAsync(Guid apiKey)
        {
            var device = await _repository.GetByApiKeyAsync(apiKey);
            if (device == null) return false;

            if (device.Status == DeviceStatus.Returned) return false;

            device.LastActiveDate = DateTime.UtcNow;
            device.Status = DeviceStatus.Active;
            await _repository.UpdateAsync(device);
            return true;
        }

        public async Task<Dictionary<string, TenantUtilizationSummary>> GetTenantUtilizationAsync()
        {
            var devices = await _repository.GetAllAsync();
            devices.ForEach(RecalculateStatus);

            return devices
                .GroupBy(d => d.TenantId)
                .ToDictionary(
                    g => g.Key,
                    g =>
                    {
                        var total = g.Count();
                        var active = g.Count(d => d.Status == DeviceStatus.Active);
                        var idle = g.Count(d => d.Status == DeviceStatus.Idle);
                        var returned = g.Count(d => d.Status == DeviceStatus.Returned);

                        return new TenantUtilizationSummary
                        {
                            TotalDevices = total,
                            ActiveDevices = active,
                            IdleDevices = idle,
                            ReturnedDevices = returned,
                            UtilizationRate = total == 0 ? 0 : Math.Round((double)active / total, 2)
                        };
                    });
        } 
        private void RecalculateStatus(Device device)
        {
            if (device.Status == DeviceStatus.Returned) return;

            var daysSinceActive = (DateTime.UtcNow - device.LastActiveDate).TotalDays;
            device.Status = daysSinceActive > _idleThresholdDays
                ? DeviceStatus.Idle
                : DeviceStatus.Active;
        }
    }
}