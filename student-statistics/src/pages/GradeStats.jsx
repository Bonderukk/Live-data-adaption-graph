import { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import { Container, Grid, Paper, Typography } from '@mui/material';

const GradeStats = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/data/z03.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const zaznamy = xmlDoc.getElementsByTagName('zaznam');
        
        const years = [];
        const grades = {
          A: [], B: [], C: [], D: [], E: [], FX: []
        };

        Array.from(zaznamy).reverse().forEach(zaznam => {
          const rok = zaznam.getElementsByTagName('rok')[0].textContent;
          const hodnotenie = zaznam.getElementsByTagName('hodnotenie')[0];
          
          years.push(rok);
          Object.keys(grades).forEach(grade => {
            grades[grade].push(Number(hodnotenie.getElementsByTagName(grade)[0].textContent));
          });
        });

        const uspesnost = years.map((_, index) => {
          const uspesni = grades.A[index] + grades.B[index] + grades.C[index];
          const total = uspesni + grades.D[index] + grades.E[index] + grades.FX[index];
          return (uspesni / total) * 100;
        });

        const neuspesnost = years.map((_, index) => {
          const neuspesni = grades.D[index] + grades.E[index] + grades.FX[index];
          const total = grades.A[index] + grades.B[index] + grades.C[index] + neuspesni;
          return (neuspesni / total) * 100;
        });

        setData({ years, grades, uspesnost, neuspesnost });
      } catch (err) {
        setError('Chyba pri načítaní dát: ' + err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return (
    <Container maxWidth="xl" sx={{ mt: 4, px: { xs: 2, sm: 4 } }}>
      <Paper sx={{ p: 2, textAlign: 'center', color: 'error.main' }}>
        Error: {error}
      </Paper>
    </Container>
  );
  
  if (!data) return (
    <Container maxWidth="xl" sx={{ mt: 4, px: { xs: 2, sm: 4 } }}>
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        Načítavam dáta...
      </Paper>
    </Container>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, px: { xs: 2, sm: 4 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, overflow: 'hidden' }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
            >
              Rozdelenie známok podľa akademických rokov
            </Typography>
            <BarChart data={data} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, overflow: 'hidden' }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
            >
              Analýza úspešnosti študentov v priebehu rokov
            </Typography>
            <LineChart 
              data={{
                roky: data.years,
                uspesnost: data.uspesnost,
                neuspesnost: data.neuspesnost
              }} 
            />
          </Paper>
        </Grid>
        <Grid container item spacing={1}>
          {data.years.map((year, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={year}>
              <Paper sx={{ 
                p: { xs: 1, sm: 2 },
                height: '100%',
                minHeight: '350px'
              }}>
                <Typography 
                  variant="subtitle1" 
                  align="center" 
                  gutterBottom 
                  sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                >
                  {year}
                </Typography>
                <PieChart 
                  data={{
                    A: data.grades.A[index],
                    B: data.grades.B[index],
                    C: data.grades.C[index],
                    D: data.grades.D[index],
                    E: data.grades.E[index],
                    FX: data.grades.FX[index],
                  }}
                  year={year}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GradeStats;