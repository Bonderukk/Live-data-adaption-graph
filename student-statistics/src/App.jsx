import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './Routes';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Navbar />
        <Header />
        <Box sx={{ flex: 1 }}>
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;