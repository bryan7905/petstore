import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import PetCard from '../PetCard';
import { ThemeProvider, createTheme } from '@mui/material';
import { Pet, Species } from '../../types';

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

const mockPet: Pet = {
  id: 1,
  name: 'Buddy',
  species: Species.DOG,
  price: 299.99,
  imageUrl: 'http://example.com/buddy.jpg'
};

describe('PetCard', () => {
  test('renders pet details correctly', () => {
    renderWithTheme(<PetCard pet={mockPet} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('Buddy')).toBeDefined();
    expect(screen.getByText('DOG')).toBeDefined();
    expect(screen.getByText('$299.99')).toBeDefined();
    expect(screen.getByAltText('Buddy')).toHaveAttribute('src', mockPet.imageUrl);
  });

  test('uses placeholder image if imageUrl is missing', () => {
    const petWithoutImage: Pet = { ...mockPet, imageUrl: '' };
    renderWithTheme(<PetCard pet={petWithoutImage} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    const img = screen.getByAltText('Buddy');
    expect(img.getAttribute('src')).toContain('images.unsplash.com');
  });

  test('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    renderWithTheme(<PetCard pet={mockPet} onEdit={onEdit} onDelete={vi.fn()} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(onEdit).toHaveBeenCalledWith(mockPet);
  });

  test('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    renderWithTheme(<PetCard pet={mockPet} onEdit={vi.fn()} onDelete={onDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(onDelete).toHaveBeenCalledWith(mockPet.id!);
  });
});
