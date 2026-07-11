namespace DeviceOptimizer.Api.DTOs
{
    // One row per tenant, summarizing how their device fleet is being used.
    // This is what powers the "Tenant Utilization" view on the dashboard.
    public class TenantUtilizationDto
    {
        public string TenantId { get; set; } = string.Empty; 
        public int TotalDevices { get; set; }
        public int ActiveDevices { get; set; }
        public int IdleDevices { get; set; }
        public int ReturnedDevices { get; set; }

        // Rounded percentage of NON-returned devices that are currently Active.
        // (Returned devices are excluded from the denominator they're out of the fleet.)
        public double UtilizationPercentage { get; set; }
    }
}