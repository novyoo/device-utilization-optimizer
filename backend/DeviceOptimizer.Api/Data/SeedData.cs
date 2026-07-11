using DeviceOptimizer.Api.Models;

namespace DeviceOptimizer.Api.Data
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Devices.Any()) return; // already seeded

            var tenants = new[] { "Acme Corp", "Globex Inc", "Initech", "Umbrella LLC" };
            var deviceTypes = new[]
            {
                "Dell Latitude 5420", "MacBook Pro 14\"", "Lenovo ThinkPad X1",
                "HP EliteBook 840", "iPad Pro 11\"", "Surface Laptop 5"
            };
            var users = new[]
            {
                "J. Carter", "M. Nguyen", "A. Patel", "S. Lee", "R. Gomez",
                "T. Okafor", "K. Fischer", "L. Rossi", "D. Kim", "P. Novak"
            };

            var random = new Random(42); // fixed seed = reproduciable demo data
            var devices = new List<Device>();

            for (int i = 0; i < 26; i++)
            {

                // default 7-day threshold tp get a realistic mix of
                // Active / Idle devices out of the box.
                var daysAgo = random.Next(0, 31);

                devices.Add(new Device
                {
                    TenantId = tenants[random.Next(tenants.Length)],
                    DeviceName = deviceTypes[random.Next(deviceTypes.Length)],
                    AssignedUser = users[random.Next(users.Length)],
                    LastActiveDate = DateTime.UtcNow.AddDays(-daysAgo),
                    // A few devices seeded already returned
                    Status = i % 9 == 0 ? DeviceStatus.Returned : DeviceStatus.Active
                });
            }

            context.Devices.AddRange(devices);
            context.SaveChanges();
        }
    }
}