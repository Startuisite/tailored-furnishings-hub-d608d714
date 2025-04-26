import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for background effect
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Handle header visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionClass: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      const section = document.querySelector(`.${sectionClass}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionClass } });
    }
    setIsOpen(false); // Close the menu after clicking
  };

  const navigateToPage = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
    setIsOpen(false); // Close the menu after clicking
  };

  const mobileMenuItems = [
    { title: "Каталог", action: (e: React.MouseEvent) => scrollToSection('catalog-section', e) },
    { title: "Покупателям", action: (e: React.MouseEvent) => scrollToSection('customers-section', e) },
    { title: "Дизайнерам", action: (e: React.MouseEvent) => scrollToSection('designers-section', e) },
    { title: "О нас", action: (e: React.MouseEvent) => scrollToSection('customers-section', e) },
    { title: "Блог", action: (e: React.MouseEvent) => navigateToPage('/blog', e) },
    { title: "Контакты", action: (e: React.MouseEvent) => navigateToPage('/information', e) },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on another page, navigate to homepage
      navigate('/', { 
        state: { scrollTo: 'top' }  // Optional: pass state to scroll on homepage mount
      });
      window.scrollTo(0, 0);  // Immediately scroll to top
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <header 
      className={`navbar ${scrolled ? 'bg-npm-blue/90' : 'bg-transparent'} 
        transition-all duration-300 rounded-b-2xl shadow-lg backdrop-blur-sm
        transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container-custom py-4 md:py-6 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={handleLogoClick} 
          className="z-10 flex items-center gap-2 text-black"
        >
          <img 
            src="https://i.postimg.cc/vmJS9BL5/1.png" 
            alt="НПМ Логотип" 
            className="h-10 w-auto"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <a 
            href="#catalog" 
            onClick={(e) => scrollToSection('catalog-section', e)}
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/catalog' ? 'after:w-2/3' : ''}`}
          >
            Каталог
          </a>
          <a 
            href="#customers" 
            onClick={(e) => scrollToSection('customers-section', e)}
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/customers' ? 'after:w-2/3' : ''}`}
          >
            Покупателям
          </a>
          <a 
            href="#designers" 
            onClick={(e) => scrollToSection('designers-section', e)}
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
                  onClick={(e) => scrollToSection('customers-section', e)}
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  О нас
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href="/blog"
                  onClick={(e) => navigateToPage('/blog', e)}
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  Блог
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href="/information"
                  onClick={(e) => navigateToPage('/information', e)}
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  Контакты
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="text-black p-2">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <div className="px-4 py-6">
                <img 
                  src="https://i.postimg.cc/vmJS9BL5/1.png" 
                  alt="НПМ Логотип" 
                  className="h-8 w-auto"
                />
              </div>
            </SheetHeader>
            <nav className="px-4">
              {mobileMenuItems.map((item) => (
                <a
                  key={item.title}
                  href="#"
                  onClick={item.action}
                  className="flex items-center px-4 py-3 text-black hover:bg-npm-light rounded-lg transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
