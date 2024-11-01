import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

// Custom hook to get the current window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler immediately to set initial size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
};

const LineChart = ({ data }) => {
  const size = useWindowSize();
  const isSmallScreen = size.width !== undefined && size.width < 600; // Adjust breakpoint as needed

  // Determine legend configuration based on screen size
  const legendConfig = isSmallScreen
    ? {
        orientation: 'h',
        yanchor: 'top',
        y: -0.4,
        xanchor: 'center',
        x: 0.5,
        font: { size: 10 },
        bgcolor: 'rgba(255,255,255,0.9)',
        bordercolor: 'rgba(0,0,0,0.1)',
        borderwidth: 1,
        itemsizing: 'constant',
        itemwidth: 30,
        xgap: 5,
        ygap: 5
      }
    : {
        orientation: 'h',
        yanchor: 'top',
        y: -0.3,
        xanchor: 'center',
        x: 0.5,
        font: { size: 14 },
        bgcolor: 'rgba(255,255,255,0.9)',
        bordercolor: 'rgba(0,0,0,0.1)',
        borderwidth: 1,
        itemsizing: 'constant',
        itemwidth: 30,
        xgap: 10,
        ygap: 10
      };

  // Adjust margin based on screen size to prevent overlap
  const margin = isSmallScreen
    ? { t: 50, b: 150, l: 50, r: 20 } // Increased top margin from 0 to 50
    : { t: 50, b: 120, l: 50, r: 20 };

  // Optionally adjust title font size
  const titleFontSize = isSmallScreen ? 12 : 16;

  return (
    <Plot
      data={[
        {
          x: data.roky,
          y: data.uspesnost,
          type: 'line',
          name: 'Úspešní študenti (A, B, C)',
          marker: { color: '#05FFA1' }
        },
        {
          x: data.roky,
          y: data.neuspesnost,
          type: 'line',
          name: 'Menej úspešní študenti (D, E, FX)',
          marker: { color: '#FF2A6D' }
        }
      ]}
      layout={{
        title: {
          text: 'Pomer úspešnosti študentov',
          font: { size: titleFontSize },
          family: 'Orbitron',
          x: 0.5,
          y: 0.95,  // Adjusted position
          xanchor: 'center',
          yanchor: 'top',  // Added yanchor
        },
        xaxis: { 
          title: 'Akademický rok',
          showgrid: true,
          gridcolor: '#333366',
          linecolor: '#00FFFF'
        },
        yaxis: { 
          title: 'Percentuálne zastúpenie',
          range: [0, 100],
          showgrid: true,
          gridcolor: '#333366',
          linecolor: '#00FFFF'
        },
        legend: {
          ...legendConfig,
          bgcolor: '#01012B',
          bordercolor: '#FF00FF',
          font: {
            color: '#00FFFF',
            size: isSmallScreen ? 9.5 : 14
          }
        },
        margin: margin,
        height: isSmallScreen ? 450 : 500, // Increased height for small screens
        width: null,
        autosize: true,
        showlegend: true,
        plot_bgcolor: '#01012B',
        paper_bgcolor: '#1A1A3A',
        font: { 
          color: '#00FFFF',
          size: isSmallScreen ? 10 : 12
        },
      }}
      config={{ displayModeBar: false }}
      useResizeHandler={true}
      style={{ 
        width: '100%', 
        minHeight: isSmallScreen ? '300px' : '400px',
        maxHeight: isSmallScreen ? '500px' : '600px'
      }}
    />
  );
};

LineChart.propTypes = {
  data: PropTypes.shape({
    roky: PropTypes.arrayOf(PropTypes.string).isRequired,
    uspesnost: PropTypes.arrayOf(PropTypes.number).isRequired,
    neuspesnost: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default LineChart; 