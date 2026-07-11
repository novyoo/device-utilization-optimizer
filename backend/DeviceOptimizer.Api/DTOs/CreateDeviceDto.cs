using System.ComponentModel.DataAnnotations;

namespace DeviceOptimizer.Api.DTOs
{
    // This is the "write", what the client sends us when creating
    // or updating a device. We keep it separate from Device.cs so that
    // callers can't set things like Id or Status directly (Status is
    // always calculated by the service, never set by hand).
    public class CreateDeviceDto
    {
        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string TenantId { get; set; } = string.Empty; 

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string DeviceName { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string AssignedUser { get; set; } = string.Empty;

        // Useful on update, in case someone wants to backdate a check-in manually
        public DateTime? LastActiveDate { get; set; }
    }
}