import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const BarChart = ({ data }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create data series with correct orientation
  const createDataSeries = () => {
    const grades = ['A', 'B', 'C', 'D', 'E'];
    return grades.map(grade => ({
      x: isSmallScreen ? data.grades[grade] : data.years,
      y: isSmallScreen ? data.years : data.grades[grade],
      name: grade,
      type: 'bar',
      orientation: isSmallScreen ? 'h' : 'v',  // Add explicit orientation
      marker: {
        color: {
          'A': '#4CAF50',
          'B': '#8BC34A',
          'C': '#CDDC39',
          'D': '#FFC107',
          'E': '#FF5722'
        }[grade]
      }
    }));
  };

  return (
    <Plot
      data={createDataSeries()}
      layout={{
        title: {
          text: 'Počet študentov podľa známok v jednotlivých rokoch',
          font: { size: isSmallScreen ? 12 : 14 },
          xref: 'paper',
          x: 0.5,
          xanchor: 'center',
          y: 0.95,
          yanchor: 'top'
        },
        barmode: 'group',
        height: isSmallScreen ? 600 : 350,
        width: null,
        autosize: true,
        margin: {
          l: isSmallScreen ? 120 : 50,
          r: isSmallScreen ? 20 : 100,
          t: 50,
          b: isSmallScreen ? 100 : 50,
          pad: 4
        },
        xaxis: {
          title: isSmallScreen ? 'Počet študentov' : 'Akademický rok',
          showgrid: true,
          automargin: true
        },
        yaxis: {
          title: isSmallScreen ? 'Akademický rok' : 'Počet študentov',
          showgrid: true,
          automargin: true
        },
        legend: {
          orientation: isSmallScreen ? 'h' : 'v',
          yanchor: isSmallScreen ? 'bottom' : 'middle',
          y: isSmallScreen ? -0.5 : 0.5,
          xanchor: isSmallScreen ? 'center' : 'left',
          x: isSmallScreen ? 0.4 : 1.05,
          bgcolor: 'rgba(255,255,255,0.9)',
          bordercolor: 'rgba(0,0,0,0.1)',
          borderwidth: 1
        },
        font: {
          size: 10
        }
      }}
      config={{ displayModeBar: false }}
      useResizeHandler={true}
      style={{
        width: '100%',
        minHeight: isSmallScreen ? '600px' : '350px'
      }}
    />
  );
};

BarChart.propTypes = {
  data: PropTypes.shape({
    years: PropTypes.arrayOf(PropTypes.string).isRequired,
    grades: PropTypes.shape({
      A: PropTypes.arrayOf(PropTypes.number).isRequired,
      B: PropTypes.arrayOf(PropTypes.number).isRequired,
      C: PropTypes.arrayOf(PropTypes.number).isRequired,
      D: PropTypes.arrayOf(PropTypes.number).isRequired,
      E: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BarChart;