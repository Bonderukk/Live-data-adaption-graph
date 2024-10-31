import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const PieChart = ({ data, year }) => {
  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: Object.values(data),
          labels: ['A', 'B', 'C', 'D', 'E'],
          textinfo: 'label+percent',
        },
      ]}
      layout={{
        title: {
          text: `Rozdelenie známok - ${year}`,
          font: { size: 14 },
          xref: 'paper',
          x: 0.8,
          y: 0.95,
          xanchor: 'center',
          yanchor: 'top'
        },
        responsive: true,
        autosize: true,
        margin: { t: 60, b: 20, l: 20, r: 20 },
        height: 300,
        font: {
          size: 11
        }
      }}
      useResizeHandler={true}
      style={{ width: '100%', height: '300px' }}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired
};

export default PieChart;