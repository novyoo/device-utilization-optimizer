const BASE_URL = "http://localhost:5036/api/devices";

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  // DELETE returns 204 No Content, nothing to parse
  if (response.status === 204) return null;
  return response.json();
}

export async function getAllDevices() {
  const response = await fetch(BASE_URL);
  return handleResponse(response);
}

export async function getDeviceById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(response);
}

export async function createDevice(device) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device),
  });
  return handleResponse(response);
}

export async function updateDevice(id, device) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device),
  });
  return handleResponse(response);
}

export async function deleteDevice(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleResponse(response);
}

export async function checkInDevice(id) {
  const response = await fetch(`${BASE_URL}/${id}/checkin`, { method: "POST" });
  return handleResponse(response);
}

export async function markDeviceReturned(id) {
  const response = await fetch(`${BASE_URL}/${id}/return`, { method: "POST" });
  return handleResponse(response);
}

export async function getTenantUtilization() {
  const response = await fetch(`${BASE_URL}/tenant-utilization`);
  return handleResponse(response);
}