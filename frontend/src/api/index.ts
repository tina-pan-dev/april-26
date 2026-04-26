const API_BASE_URL = 'http://localhost:8080';

export async function getDelivery(userId: string) {
  const res = await fetch(`${API_BASE_URL}/comms/your-next-delivery/${userId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch delivery data');
  }

  return res.json();
}

export async function getCatImage(): Promise<string> {
  const res = await fetch('https://api.thecatapi.com/v1/images/search');

  if (!res.ok) {
    throw new Error('Failed to fetch cat image');
  }

  const [cat] = await res.json();
  return cat?.url ?? '';
}
