import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (id: number) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onEdit, onDelete }) => (
  <Card sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    borderRadius: 4,
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    '&:hover': { 
      transform: 'translateY(-8px)',
      boxShadow: '0 16px 32px rgba(0,0,0,0.12)' 
    }
  }}>
    <Box sx={{ position: 'relative', pt: '70%', bgcolor: '#f0f0f0' }}>
      <CardMedia
        component="img"
        image={pet.imageUrl || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80'}
        alt={pet.name}
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
    <CardContent sx={{ flexGrow: 1, p: 3, pb: 1 }}>
      <Typography variant="overline" color="primary" sx={{ letterSpacing: 1.5, fontWeight: 700 }}>
        {pet.species}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, mb: 1 }}>{pet.name}</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
        ${pet.price?.toFixed(2) || '0.00'}
      </Typography>
    </CardContent>
    <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
      <Tooltip title="Edit">
        <IconButton size="small" onClick={() => onEdit(pet)} sx={{ color: '#6366f1', '&:hover': { bgcolor: '#eef2ff' } }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton size="small" onClick={() => onDelete(pet.id!)} sx={{ color: '#f43f5e', '&:hover': { bgcolor: '#fff1f2' } }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  </Card>
);

export default PetCard;
