
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  
  // Функция для плавной прокрутки к разделу "Дизайнерам"
  const scrollToDesigners = (e: React.MouseEvent) => {
    e.preventDefault();
    const designersSection = document.querySelector('.designers-section');
    if (designersSection) {
      designersSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  // Функция для плавной прокрутки к разделу "О нас"
  const scrollToAboutUs = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/';
      // Добавляем небольшую задержку перед скроллом, чтобы страница успела загрузиться
      setTimeout(() => {
        const aboutUsSection = document.querySelector('.about-us-section');
        if (aboutUsSection) {
          aboutUsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      const aboutUsSection = document.querySelector('.about-us-section');
      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: 'smooth' });
      }
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
          <a 
            href="#designers" 
            onClick={scrollToDesigners}
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/designers' ? 'after:w-2/3' : ''}`}
          >
            Дизайнерам
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/information' || location.pathname === '/blog' ? 'after:w-2/3' : ''}`}>
              Информация
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-npm-blue/20 shadow-md mt-2">
              <DropdownMenuItem asChild>
                <a 
                  href="#about-us" 
                  onClick={scrollToAboutUs}
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  О нас
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/blog"
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  Блог
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/information"
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  Контакты
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
