using Microsoft.EntityFrameworkCore;
using DeviceOptimizer.Api.Data;
using DeviceOptimizer.Api.Models;

namespace DeviceOptimizer.Api.Repositories
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly AppDbContext _context;

        public DeviceRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<Device>> GetAllAsync()
        {
            return await _context.Devices.AsNoTracking().ToListAsync();
        }

        public async Task<Device?> GetByIdAsync(int id)
        {
            return await _context.Devices.FindAsync(id);
        }

        public async Task<Device?> GetByApiKeyAsync(Guid apiKey)
        {
            return await _context.Devices.FirstOrDefaultAsync(d => d.ApiKey == apiKey);
        }

        public async Task<List<Device>> GetByTenantAsync(string tenantId)
        {
            return await _context.Devices
                .AsNoTracking()
                .Where(d => d.TenantId == tenantId)
                .ToListAsync();
        }

        public async Task AddAsync(Device device)
        {
            _context.Devices.Add(device);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Device device)
        {
            _context.Devices.Update(device);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var device = await _context.Devices.FindAsync(id);
            if (device != null)
            {
                _context.Devices.Remove(device);
                await _context.SaveChangesAsync();
            }
        }
    }
}