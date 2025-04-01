
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

  // Функция для плавной прокрутки к разделу каталога
  const scrollToCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    const catalogSection = document.querySelector('.catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  // Функция для плавной прокрутки к разделу "Покупателям"
  const scrollToCustomers = (e: React.MouseEvent) => {
    e.preventDefault();
    const customersSection = document.querySelector('.customers-section');
    if (customersSection) {
      customersSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  return (
    <header 
      className={`navbar ${scrolled ? 'bg-npm-blue/90' : 'bg-transparent'} transition-all duration-300 rounded-b-2xl shadow-lg backdrop-blur-sm`}
    >
      <div className="container-custom py-4 md:py-6 flex items-center justify-between">
        <Link to="/" className="z-10 flex items-center gap-2 text-black">
          <img 
            src="https://i.postimg.cc/vmJS9BL5/1.png" 
            alt="НПМ Логотип" 
            className="h-10 w-auto"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <a 
            href="#catalog" 
            onClick={scrollToCatalog}
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/catalog' ? 'after:w-2/3' : ''}`}
          >
            Каталог
          </a>
          <a 
            href="#customers" 
            onClick={scrollToCustomers}
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/customers' ? 'after:w-2/3' : ''}`}
          >
            Покупателям
          </a>
          <Link 
            to="/designers" 
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/designers' ? 'after:w-2/3' : ''}`}
          >
            Дизайнерам
          </Link>
          <Link 
            to="/information" 
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/information' ? 'after:w-2/3' : ''}`}
          >
            Информация
          </Link>
        </nav>
        
        <button className="md:hidden text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
