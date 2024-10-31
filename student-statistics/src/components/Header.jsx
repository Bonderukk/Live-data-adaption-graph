import { Paper, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <Paper 
      elevation={0}
      sx={{
        py: 3,
        px: 2,
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
        borderRadius: 0
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
          Štatistická analýza
        </Typography>
        <Typography variant="subtitle1">
          Vizualizácia a analýza študijných výsledkov
        </Typography>
      </Box>
    </Paper>
  );
};

export default Header; 