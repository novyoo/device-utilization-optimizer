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

        Task<bool> CheckInDeviceAsync(int id);      
        Task<bool> MarkAsReturnedAsync(int id);     
        Task<bool> HeartbeatAsync(Guid apiKey);      

        Task<Dictionary<string, TenantUtilizationSummary>> GetTenantUtilizationAsync();
    }


    public class TenantUtilizationSummary
    {
        public int TotalDevices { get; set; }
        public int ActiveDevices { get; set; }
        public int IdleDevices { get; set; }
        public int ReturnedDevices { get; set; }
        public double UtilizationRate { get; set; } // Active Devices
    }
}