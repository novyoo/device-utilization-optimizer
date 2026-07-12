import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="app-shell">
      <div className="ticket-strip" aria-hidden="true">
        <div className="ticket-strip__track">
          <span>DEVICE OPTIMIZER</span>
          <span>FLEET UTILIZATION</span>
          <span>DEVICE OPTIMIZER</span>
          <span>FLEET UTILIZATION</span>
          <span>DEVICE OPTIMIZER</span>
          <span>FLEET UTILIZATION</span>
          <span>DEVICE OPTIMIZER</span>
          <span>FLEET UTILIZATION</span>
          <span>DEVICE OPTIMIZER</span>
          <span>FLEET UTILIZATION</span>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}
