
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="container-custom py-4 md:py-6 flex items-center justify-between">
        <Link to="/" className="z-10">
          <img 
            src="/lovable-uploads/da406eaa-f6f8-4df1-8439-cce21af967c0.png" 
            alt="NPM Мебель" 
            className="h-10 md:h-12"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/catalog" 
            className={`nav-link ${location.pathname === '/catalog' ? 'font-medium' : ''}`}
          >
            Каталог
          </Link>
          <Link 
            to="/customers" 
            className={`nav-link ${location.pathname === '/customers' ? 'font-medium' : ''}`}
          >
            Покупателям
          </Link>
          <Link 
            to="/designers" 
            className={`nav-link ${location.pathname === '/designers' ? 'font-medium' : ''}`}
          >
            Дизайнерам
          </Link>
          <Link 
            to="/information" 
            className={`nav-link ${location.pathname === '/information' ? 'font-medium' : ''}`}
          >
            Информация
          </Link>
        </nav>
        
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
