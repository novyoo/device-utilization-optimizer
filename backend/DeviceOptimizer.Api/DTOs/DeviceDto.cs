namespace DeviceOptimizer.Api.DTOs
{
    // This is the "read" of a device, what gets sent to the frontend.
    // We don't just return the raw Device entity because:
    // 1 We want control over exactly what fields are exposed
    // 2 Status here is the RECALCULATED status (Active/Idle), not necessarily
    //    what's stored in the DB, DeviceService figures that out on read
    public class DeviceDto
    {
        public int Id { get; set; }
        public string TenantId { get; set; } = string.Empty; 
        public string DeviceName { get; set; } = string.Empty;
        public string AssignedUser { get; set; } = string.Empty;
        public DateTime LastActiveDate { get; set; }
        public Guid ApiKey { get; set; } // shown in the UI so it can be copied into a device agent
        public string Status { get; set; } = string.Empty; // "Active", "Idle", or "Returned"
        public int DaysSinceLastActive { get; set; } // handy for the UI to show "Idle for 12 days"
    }
}