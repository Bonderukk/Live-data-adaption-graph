import { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { Container, Grid, Paper } from '@mui/material';

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
        
        // Získanie všetkých záznamov
        const zaznamy = xmlDoc.getElementsByTagName('zaznam');
        
        // Príprava dátových štruktúr
        const years = [];
        const grades = {
          A: [],
          B: [],
          C: [],
          D: [],
          E: []
        };

        // Prechádzanie záznamov v opačnom poradí (od najnovšieho)
        Array.from(zaznamy).reverse().forEach(zaznam => {
          const rok = zaznam.getElementsByTagName('rok')[0].textContent;
          const hodnotenie = zaznam.getElementsByTagName('hodnotenie')[0];
          
          years.push(rok);
          grades.A.push(Number(hodnotenie.getElementsByTagName('A')[0].textContent));
          grades.B.push(Number(hodnotenie.getElementsByTagName('B')[0].textContent));
          grades.C.push(Number(hodnotenie.getElementsByTagName('C')[0].textContent));
          grades.D.push(Number(hodnotenie.getElementsByTagName('D')[0].textContent));
          grades.E.push(Number(hodnotenie.getElementsByTagName('E')[0].textContent));
        });

        setData({ years, grades });
      } catch (err) {
        setError('Chyba pri načítaní dát: ' + err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return (
    <Container maxWidth={false} sx={{ mt: 4, px: 4 }}>
      <Paper sx={{ p: 2, textAlign: 'center', color: 'error.main' }}>
        Error: {error}
      </Paper>
    </Container>
  );
  
  if (!data) return (
    <Container maxWidth={false} sx={{ mt: 4, px: 4 }}>
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        Načítavam dáta...
      </Paper>
    </Container>
  );

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: { xs: 1, sm: 4 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 1, overflow: 'auto' }}>
            <BarChart data={data} />
          </Paper>
        </Grid>
        {data.years.map((year, index) => (
          <Grid item xs={12} key={year}>
            <Paper sx={{ p: 1 }}>
              <PieChart 
                data={{
                  A: data.grades.A[index],
                  B: data.grades.B[index],
                  C: data.grades.C[index],
                  D: data.grades.D[index],
                  E: data.grades.E[index],
                }}
                year={year}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GradeStats;