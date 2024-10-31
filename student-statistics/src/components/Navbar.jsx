import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Štatistiky známok
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/custom"
          >
            Vlastný graf
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/sine-cosine"
          >
            Sínus a Kosínus
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;