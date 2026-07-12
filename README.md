## Project Overview:
    This project is a web-based tool that helps rental device companies track how their devices are being used. 
    Companies that rent out laptops and PCs (Device-as-a-Service businesses) often lose money when a rented device sits unused for a long time, 
    since it is still counted as "in use" even though no one is actively using it.
    This tool solves that problem. It keeps a record of every device, along with which tenant (client company) it belongs to, 
    who it is assigned to, and when it was last active. If a device has not checked in for more than a set number of days 
    (7 days by default), the system automatically marks it as "Idle." This helps the business quickly identify devices that 
    can be taken back and given to someone else, saving costs.
    The application has a dashboard that shows the total number of devices, how many are active or idle, and the utilization 
    percentage for each client. It also allows adding, editing, deleting, and checking in devices, so the data stays up to date.

## Tech Stack:

    Backend: ASP.NET Core Web API (C#)
    Database: SQLite with Entity Framework Core
    Frontend: React with Fluent UI (Microsoft's design library)
    Architecture: Controller → Service → Repository pattern

## Folder structure
    device-utilization-optimizer/
        backend/
            DeviceOptimizer.Api/
                DeviceOptimizer.Api.csproj
                Program.cs
                appsettings.json
                Models/
                     Device.cs
                Data/
                     AppDbContext.cs
                Services/
                    IDeviceService.cs
                    DeviceService.cs
                Repositories/
                    IDeviceRepository.cs
                    DeviceRepository.cs
                Controllers/
                    DevicesController.cs
                DTOs/
                    DeviceDto.cs
                    CreateDeviceDto.cs
                    TenantUtilizationDto.cs
                Data/
                    SeedData.cs
        frontend/
            device-optimizer-ui/   (created via Vite — instructions below)
                src/
                    api/
                        deviceApi.js
                    components/
                        Dashboard.jsx
                    DeviceTable.jsx
                    TenantUtilization.jsx
                    DeviceForm.jsx
                App.jsx
                main.jsx
    README.md
