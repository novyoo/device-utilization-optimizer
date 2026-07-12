import { useState, useEffect, useCallback } from 'react';
import {
  Spinner,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@fluentui/react-components';
import {
  getAllDevices,
  getTenantUtilization,
  createDevice,
  updateDevice,
  deleteDevice,
  checkInDevice,
  markDeviceReturned,
} from '../api/deviceAPI';
import DeviceTable from './DeviceTable';
import TenantUtilization from './TenantUtilization';
import DeviceForm from './DeviceForm';

const dialogSurfaceStyle = {
  backgroundColor: 'var(--bg-raised)',
  border: '1px solid var(--border-soft)',
};
const dialogTitleStyle = { fontSize: '26px', fontWeight: 800, color: 'var(--ink)' };

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [tenantStats, setTenantStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [formDevice, setFormDevice] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState(null);

  // Delete confirm dialog state, separate from formDevice since it's a
  // different dialog with different content (no form, just a warning).
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [devicesData, statsData] = await Promise.all([
        getAllDevices(),
        getTenantUtilization(),
      ]);
      setDevices(devicesData);
      setTenantStats(statsData);
      setLoadError(null);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function openCreateForm() {
    setActionError(null);
    setFormDevice({}); 
  }

  function openEditForm(device) {
    setActionError(null);
    setFormDevice(device);
  }

  function closeForm() {
    setFormDevice(undefined);
  }

  async function handleFormSubmit(payload) {
    setSubmitting(true);
    try {
      if (formDevice?.id) {
        await updateDevice(formDevice.id, payload);
      } else {
        await createDevice(payload);
      }
      closeForm();
      await loadData();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleDelete(device) {
    setActionError(null);
    setDeviceToDelete(device);
  }

  function cancelDelete() {
    if (deleting) return; // don't let the dialog close mid-request
    setDeviceToDelete(null);
  }

  async function confirmDelete() {
    if (!deviceToDelete) return;
    setDeleting(true);
    setActionError(null);
    try {
      await deleteDevice(deviceToDelete.id);
      setDeviceToDelete(null);
      await loadData();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  async function handleCheckIn(device) {
    setActionError(null);
    try {
      await checkInDevice(device.id);
      await loadData();
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleReturn(device) {
    setActionError(null);
    try {
      await markDeviceReturned(device.id);
      await loadData();
    } catch (err) {
      setActionError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="loading-shell">
        <Spinner label="Loading devices..." />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="dashboard-container">
        <div className="alert">Failed to load data: {loadError}</div>
      </div>
    );
  }

  const isEditMode = Boolean(formDevice?.id);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-header__eyebrow">Fleet status</p>
          <h1>Device Utilization Dashboard</h1>
        </div>
        <button type="button" className="btn btn-solid btn-lg" onClick={openCreateForm}>
          + Add Device
        </button>
      </div>

      {actionError && <div className="alert">{actionError}</div>}

      <section className="section">
        <div className="section-head">
          <h2>Tenant Utilization</h2>
          <span className="section-head__count">{tenantStats.length} tenant{tenantStats.length === 1 ? '' : 's'}</span>
        </div>
        <TenantUtilization tenantStats={tenantStats} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>All Devices</h2>
          <span className="section-head__count">{devices.length} device{devices.length === 1 ? '' : 's'}</span>
        </div>
        <DeviceTable
          devices={devices}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onCheckIn={handleCheckIn}
          onReturn={handleReturn}
        />
      </section>

      {/* Create / Edit dialog */}
      <Dialog open={formDevice !== undefined} onOpenChange={(_, data) => !data.open && closeForm()}>
        <DialogSurface style={dialogSurfaceStyle}>
          <DialogBody>
            <DialogTitle style={dialogTitleStyle}>
              {isEditMode ? 'Edit Device' : 'Add Device'}
            </DialogTitle>
            <DialogContent>
              <DeviceForm initialDevice={isEditMode ? formDevice : null} onSubmit={handleFormSubmit} />
            </DialogContent>
            <DialogActions>
              <button type="button" className="btn btn-ghost btn-lg" onClick={closeForm} disabled={submitting}>
                Cancel
              </button>
              <button type="submit" form="device-form" className="btn btn-solid btn-lg" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save'}
              </button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Delete confirmation dialog — replaces window.confirm() */}
      <Dialog open={deviceToDelete !== null} onOpenChange={(_, data) => !data.open && cancelDelete()}>
        <DialogSurface style={dialogSurfaceStyle}>
          <DialogBody>
            <DialogTitle style={dialogTitleStyle}>Delete Device</DialogTitle>
            <DialogContent style={{ fontSize: '17px', fontWeight: 600, color: 'var(--ink-soft)' }}>
              Delete "{deviceToDelete?.deviceName}"? This can't be undone.
            </DialogContent>
            <DialogActions>
              <button type="button" className="btn btn-ghost btn-lg" onClick={cancelDelete} disabled={deleting}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger btn-lg" onClick={confirmDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
