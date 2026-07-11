using DeviceOptimizer.Api.Models;

namespace DeviceOptimizer.Api.Services
{
    public interface IDeviceService
    {
        Task<List<Device>> GetAllDevicesAsync();
        Task<Device?> GetDeviceByIdAsync(int id);
        Task<Device> CreateDeviceAsync(Device device);
        Task<bool> UpdateDeviceAsync(Device device);
        Task<bool> DeleteDeviceAsync(int id);

        Task<bool> CheckInDeviceAsync(int id);      // "this device is being used again"
        Task<bool> MarkAsReturnedAsync(int id);      // "this device has been returned/retired"

        Task<Dictionary<string, TenantUtilizationSummary>> GetTenantUtilizationAsync();
    }

    // Small internal DTO-like class used
    public class TenantUtilizationSummary
    {
        public int TotalDevices { get; set; }
        public int ActiveDevices { get; set; }
        public int IdleDevices { get; set; }
        public int ReturnedDevices { get; set; }
        public double UtilizationRate { get; set; } // Active Devices
    }
}