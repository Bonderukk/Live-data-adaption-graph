import { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { Container, Paper, Typography, Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import AmplitudeControl from '../components/AmplitudeControl';

const SineCosineGraph = () => {
  const [amplitude, setAmplitude] = useState(1);
  const amplitudeRef = useRef(amplitude);
  const [showSine, setShowSine] = useState(true);
  const [showCosine, setShowCosine] = useState(true);
  const [data, setData] = useState([
    {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Sínus',
      line: { color: '#05FFA1' }
    },
    {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Kosínus',
      line: { color: '#FF2A6D' }
    }
  ]);
  const [isStreaming, setIsStreaming] = useState(true);

  // Update the ref whenever amplitude changes
  useEffect(() => {
    amplitudeRef.current = amplitude;
  }, [amplitude]);

  useEffect(() => {
    if (!isStreaming) return;

    const eventSource = new EventSource('https://old.iolab.sk/evaluation/sse/sse.php');
    
    eventSource.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        
        if (!receivedData || !receivedData.x || !receivedData.y1 || !receivedData.y2) {
          console.error('Invalid data format received:', receivedData);
          return;
        }

        setData(prevData => [
          {
            ...prevData[0],
            x: [...prevData[0].x, parseFloat(receivedData.x)],
            y: [...prevData[0].y, parseFloat(receivedData.y1) * amplitudeRef.current],
          },
          {
            ...prevData[1],
            x: [...prevData[1].x, parseFloat(receivedData.x)],
            y: [...prevData[1].y, parseFloat(receivedData.y2) * amplitudeRef.current],
          }
        ]);
      } catch (error) {
        console.error('Error processing SSE data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [isStreaming]); // Removed `amplitude` from dependencies

  const handleEndClick = () => {
    setIsStreaming(false);
  };

  return (
    <Container maxWidth={false} sx={{ 
      py: 4, 
      px: { xs: 1, sm: 4 },
      backgroundColor: '#01012B'
    }}>
      <Paper sx={{ 
        p: { xs: 1, sm: 2 }, 
        overflow: 'auto',
        backgroundColor: '#1A1A3A',
        color: '#00FFFF',
        border: '1px solid #FF00FF'
      }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#FF00FF' }}>
          Sínusová a kosínusová funkcia
        </Typography>
        
        <AmplitudeControl 
          value={amplitude}
          onChange={setAmplitude}
          min={0}
          max={10}
          step={0.1}
        />

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={showSine} 
                onChange={(e) => setShowSine(e.target.checked)}
                sx={{
                  color: '#00FFFF',
                  '&.Mui-checked': {
                    color: '#05FFA1',
                  },
                }}
              />
            }
            label="Zobraziť sínus"
            sx={{ color: '#00FFFF' }}
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={showCosine} 
                onChange={(e) => setShowCosine(e.target.checked)}
                sx={{
                  color: '#00FFFF',
                  '&.Mui-checked': {
                    color: '#FF2A6D',
                  },
                }}
              />
            }
            label="Zobraziť kosínus"
            sx={{ color: '#00FFFF' }}
          />
        </Box>

        <Button 
          variant="contained" 
          onClick={handleEndClick}
          sx={{
            backgroundColor: '#FF00FF',
            color: '#00FFFF',
            '&:hover': {
              backgroundColor: '#B967FF',
            },
            mb: 2
          }}
        >
          Koniec
        </Button>

        <Plot
          data={data.filter((_, index) => 
            (index === 0 && showSine) || (index === 1 && showCosine)
          )}
          layout={{
            xaxis: { 
              title: 'x',
              showgrid: true,
              fixedrange: isStreaming,
              gridcolor: '#333366',
              linecolor: '#00FFFF',
              tickfont: { color: '#00FFFF' }
            },
            yaxis: { 
              title: 'y',
              showgrid: true,
              fixedrange: isStreaming,
              gridcolor: '#333366',
              linecolor: '#00FFFF',
              tickfont: { color: '#00FFFF' }
            },
            margin: { t: 10, b: 50, l: 50, r: 20 },
            height: 400,
            width: null,
            autosize: true,
            showlegend: true,
            plot_bgcolor: '#01012B',
            paper_bgcolor: '#1A1A3A',
            font: { color: '#00FFFF' },
            legend: {
              font: { color: '#00FFFF' },
              bgcolor: '#01012B',
              bordercolor: '#FF00FF'
            }
          }}
          config={{ 
            displayModeBar: !isStreaming,
            scrollZoom: !isStreaming
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '400px' }}
        />
      </Paper>
    </Container>
  );
};

export default SineCosineGraph;
