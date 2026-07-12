using DeviceOptimizer.Api.Models;

namespace DeviceOptimizer.Api.Repositories
{
    public interface IDeviceRepository
    {
        Task<List<Device>> GetAllAsync();
        Task<Device?> GetByIdAsync(int id);
        Task<Device?> GetByApiKeyAsync(Guid apiKey);
        Task<List<Device>> GetByTenantAsync(string tenantId);
        Task AddAsync(Device device);
        Task UpdateAsync(Device device);
        Task DeleteAsync(int id);
    }
}