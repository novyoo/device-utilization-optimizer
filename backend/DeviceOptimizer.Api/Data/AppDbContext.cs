using Microsoft.EntityFrameworkCore;
using DeviceOptimizer.Api.Models;

namespace DeviceOptimizer.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Device> Devices => Set<Device>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Store the enum as its string name ("Active", "Idle", "Returned") instead of the default int. 
            // Makes the raw table readable when debugging with a SQLite browser, at basically zero cost here.
            modelBuilder.Entity<Device>()
                .Property(d => d.Status)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}