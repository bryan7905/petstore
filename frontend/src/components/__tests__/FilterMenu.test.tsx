import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import FilterMenu from '../FilterMenu';
import { ThemeProvider, createTheme } from '@mui/material';
import { Species } from '../../types';

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('FilterMenu', () => {
  test('renders all species options', () => {
    const onFilterChange = vi.fn();
    renderWithTheme(<FilterMenu onFilterChange={onFilterChange} />);
    
    // Open the select
    const select = screen.getByLabelText(/Species/i);
    fireEvent.mouseDown(select);
    
    expect(screen.getByText('All')).toBeDefined();
    expect(screen.getByText('Dogs')).toBeDefined();
    expect(screen.getByText('Cats')).toBeDefined();
    expect(screen.getByText('Birds')).toBeDefined();
    expect(screen.getByText('Fish')).toBeDefined();
  });

  test('calls onFilterChange when an option is selected', () => {
    const onFilterChange = vi.fn();
    renderWithTheme(<FilterMenu onFilterChange={onFilterChange} />);
    
    const select = screen.getByLabelText(/Species/i);
    fireEvent.mouseDown(select);
    
    const option = screen.getByText('Dogs');
    fireEvent.click(option);
    
    expect(onFilterChange).toHaveBeenCalledWith(Species.DOG);
  });
});
