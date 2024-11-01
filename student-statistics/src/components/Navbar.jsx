import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { 
      text: <>
        <span style={{ fontFamily: 'Arial' }}>Š</span>
        tatistiky známok
      </>, 
      path: '/' 
    },
    { text: 'Sínus a Kosínus', path: '/sine-cosine' },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: '#01012B',  // Dark blue background
        borderBottom: '2px solid #FF00FF'  // Hot pink border
      }}
    >
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ 
                color: '#00FFFF',  // Cyan color for menu icon
                '&:hover': {
                  color: '#FF00FF'  // Hot pink on hover
                },
                '&:focus': {  // Add these styles
                  outline: 'none',
                  background: 'transparent'
                },
                '&:active': {  // Add these styles
                  outline: 'none',
                  background: 'transparent'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#01012B',  // Dark blue background
                  border: '1px solid #FF00FF'  // Hot pink border
                },
                '& .MuiMenuItem-root': {
                  color: '#00FFFF',  // Cyan text
                  '&:hover': {
                    backgroundColor: '#1A1A3A',  // Slightly lighter dark blue
                    color: '#FF00FF'  // Hot pink on hover
                  }
                }
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleClose}
                  selected={location.pathname === item.path}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                sx={{
                  color: '#00FFFF',  // Cyan text
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: '#1A1A3A',  // Slightly lighter dark blue
                    color: '#FF00FF'  // Hot pink on hover
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;