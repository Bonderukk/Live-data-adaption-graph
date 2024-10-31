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
    ? { t: 0, b: 150, l: 50, r: 20 } // Increased bottom margin from 100 to 150
    : { t: 50, b: 120, l: 50, r: 20 };

  // Optionally adjust title font size
  const titleFontSize = isSmallScreen ? 14 : 16;

  return (
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
        title: {
          text: 'Pomer úspešnosti študentov v percentách',
          font: { size: titleFontSize },
          x: 0.5,
          xanchor: 'center',
        },
        xaxis: { 
          title: 'Akademický rok',
          showgrid: true,
        },
        yaxis: { 
          title: 'Percentuálne zastúpenie',
          range: [0, 100],
          showgrid: true,
        },
        legend: legendConfig,
        margin: margin,
        height: isSmallScreen ? 400 : 500, // Adjust height based on screen size
        width: null,
        autosize: true,
        showlegend: true,
        plot_bgcolor: '#fff',
        paper_bgcolor: '#fff',
        font: { size: isSmallScreen ? 10 : 12 },
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