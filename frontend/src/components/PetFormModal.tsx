import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, MenuItem, Typography, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};

const PetFormModal = ({ open, handleClose, onSave, pet }) => {
  const [formData, setFormData] = useState({ name: '', species: 'DOG', price: 0, imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pet) setFormData(pet);
    else setFormData({ name: '', species: 'DOG', price: 0, imageUrl: '' });
    setErrors({});
  }, [pet, open]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (formData.price < 0) newErrors.price = 'Price must be positive';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onSave(formData);
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>{pet ? 'Edit Pet' : 'Add New Pet'}</Typography>
        <TextField fullWidth label="Name" margin="normal" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} error={!!errors.name} helperText={errors.name} />
        <FormControl fullWidth margin="normal">
          <InputLabel>Species</InputLabel>
          <Select value={formData.species} onChange={e => setFormData({...formData, species: e.target.value})}>
            <MenuItem value="DOG">Dog</MenuItem>
            <MenuItem value="CAT">Cat</MenuItem>
            <MenuItem value="BIRD">Bird</MenuItem>
            <MenuItem value="FISH">Fish</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Price" type="number" margin="normal" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} error={!!errors.price} helperText={errors.price} />
        <TextField fullWidth label="Image URL" margin="normal" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </Box>
    </Modal>
  );
};

export default PetFormModal;
