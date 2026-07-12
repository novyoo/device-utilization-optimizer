import { useState } from 'react';
import { Field, Input } from '@fluentui/react-components';

const TENANT_MAX = 50;
const DEVICE_NAME_MAX = 100;
const ASSIGNED_USER_MAX = 100;

// A sunken, darker well than the card background, so the boxes read
// clearly as inputs rather than blending into the dialog. Text stays
// in the amber-cream ink family — no white anywhere.
const inputStyle = {
  backgroundColor: 'var(--bg-sunken)',
  color: 'var(--ink)',
  fontSize: '17px',
  border: '1px solid var(--border)',
};
const labelStyle = { fontSize: '15px', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' };

function toDateInputValue(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

export default function DeviceForm({ initialDevice, onSubmit }) {
  const [tenantId, setTenantId] = useState(initialDevice?.tenantId ?? '');
  const [deviceName, setDeviceName] = useState(initialDevice?.deviceName ?? '');
  const [assignedUser, setAssignedUser] = useState(initialDevice?.assignedUser ?? '');
  const [lastActiveDate, setLastActiveDate] = useState(
    toDateInputValue(initialDevice?.lastActiveDate)
  );
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!tenantId.trim()) next.tenantId = 'Tenant is required.';
    else if (tenantId.length > TENANT_MAX) next.tenantId = `Max ${TENANT_MAX} characters.`;

    if (!deviceName.trim()) next.deviceName = 'Device name is required.';
    else if (deviceName.length > DEVICE_NAME_MAX) next.deviceName = `Max ${DEVICE_NAME_MAX} characters.`;

    if (!assignedUser.trim()) next.assignedUser = 'Assigned user is required.';
    else if (assignedUser.length > ASSIGNED_USER_MAX) next.assignedUser = `Max ${ASSIGNED_USER_MAX} characters.`;

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      tenantId: tenantId.trim(),
      deviceName: deviceName.trim(),
      assignedUser: assignedUser.trim(),
      lastActiveDate: lastActiveDate ? new Date(lastActiveDate).toISOString() : null,
    });
  }

  return (
    <form id="device-form" onSubmit={handleSubmit}>
      <Field
        label={{ children: 'Tenant', style: labelStyle }}
        required
        validationMessage={errors.tenantId}
        validationState={errors.tenantId ? 'error' : 'none'}
      >
        <Input
          value={tenantId}
          onChange={(_, data) => setTenantId(data.value)}
          placeholder="e.g. Acme Corp"
          maxLength={TENANT_MAX}
          style={inputStyle}
        />
      </Field>

      <Field
        label={{ children: 'Device Name', style: labelStyle }}
        required
        validationMessage={errors.deviceName}
        validationState={errors.deviceName ? 'error' : 'none'}
        style={{ marginTop: '16px' }}
      >
        <Input
          value={deviceName}
          onChange={(_, data) => setDeviceName(data.value)}
          placeholder="e.g. Dell Latitude 5420"
          maxLength={DEVICE_NAME_MAX}
          style={inputStyle}
        />
      </Field>

      <Field
        label={{ children: 'Assigned User', style: labelStyle }}
        required
        validationMessage={errors.assignedUser}
        validationState={errors.assignedUser ? 'error' : 'none'}
        style={{ marginTop: '16px' }}
      >
        <Input
          value={assignedUser}
          onChange={(_, data) => setAssignedUser(data.value)}
          placeholder="e.g. Jane Doe"
          maxLength={ASSIGNED_USER_MAX}
          style={inputStyle}
        />
      </Field>

      <Field
        label={{ children: 'Last Active Date (optional)', style: labelStyle }}
        style={{ marginTop: '16px' }}
      >
        <Input
          type="date"
          value={lastActiveDate}
          onChange={(_, data) => setLastActiveDate(data.value)}
          style={inputStyle}
        />
      </Field>
    </form>
  );
}
