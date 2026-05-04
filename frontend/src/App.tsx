import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import PetListPage from './pages/PetListPage';

function App() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#2c3e50' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            PetCommerce
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <PetListPage />
      </Container>
    </Box>
  );
}

export default App;
