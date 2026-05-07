import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CheckPage from './pages/CheckPage';
import ResultPage from './pages/ResultPage';
import PricingPage from './pages/PricingPage';
import LegalContentPage from './pages/LegalContentPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="page">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/check" element={<CheckPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/privacy" element={<LegalContentPage type="privacy" />} />
              <Route path="/terms" element={<LegalContentPage type="terms" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
