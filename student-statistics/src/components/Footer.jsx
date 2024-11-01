import { Paper, Typography, Box} from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Paper 
      component="footer" 
      elevation={3}
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#01012B',  // Dark blue background
        color: '#00FFFF',  // Cyan text
        borderTop: '2px solid #FF00FF'  // Hot pink border
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 'lg',
        mx: 'auto'
      }}>
        <Typography variant="body2" sx={{ mb: { xs: 1, sm: 0 } }}>
          © {currentYear} Matúš Bednařík.
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>

        </Box>
      </Box>
    </Paper>
  );
};

export default Footer; 