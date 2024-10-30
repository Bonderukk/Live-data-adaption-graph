import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GradeStats from './pages/GradeStats';
import CustomGraph from './pages/CustomGraph';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<GradeStats />} />
          <Route path="/custom" element={<CustomGraph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;