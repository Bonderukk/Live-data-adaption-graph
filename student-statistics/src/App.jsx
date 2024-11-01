import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './Routes';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import './App.css';  // Import the CSS file

// Create custom MUI theme with cyberpunk fonts
const theme = createTheme({
  typography: {
    fontFamily: ['Orbitron', 'Rajdhani', 'sans-serif'].join(','),
    h1: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h2: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h3: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h4: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h5: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h6: {
      fontFamily: 'Orbitron, sans-serif',
    },
    body1: {
      fontFamily: 'Rajdhani, sans-serif',
    },
    body2: {
      fontFamily: 'Rajdhani, sans-serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename='/~xbednarikm3/tazky_nazov3'>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#01012B',
          width: '100%',
          margin: 0,
          padding: 0,
        }}>
          <Navbar />
          <Header />
          <Box sx={{ 
            flex: 1,
            backgroundColor: '#01012B',
          }}>
            <AppRoutes />
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;