const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getBooks(signal) {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Unable to load books (HTTP ${response.status})`);
  }

  return response.json();
}