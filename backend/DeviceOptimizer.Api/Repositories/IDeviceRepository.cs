using DeviceOptimizer.Api.Models;

namespace DeviceOptimizer.Api.Repositories
{
    // Repository = pure data access, no business logic (no idle calculation here).
    // That logic belongs in DeviceService
    public interface IDeviceRepositorygit 
    {
        Task<List<Device>> GetAllAsync();
        Task<Device?> GetByIdAsync(int id);
        Task<List<Device>> GetByTenantAsync(string tenantId);
        Task AddAsync(Device device);
        Task UpdateAsync(Device device);
        Task DeleteAsync(int id);
    }
}