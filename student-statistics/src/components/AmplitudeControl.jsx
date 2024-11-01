import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const CustomInput = styled('div')({
  width: '200px',
  marginBottom: '20px',
  '.slider-container': {
    position: 'relative',
    height: '25px',
    marginBottom: '10px',
    '.slider-track': {
      width: '230px',
      height: '8px',
      backgroundColor: '#ffffff',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      border: '1px solid #d0d0d0',
      borderRadius: '1px',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    },
    '.slider-thumb': {
      position: 'absolute',
      width: '45px',
      height: '24px',
      backgroundColor: '#01012B',
      border: '1px solid #00FFFF',
      borderRadius: '3px',
      transform: 'translateX(-50%)',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      color: '#00FFFF',
      boxShadow: '0 0 8px rgba(0, 255, 255, 0.5)',
      '&:hover': {
        backgroundColor: '#1A1A3A',
        borderColor: '#FF00FF',
      }
    }
  },
  '.number-input': {
    width: '100%',
    height: '1.5em',
    
    padding: '5px 16px',
    fontSize: '14px',
    border: '1px solid #d0d0d0',
    borderRadius: '1px',
    backgroundColor: '#f5f5f5',
    '& input': {
      width: '100%',
      border: 'none',
      outline: 'none',
      textAlign: 'left',
      backgroundColor: '#f5f5f5',
      '&::-webkit-inner-spin-button': {
        opacity: 1,
        WebkitAppearance: 'inner-spin-button',
        cursor: 'pointer',
        display: 'block',
        width: '15px',

        position: 'absolute',
        right: '4px',
        bottom: '1px',
        height: '100%',
        transform: 'scale(1.2)',

      }
    },
    '&::after': {
      content: 'none'
    }
  }
});

const AmplitudeControl = ({ value, onChange, min = 0, max = 10, step = 0.1 }) => {
  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleSliderDrag = (e) => {
    const container = e.currentTarget.closest('.slider-container');
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newValue = (x / rect.width) * max;
    onChange(Math.round(newValue * (1/step)) / (1/step));
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleSliderDrag(e);

    const handleMouseMove = (e) => {
      e.preventDefault();
      handleSliderDrag(e);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    handleSliderDrag(e);

    const handleTouchMove = (e) => {
      e.preventDefault();
      handleSliderDrag(e);
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTrackClick = (e) => {
    handleSliderDrag(e);
  };

  return (
    <CustomInput>
      <div 
        className="slider-container" 
        onClick={handleTrackClick}
        onTouchStart={handleTrackClick}
      >
        <div className="slider-track"></div>
        <div 
          className="slider-thumb" 
          style={{ left: `${(value / max) * 100}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {value}
        </div>
      </div>
      <div className="number-input">
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          onBlur={(e) => {
            const newValue = Number(e.target.value);
            if (newValue < min) onChange(min);
            if (newValue > max) onChange(max);
          }}
          min={min}
          max={max}
          step={step}
          style={{ width: '100%', padding: '4px 8px' }}
        />
      </div>
    </CustomInput>
  );
};

AmplitudeControl.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
};

export default AmplitudeControl; 