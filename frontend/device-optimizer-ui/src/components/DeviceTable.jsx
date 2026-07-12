import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';

// Status is communicated by fill/weight within the single accent hue,
// never by introducing a new color (see .status-pill in index.css).
function statusPillClass(status) {
  switch (status) {
    case 'Active': return 'status-pill status-pill--active';
    case 'Idle': return 'status-pill status-pill--idle';
    case 'Returned': return 'status-pill status-pill--returned';
    default: return 'status-pill status-pill--returned';
  }
}

const cellStyle = { padding: '16px 18px', fontSize: '16px', fontWeight: 600, color: 'var(--ink-soft)' };
const nameCellStyle = { ...cellStyle, color: 'var(--ink)', fontWeight: 700 };
const headerCellStyle = {
  padding: '14px 18px',
  fontSize: '13px',
  fontWeight: 700,
  color: 'var(--ink-faint)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  background: 'var(--bg-raised-2)',
};

export default function DeviceTable({ devices, onEdit, onDelete, onCheckIn, onReturn }) {
  if (devices.length === 0) {
    return <div className="empty-state">No devices found.</div>;
  }

  return (
    <div className="table-scroll">
      <Table aria-label="Device list" style={{ minWidth: '900px' }}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell style={headerCellStyle}>Device</TableHeaderCell>
            <TableHeaderCell style={headerCellStyle}>Tenant</TableHeaderCell>
            <TableHeaderCell style={headerCellStyle}>Assigned User</TableHeaderCell>
            <TableHeaderCell style={headerCellStyle}>Last Active</TableHeaderCell>
            <TableHeaderCell style={headerCellStyle}>Days Idle</TableHeaderCell>
            <TableHeaderCell style={headerCellStyle}>Status</TableHeaderCell>
            <TableHeaderCell style={headerCellStyle}>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => {
            const isReturned = device.status === 'Returned';
            return (
              <TableRow key={device.id}>
                <TableCell style={nameCellStyle}>{device.deviceName}</TableCell>
                <TableCell style={cellStyle}>{device.tenantId}</TableCell>
                <TableCell style={cellStyle}>{device.assignedUser}</TableCell>
                <TableCell style={cellStyle}>{new Date(device.lastActiveDate).toLocaleDateString()}</TableCell>
                <TableCell style={cellStyle}>{device.daysSinceLastActive}</TableCell>
                <TableCell style={cellStyle}>
                  <span className={statusPillClass(device.status)}>{device.status}</span>
                </TableCell>
                <TableCell style={cellStyle}>
                  <div className="action-row">
                    <button type="button" className="btn btn-outline" onClick={() => onEdit(device)}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => onDelete(device)}>Delete</button>
                    {!isReturned && (
                      <>
                        <button type="button" className="btn btn-solid" onClick={() => onCheckIn(device)}>Check In</button>
                        <button type="button" className="btn btn-ghost" onClick={() => onReturn(device)}>Return</button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
