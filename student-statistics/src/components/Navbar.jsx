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
    { text: 'Štatistiky známok', path: '/' },
    { text: 'Sínus a Kosínus', path: '/sine-cosine' },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
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
                  color: 'white',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
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