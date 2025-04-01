
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Designers from './pages/Designers';
import Information from './pages/Information';
import Catalog from './pages/Catalog';
import CategoryDetail from './pages/CategoryDetail';
import Customers from './pages/Customers';
import NotFound from './pages/NotFound';
import FloatingContactButton from './components/floating-contact/FloatingContactButton';
import { Toaster } from './components/ui/toaster';
import { isSupabaseConfigured } from './utils/supabaseClient';

function App() {
  useEffect(() => {
    // Check if Supabase is properly configured
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase configuration is missing. Make sure to set the environment variables:');
      console.warn('- VITE_SUPABASE_URL');
      console.warn('- VITE_SUPABASE_ANON_KEY');
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/information" element={<Information />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingContactButton />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
