import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CheckPage from './pages/CheckPage';
import ResultPage from './pages/ResultPage';
import PricingPage from './pages/PricingPage';
import LegalContentPage from './pages/LegalContentPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ArticlesPage from './pages/ArticlesPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app">
            <div className="bg-blobs">
              <div className="blob blob-1"></div>
              <div className="blob blob-2"></div>
              <div className="blob blob-3"></div>
            </div>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/check" element={<CheckPage />} />
                <Route path="/result" element={<ResultPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/privacy" element={<LegalContentPage type="privacy" />} />
                <Route path="/terms" element={<LegalContentPage type="terms" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
