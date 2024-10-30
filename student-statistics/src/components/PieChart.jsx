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
        title: `Rozdelenie známok - ${year}`,
        responsive: true,
        autosize: true
      }}
      useResizeHandler={true}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired
};

export default PieChart;