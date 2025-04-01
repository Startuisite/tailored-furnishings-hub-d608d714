
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

interface WhatsAppPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onClick: () => void;
}

const WhatsAppPopup = ({ isVisible, onClose, onClick }: WhatsAppPopupProps) => {
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-4 mb-2 w-64"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">WhatsApp</span>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X size={18} />
        </button>
      </div>
      <p className="text-sm mb-3">Напишите нам в WhatsApp для быстрой связи</p>
      <Button 
        onClick={onClick}
        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Написать в WhatsApp
      </Button>
    </motion.div>
  );
};

export default WhatsAppPopup;
