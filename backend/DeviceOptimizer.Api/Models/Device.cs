namespace DeviceOptimizer.Api.Models
{
    // Represents the lifecycle status of a device.
    // Stored as a string in the DB

    public enum DeviceStatus
    {
        Active,
        Idle,
        Returned
    }
    
    public class Device
    {
        public int Id { get; set; }

        // Which client/organization this device belongs to.
        // Kept as a plain string rather than a separatenTenant table - simpler for this project's scope
        public string TenantId { get; set; } = string.Empty;

        public string DeviceName { get; set; } = string.Empty; // e.g. "Dell Latitude 5420"
        public string AssignedUser { get; set; } = string.Empty;

        // The last time this device "checked in" (used, synced, pinged, etc.)
        public DateTime LastActiveDate { get; set; }

        // NOT set manually in most flows - DeviceService recalculates this
        public DeviceStatus Status { get; set; } = DeviceStatus.Active;
    }
}