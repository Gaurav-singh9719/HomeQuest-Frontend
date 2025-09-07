const API = process.env.REACT_APP_API_URL;

export async function getProperties() {
  const res = await fetch(${API}/api/properties);
  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }
  return res.json();
}
