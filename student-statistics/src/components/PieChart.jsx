import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const PieChart = ({ data, year }) => {
  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: Object.values(data),
          labels: ['A', 'B', 'C', 'D', 'E', 'FX'],
          textinfo: 'percent',
          textposition: 'inside',
          marker: {
            colors: [
              '#FF00FF',  // Hot Pink (A)
              '#00FFFF',  // Cyan (B)
              '#FF2A6D',  // Neon Red (C)
              '#05FFA1',  // Neon Green (D)
              '#B967FF',  // Neon Purple (E)
              '#01012B'   // Dark Blue (FX)
            ]
          },
          hoverinfo: 'label+percent',
          hole: 0,
        },
      ]}
      layout={{
        title: {
          text: `Rozdelenie známok - ${year}`,
          font: { size: 12.5, color: '#00FFFF' },
          xref: 'paper',
          x: 0.5,
          y: 0.95,
          xanchor: 'center',
          yanchor: 'top'
        },
        showlegend: true,
        legend: {
          orientation: 'h',
          y: -0.1,
          x: 0.5,
          xanchor: 'center',
          font: { color: '#00FFFF' },
          bgcolor: '#1A1A3A'
        },
        margin: { t: 50, b: 50, l: 20, r: 20 },
        height: 300,
        paper_bgcolor: '#1A1A3A',
        plot_bgcolor: '#1A1A3A',
      }}
      useResizeHandler={true}
      style={{ width: '100%', height: '350px' }}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired
};

export default PieChart;