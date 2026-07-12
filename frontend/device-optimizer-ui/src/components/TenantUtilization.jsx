import { Card, CardHeader, Text } from '@fluentui/react-components';

const statLabelStyle = { fontSize: '13px', fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' };
const statValueStyle = { fontSize: '17px', fontWeight: 700, color: 'var(--ink)' };

// One card per tenant, showing device counts and utilization %
// tenantStats is the array returned by GET /api/devices/tenant-utilization
export default function TenantUtilization({ tenantStats }) {
  if (tenantStats.length === 0) {
    return <div className="empty-state">No tenant data available.</div>;
  }

  return (
    <div className="tenant-grid">
      {tenantStats.map((stat) => (
        <Card
          key={stat.tenantId}
          style={{
            padding: '22px',
            backgroundColor: 'var(--bg-raised)',
            border: '1px solid var(--border-soft)',
            borderTop: '3px solid var(--accent)',
          }}
        >
          <CardHeader
            header={
              <Text weight="bold" style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 800 }}>
                {stat.tenantId}
              </Text>
            }
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={statLabelStyle}>Total devices</Text>
              <Text style={statValueStyle}>{stat.totalDevices}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={statLabelStyle}>Active</Text>
              <Text style={statValueStyle}>{stat.activeDevices}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={statLabelStyle}>Idle</Text>
              <Text style={statValueStyle}>{stat.idleDevices}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={statLabelStyle}>Returned</Text>
              <Text style={statValueStyle}>{stat.returnedDevices}</Text>
            </div>

            <div
              style={{
                marginTop: '10px',
                paddingTop: '14px',
                borderTop: '1px solid var(--border-soft)',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Utilization
              </Text>
              <Text style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                {(stat.utilizationPercentage * 100).toFixed(0)}%
              </Text>
            </div>
            <div
              aria-hidden="true"
              style={{
                height: '6px',
                borderRadius: '999px',
                background: 'var(--bg-sunken)',
                overflow: 'hidden',
                border: '1px solid var(--border-soft)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, Math.max(0, stat.utilizationPercentage * 100))}%`,
                  background: 'var(--accent)',
                }}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
