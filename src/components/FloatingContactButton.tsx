
import { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Phone, 
  X,
  MessageSquare,
  Mail,
  Headphones
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "./ContactFormDialog";
import { motion, AnimatePresence } from "framer-motion";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [currentIcon, setCurrentIcon] = useState<number>(0);
  const [isPulsing, setIsPulsing] = useState(true);

  // Array of contact button icons to cycle through
  const contactIcons = [
    <MessageCircle key="message" size={24} />,
    <Phone key="phone" size={24} />,
    <Mail key="mail" size={24} />
  ];

  // Cycle between icons every 3 seconds
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % contactIcons.length);
    }, 3000);

    // Create attention-grabbing pulse animation interval
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 5000);

    return () => {
      clearInterval(iconInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/message/CHYQHBO6KIQMP1', '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* WhatsApp popup */}
      <AnimatePresence>
        {showWhatsAppPopup && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-4 mb-2 w-64"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">WhatsApp</span>
              <button 
                onClick={() => setShowWhatsAppPopup(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm mb-3">Напишите нам в WhatsApp для быстрой связи</p>
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Написать в WhatsApp
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end space-y-3">
        {isOpen && (
          <>
            {/* WhatsApp button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative"
              onMouseEnter={() => setIsHovered('whatsapp')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Button
                size="icon"
                className={`rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg transition-transform transform hover:scale-110 ${isHovered === 'whatsapp' ? 'scale-110' : ''}`}
                onClick={handleWhatsAppClick}
              >
                <MessageCircle size={24} />
              </Button>
              {isHovered === 'whatsapp' && (
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Написать в WhatsApp
                </div>
              )}
            </motion.div>

            {/* Contact Form button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              exit={{ opacity: 0, y: 20 }}
              className="relative"
              onMouseEnter={() => setIsHovered('contact')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <ContactFormDialog
                trigger={
                  <Button
                    size="icon"
                    className={`rounded-full bg-accent hover:bg-accent/80 shadow-lg transition-transform transform hover:scale-110 ${isHovered === 'contact' ? 'scale-110' : ''}`}
                  >
                    <MessageSquare size={24} />
                  </Button>
                }
                title="Оставьте ваши данные"
                description="Заполните форму, и мы свяжемся с вами в ближайшее время"
              />
              {isHovered === 'contact' && (
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Оставить заявку
                </div>
              )}
            </motion.div>

            {/* Call button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, y: 20 }}
              className="relative"
              onMouseEnter={() => setIsHovered('call')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <ContactFormDialog
                trigger={
                  <Button
                    size="icon"
                    className={`rounded-full bg-primary hover:bg-primary/80 shadow-lg transition-transform transform hover:scale-110 ${isHovered === 'call' ? 'scale-110' : ''}`}
                  >
                    <Phone size={24} />
                  </Button>
                }
                title="Заказать звонок"
                description="Оставьте свой номер телефона, и мы перезвоним вам в ближайшее время"
              />
              {isHovered === 'call' && (
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Заказать звонок
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* Main toggle button with animated icon change */}
        <motion.div
          animate={{
            scale: isPulsing ? [1, 1.1, 1] : 1,
            boxShadow: isPulsing ? "0px 0px 8px 4px rgba(155, 135, 245, 0.6)" : "0px 0px 0px 0px rgba(155, 135, 245, 0)"
          }}
          transition={{
            scale: { duration: 0.6, ease: "easeInOut" },
            boxShadow: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <Button
            size="lg"
            className={`rounded-full shadow-lg transition-colors ${
              isOpen 
                ? "bg-accent text-accent-foreground" 
                : "bg-[#9b87f5] text-white hover:bg-[#8a70fa]"
            } hover:scale-110 transition-transform transform relative`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : contactIcons[currentIcon]}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingContactButton;
