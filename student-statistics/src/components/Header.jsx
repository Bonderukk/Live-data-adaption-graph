import { Paper, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <Paper 
      elevation={0}
      sx={{
        py: 3,
        px: 2,
        backgroundColor: '#01012B',
        color: '#00FFFF',
        borderRadius: 0,
        borderBottom: '2px solid #FF00FF',
        mb: 0
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, color: '#FF00FF' }}>
          Štatistická analýza
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#00FFFF' }}>
          Vizualizácia a analýza študijných výsledkov
        </Typography>
      </Box>
    </Paper>
  );
};

export default Header; 