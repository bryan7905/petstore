import React, { useEffect, useState } from 'react';
import { getPets, createPet, updatePet, deletePet } from '../api/petApi';
import PetCard from '../components/PetCard';
import FilterMenu from '../components/FilterMenu';
import PetFormModal from '../components/PetFormModal';
import { CircularProgress, Typography, Button, Box, Snackbar, Alert, Grid, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PetListPage = () => {
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchAll = async () => {
    try {
      const data = await getPets(species);
      setPets(data);
      setError(null);
    } catch (err) {
      setError('Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, [species]);

  const handleSave = async (petData) => {
    try {
      if (selectedPet) await updatePet(selectedPet.id, petData);
      else await createPet(petData);
      setSnackbar({ open: true, message: `Pet ${selectedPet ? 'updated' : 'created'} successfully!`, severity: 'success' });
      await fetchAll();
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to save pet', severity: 'error' });
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      await deletePet(id);
      setPets(pets.filter(p => p.id !== id));
      setSnackbar({ open: true, message: 'Pet deleted successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete pet', severity: 'error' });
    }
  };

  if (loading && pets.length === 0) return <Box p={10} display="flex" justifyContent="center"><CircularProgress size={60} /></Box>;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>Explore Pets</Typography>
            <Typography variant="subtitle1" color="text.secondary">Discover your new best friend from our collection.</Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <FilterMenu onFilterChange={setSpecies} />
          <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={() => { setSelectedPet(null); setModalOpen(true); }} sx={{ 
            bgcolor: '#6366f1', 
            borderRadius: 2,
            px: 3,
            '&:hover': { bgcolor: '#4f46e5' } 
          }}>
            Add New
          </Button>
        </Box>
      </Box>
      
      {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{error}</Alert>}
      
      {pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pets.map(pet => (
            <div key={pet.id} className="h-full">
              <PetCard pet={pet} onEdit={(p) => { setSelectedPet(p); setModalOpen(true); }} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      ) : !loading && (
        <Box textAlign="center" py={10} bgcolor="#f8fafc" borderRadius={4} border="2px dashed #e2e8f0">
          <Typography variant="h5" color="text.secondary" gutterBottom>No pets available</Typography>
          <Typography color="text.secondary">We couldn't find any pets matching your criteria.</Typography>
        </Box>
      )}
      
      <PetFormModal open={modalOpen} handleClose={() => setModalOpen(false)} onSave={handleSave} pet={selectedPet} />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({...snackbar, open: false})}>
        <Alert severity={snackbar.severity} sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default PetListPage;
