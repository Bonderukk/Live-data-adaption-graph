import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GradeStats from './pages/GradeStats';
import CustomGraph from './pages/CustomGraph';
import SineCosineGraph from './pages/SineCosineGraph';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<GradeStats />} />
          <Route path="/custom" element={<CustomGraph />} />
          <Route path="/sine-cosine" element={<SineCosineGraph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;