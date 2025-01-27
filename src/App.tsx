import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AppChecker from './components/AppChecker';
import RiskCalculator from './components/RiskCalculator';
import GamingGuide from './components/GamingGuide';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app-checker" element={<AppChecker />} />
            <Route path="/risk-calculator" element={<RiskCalculator />} />
            <Route path="/gaming-guide" element={<GamingGuide />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;