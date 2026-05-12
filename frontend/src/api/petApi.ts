import { Pet, Species } from '../types';

let BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:8080/galang/v1';

if (BASE && !BASE.startsWith('http')) {
  BASE = `https://${BASE}`;
}

async function getPets(species?: Species | ''): Promise<Pet[]> {
  const params = species ? `?species=${encodeURIComponent(species)}` : '';
  const res = await fetch(`${BASE}/pets${params}`);
  if (!res.ok) throw new Error('Failed to fetch pets');
  return res.json();
}

async function getPetById(id: number): Promise<Pet> {
  const res = await fetch(`${BASE}/pets/${id}`);
  if (!res.ok) throw new Error('Failed to fetch pet');
  return res.json();
}

async function createPet(pet: Pet): Promise<Pet> {
  const res = await fetch(`${BASE}/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet),
  });
  if (!res.ok) throw new Error('Failed to create pet');
  return res.json();
}

async function updatePet(id: number, pet: Pet): Promise<Pet> {
  const res = await fetch(`${BASE}/pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet),
  });
  if (!res.ok) throw new Error('Failed to update pet');
  return res.json();
}

async function deletePet(id: number): Promise<void> {
  const res = await fetch(`${BASE}/pets/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete pet');
}

export { getPets, getPetById, createPet, updatePet, deletePet };
