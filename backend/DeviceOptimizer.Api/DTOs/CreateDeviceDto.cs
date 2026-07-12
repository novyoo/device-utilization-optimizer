using System.ComponentModel.DataAnnotations;

namespace DeviceOptimizer.Api.DTOs
{
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

        public DateTime? LastActiveDate { get; set; }
    }
}