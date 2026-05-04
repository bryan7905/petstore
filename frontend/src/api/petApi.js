let BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:8080/galang/v1';

if (BASE && !BASE.startsWith('http')) {
  BASE = `https://${BASE}`;
}

async function getPets(species) {
  const params = species ? `?species=${encodeURIComponent(species)}` : '';
  const res = await fetch(`${BASE}/pets${params}`);
  if (!res.ok) throw new Error('Failed to fetch pets');
  return res.json();
}

async function getPetById(id) {
  const res = await fetch(`${BASE}/pets/${id}`);
  if (!res.ok) throw new Error('Failed to fetch pet');
  return res.json();
}

async function createPet(pet) {
  const res = await fetch(`${BASE}/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet),
  });
  if (!res.ok) throw new Error('Failed to create pet');
  return res.json();
}

async function updatePet(id, pet) {
  const res = await fetch(`${BASE}/pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet),
  });
  if (!res.ok) throw new Error('Failed to update pet');
  return res.json();
}

async function deletePet(id) {
  const res = await fetch(`${BASE}/pets/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete pet');
}

export { getPets, getPetById, createPet, updatePet, deletePet };
