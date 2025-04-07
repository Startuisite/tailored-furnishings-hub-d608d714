
import { useState } from "react";
import { MessageCircle, X, MessageSquare, Phone } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ContactFormDialog from "../ContactFormDialog";
import ContactButton from "./ContactButton";
import ContactOption from "./ContactOption";
import WhatsAppPopup from "./WhatsAppPopup";
import { useContactAnimation } from "./useContactAnimation";
import { Button } from "@/components/ui/button";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const { currentIcon, isPulsing, contactIcons } = useContactAnimation();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/79180584061', '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* WhatsApp popup */}
      <AnimatePresence>
        <WhatsAppPopup 
          isVisible={showWhatsAppPopup}
          onClose={() => setShowWhatsAppPopup(false)}
          onClick={handleWhatsAppClick}
        />
      </AnimatePresence>

      <div className="flex flex-col items-end space-y-3">
        {isOpen && (
          <>
            {/* WhatsApp button */}
            <ContactOption
              id="whatsapp"
              icon={<MessageCircle size={24} />}
              label="Написать в WhatsApp"
              color="bg-[#fbf6f0] hover:bg-[#fbf6f0]/80"
              onClick={handleWhatsAppClick}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            />

            {/* Contact Form button */}
            <ContactOption
              id="contact"
              icon={<></>}
              label="Оставить заявку"
              color=""
              isHovered={isHovered}
              setIsHovered={setIsHovered}
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
                showDesignerCheckbox={true}
                sourcePageType="default"
              />
            </ContactOption>

            {/* Call button */}
            <ContactOption
              id="call"
              icon={<></>}
              label="Заказать звонок"
              color=""
              isHovered={isHovered}
              setIsHovered={setIsHovered}
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
                phoneOnly={true}
                sourcePageType="default"
              />
            </ContactOption>
          </>
        )}

        {/* Main toggle button with color change to #e5dbb7 */}
        <ContactButton 
          isOpen={isOpen} 
          onClick={() => setIsOpen(!isOpen)} 
          isPulsing={isPulsing}
          className="bg-[#e5dbb7] hover:bg-[#e5dbb7]/80 text-black"
        >
          {isOpen ? <X size={24} /> : contactIcons[currentIcon]}
        </ContactButton>
      </div>
    </div>
  );
};

export default FloatingContactButton;
