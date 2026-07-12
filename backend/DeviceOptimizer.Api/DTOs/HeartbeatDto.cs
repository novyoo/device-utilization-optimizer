using System.ComponentModel.DataAnnotations;

namespace DeviceOptimizer.Api.DTOs
{
    // What a device agent sends when it "phones home" to prove it's still
    // in active use. Deliberately just the ApiKey — a real agent wouldn't
    // (and shouldn't) know the device's internal database Id.
    public class HeartbeatDto
    {
        [Required]
        public Guid ApiKey { get; set; }
    }
}
