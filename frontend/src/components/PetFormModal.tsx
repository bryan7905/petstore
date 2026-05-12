import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Grid } from '@mui/material';
import { Pet, Species } from '../types';

interface PetFormModalProps {
  open: boolean;
  handleClose: () => void;
  onSave: (pet: Pet) => Promise<void>;
  pet?: Pet | null;
}

const PetFormModal: React.FC<PetFormModalProps> = ({ open, handleClose, onSave, pet }) => {
  const [formData, setFormData] = useState<Partial<Pet>>({
    name: '',
    species: Species.DOG,
    price: 0,
    imageUrl: ''
  });

  useEffect(() => {
    if (pet) {
      setFormData(pet);
    } else {
      setFormData({
        name: '',
        species: Species.DOG,
        price: 0,
        imageUrl: ''
      });
    }
  }, [pet, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData as Pet);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 450, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 24, p: 4,
      }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
          {pet ? 'Edit Pet Details' : 'Add New Pet'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Pet Name" required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select fullWidth label="Species" required
                value={formData.species || Species.DOG}
                onChange={(e) => setFormData({ ...formData, species: e.target.value as Species })}
              >
                {Object.values(Species).map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth label="Price ($)" type="number" required
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Image URL"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button fullWidth variant="contained" type="submit" size="large" sx={{ py: 1.5, borderRadius: 2, bgcolor: '#6366f1', '&:hover': { bgcolor: '#4f46e5' } }}>
                {pet ? 'Save Changes' : 'Create Listing'}
              </Button>
              <Button fullWidth variant="outlined" onClick={handleClose} size="large" sx={{ py: 1.5, borderRadius: 2 }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default PetFormModal;
