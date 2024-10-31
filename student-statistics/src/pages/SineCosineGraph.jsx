import { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { Container, Paper, Typography, Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom CSS styles
const CustomInput = styled('div')({
  width: '200px',
  marginBottom: '20px',
  '.slider-container': {
    position: 'relative',
    height: '25px',
    marginBottom: '10px',
    '.slider-track': {
      width: '100%',
      height: '8px',
      backgroundColor: '#f5f5f5',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '.slider-thumb': {
      position: 'absolute',
      width: '40px',
      height: '24px',
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '3px',
      transform: 'translateX(-50%)',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }
  },
  '.number-input': {
    width: '100%',
    height: '1.5em',
    padding: '6px 12px',
    fontSize: '14px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    '& input': {
      width: '100%',
      border: 'none',
      outline: 'none',
      textAlign: 'left',
    },
    '&::after': {
      content: 'none'
    }
  }
});

const SineCosineGraph = () => {
  const [amplitude, setAmplitude] = useState(1);
  const amplitudeRef = useRef(amplitude); // Initialize ref with current amplitude
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

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setAmplitude(value);
    }
  };

  const handleSliderDrag = (e) => {
    const container = e.currentTarget.closest('.slider-container');
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newValue = (x / rect.width) * 10;
    setAmplitude(Math.round(newValue * 10) / 10);
  };

  const handleMouseDown = (e) => {
    // Start dragging on mouse down
    handleSliderDrag(e);

    const handleMouseMove = (e) => {
      e.preventDefault(); // Prevent text selection during drag
      handleSliderDrag(e);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handler for clicking on the slider track
  const handleTrackClick = (e) => {
    handleSliderDrag(e);
  };

  const handleEndClick = () => {
    setIsStreaming(false);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: { xs: 1, sm: 4 } }}>
      <Paper sx={{ p: { xs: 1, sm: 2 }, overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Sínusová a kosínusová funkcia
        </Typography>
        
        <CustomInput>
          <div className="slider-container" onClick={handleTrackClick}>
            <div className="slider-track"></div>
            <div 
              className="slider-thumb" 
              style={{ left: `${(amplitude / 10) * 100}%` }}
              onMouseDown={handleMouseDown}
            >
              {amplitude}
            </div>
          </div>
          <div className="number-input">
            <input
              type="number"
              value={amplitude}
              onChange={handleInputChange}
              min={0}
              max={10}
              step={0.1}
            />
          </div>
        </CustomInput>

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
            },
            yaxis: { 
              title: 'y',
              showgrid: true,
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
            displayModeBar: false
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '400px' }}
        />
      </Paper>
    </Container>
  );
};

export default SineCosineGraph;
