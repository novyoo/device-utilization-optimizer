namespace DeviceOptimizer.Api.Models
{
    public enum DeviceStatus
    {
        Active,
        Idle,
        Returned
    }
    
    public class Device
    {
        public int Id { get; set; }

        public string TenantId { get; set; } = string.Empty;

        public string DeviceName { get; set; } = string.Empty; // e.g. "Dell Latitude 5420"
        public string AssignedUser { get; set; } = string.Empty;

        public DateTime LastActiveDate { get; set; }

        public Guid ApiKey { get; set; } = Guid.NewGuid();

        public DeviceStatus Status { get; set; } = DeviceStatus.Active;
    }
}