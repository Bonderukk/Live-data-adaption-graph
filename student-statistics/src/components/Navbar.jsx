import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Štatistiky známok
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Štatistiky
        </Button>
        <Button color="inherit" component={Link} to="/custom">
          Vlastný graf
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;