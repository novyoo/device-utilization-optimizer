using DeviceOptimizer.Api.Models;
using DeviceOptimizer.Api.Services;

namespace DeviceOptimizer.Api.BackgroundServices
{
    public class DeviceActivitySimulator : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<DeviceActivitySimulator> _logger;
        private readonly bool _enabled;
        private readonly int _tickIntervalSeconds;
        private readonly int _devicesPerTick;
        private readonly Random _random = new();

        public DeviceActivitySimulator(
            IServiceScopeFactory scopeFactory,
            ILogger<DeviceActivitySimulator> logger,
            IConfiguration config)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;

            _enabled = config.GetValue<bool?>("SimulatedFleet:Enabled") ?? true;
            _tickIntervalSeconds = config.GetValue<int?>("SimulatedFleet:TickIntervalSeconds") ?? 15;
            _devicesPerTick = config.GetValue<int?>("SimulatedFleet:DevicesPerTick") ?? 3;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            if (!_enabled)
            {
                _logger.LogInformation("Simulated fleet is disabled (SimulatedFleet:Enabled = false).");
                return;
            }

            _logger.LogInformation(
                "Simulated fleet started — heartbeating up to {Count} random device(s) every {Interval}s.",
                _devicesPerTick, _tickIntervalSeconds);

            using var timer = new PeriodicTimer(TimeSpan.FromSeconds(_tickIntervalSeconds));

            await RunTick();

            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                await RunTick();
            }
        }

        private async Task RunTick()
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var deviceService = scope.ServiceProvider.GetRequiredService<IDeviceService>();

                var devices = await deviceService.GetAllDevicesAsync();
                var eligible = devices.Where(d => d.Status != DeviceStatus.Returned).ToList();

                if (eligible.Count == 0)
                {
                    _logger.LogInformation("Simulated fleet tick: no non-Returned devices to heartbeat.");
                    return;
                }

                var chosen = eligible
                    .OrderBy(_ => _random.Next())
                    .Take(_devicesPerTick)
                    .ToList();

                foreach (var device in chosen)
                {
                    await deviceService.HeartbeatAsync(device.ApiKey);
                }

                _logger.LogInformation(
                    "Simulated fleet tick: heartbeated {Count} device(s): {Names}",
                    chosen.Count, string.Join(", ", chosen.Select(d => d.DeviceName)));
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Simulated fleet tick failed — will retry on the next tick.");
            }
        }
    }
}
