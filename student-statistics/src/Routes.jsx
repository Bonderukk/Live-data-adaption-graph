import { Routes, Route } from 'react-router-dom';
import GradeStats from './pages/GradeStats';
import SineCosineGraph from './pages/SineCosineGraph';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GradeStats />} />
      <Route path="/sine-cosine" element={<SineCosineGraph />} />
    </Routes>
  );
};

export default AppRoutes; 