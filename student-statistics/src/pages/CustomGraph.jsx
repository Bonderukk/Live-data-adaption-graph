import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Container, Paper, Typography } from '@mui/material';

const CustomGraph = () => {
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
        
        const roky = [];
        const grades = {
          A: [], B: [], C: [], D: [], E: [], FX: []
        };

        // Process records in reverse order (newest first)
        Array.from(zaznamy).reverse().forEach(zaznam => {
          const rok = zaznam.getElementsByTagName('rok')[0].textContent;
          const hodnotenie = zaznam.getElementsByTagName('hodnotenie')[0];
          
          roky.push(rok);
          Object.keys(grades).forEach(grade => {
            grades[grade].push(Number(hodnotenie.getElementsByTagName(grade)[0].textContent));
          });
        });

        // Calculate success percentages
        const uspesnost = roky.map((_, index) => {
          const uspesni = grades.A[index] + grades.B[index] + grades.C[index];
          const total = uspesni + grades.D[index] + grades.E[index] + grades.FX[index];
          return (uspesni / total) * 100;
        });

        const neuspesnost = roky.map((_, index) => {
          const neuspesni = grades.D[index] + grades.E[index] + grades.FX[index];
          const total = grades.A[index] + grades.B[index] + grades.C[index] + neuspesni;
          return (neuspesni / total) * 100;
        });

        setData({ roky, uspesnost, neuspesnost });
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
      <Paper sx={{ p: { xs: 1, sm: 2 }, overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Analýza úspešnosti študentov v priebehu rokov
        </Typography>
        <Plot
          data={[
            {
              x: data.roky,
              y: data.uspesnost,
              type: 'line',
              name: 'Úspešní študenti (A, B, C)',
              marker: { color: '#2ecc71' }
            },
            {
              x: data.roky,
              y: data.neuspesnost,
              type: 'line',
              name: 'Menej úspešní študenti (D, E, FX)',
              marker: { color: '#e74c3c' }
            }
          ]}
          layout={{
            title: 'Pomer úspešnosti študentov v percentách',
            xaxis: { 
              title: 'Akademický rok',
              showgrid: true,
            },
            yaxis: { 
              title: 'Percentuálne zastúpenie',
              range: [0, 100],
              showgrid: true,
            },
            legend: {
              orientation: 'h',
              yanchor: 'top',
              y: -0.6,
              xanchor: 'center',
              x: 0.5,
              font: {
                size: 14
              },
              bgcolor: 'rgba(255,255,255,0.9)',
              bordercolor: 'rgba(0,0,0,0.1)',
              borderwidth: 1,
              itemsizing: 'constant',
              itemwidth: 30,
              xgap: 10,
              ygap: 10
            },
            margin: { 
              t: 50, 
              b: 180,
              l: 50,
              r: 20 
            },
            height: 400,
            width: null,
            autosize: true,
            showlegend: true,
            plot_bgcolor: '#fff',
            paper_bgcolor: '#fff',
            font: {
              size: 12
            },
          }}
          config={{ displayModeBar: false }}
          useResizeHandler={true}
          style={{ 
            width: '100%', 
            minHeight: '400px',
            maxHeight: '600px'
          }}
        />
      </Paper>
    </Container>
  );
};

export default CustomGraph;