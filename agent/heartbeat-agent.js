const apiKey = process.argv[2];
const intervalSeconds = Number(process.argv[3]) || 30;
const baseUrl = process.argv[4] || 'http://localhost:5036';

if (!apiKey) {
  console.error('Usage: node heartbeat-agent.js <API_KEY> [intervalSeconds] [apiBaseUrl]');
  console.error('Get an API key by clicking "Copy Key" on a device row in the dashboard.');
  process.exit(1);
}

async function sendHeartbeat() {
  const timestamp = new Date().toLocaleTimeString();
  try {
    const response = await fetch(`${baseUrl}/api/devices/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });

    if (response.status === 204) {
      console.log(`[${timestamp}] Heartbeat sent OK — device is now Active.`);
    } else if (response.status === 404) {
      console.log(`[${timestamp}] Rejected — unknown API key, or the device is marked Returned.`);
    } else {
      console.log(`[${timestamp}] Unexpected response: HTTP ${response.status}`);
    }
  } catch (err) {
    console.log(`[${timestamp}] Could not reach the backend — is it running on ${baseUrl}? (${err.message})`);
  }
}

console.log(`Simulated agent starting for device key: ${apiKey}`);
console.log(`Sending a heartbeat every ${intervalSeconds}s to ${baseUrl}/api/devices/heartbeat`);
console.log('Press Ctrl+C to stop.\n');

sendHeartbeat(); // send one immediately, then on the interval
setInterval(sendHeartbeat, intervalSeconds * 1000);
