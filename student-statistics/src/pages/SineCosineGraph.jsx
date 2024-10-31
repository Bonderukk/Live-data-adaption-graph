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
      line: { color: '#2ecc71' }
    },
    {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Kosínus',
      line: { color: '#e74c3c' }
    }
  ]);
  const [isStreaming, setIsStreaming] = useState(true);

  // Update the ref whenever amplitude changes
  useEffect(() => {
    amplitudeRef.current = amplitude;
  }, [amplitude]);

  useEffect(() => {
    if (!isStreaming) return;

    const eventSource = new EventSource('http://old.iolab.sk/evaluation/sse/sse.php');
    
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
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 1, sm: 4 } }}>
      <Paper sx={{ p: { xs: 1, sm: 2 }, overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
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
            control={<Checkbox checked={showSine} onChange={(e) => setShowSine(e.target.checked)} />}
            label="Zobraziť sínus"
          />
          <FormControlLabel
            control={<Checkbox checked={showCosine} onChange={(e) => setShowCosine(e.target.checked)} />}
            label="Zobraziť kosínus"
          />
        </Box>

        <Button variant="contained" onClick={handleEndClick}>
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
              fixedrange: isStreaming, // Disable zoom while streaming
            },
            yaxis: { 
              title: 'y',
              showgrid: true,
              fixedrange: isStreaming, // Disable zoom while streaming
            },
            margin: { t: 10, b: 50, l: 50, r: 20 },
            height: 400,
            width: null,
            autosize: true,
            showlegend: true,
            plot_bgcolor: '#fff',
            paper_bgcolor: '#fff',
          }}
          config={{ 
            displayModeBar: !isStreaming, // Only show mode bar when streaming is stopped
            scrollZoom: !isStreaming // Disable scroll zoom while streaming
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '400px' }}
        />
      </Paper>
    </Container>
  );
};

export default SineCosineGraph;
