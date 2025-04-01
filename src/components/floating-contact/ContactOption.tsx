
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContactOptionProps {
  icon: ReactNode;
  label: string;
  color: string;
  onClick?: () => void;
  isHovered: boolean;
  setIsHovered: (value: string | null) => void;
  id: string;
  children?: ReactNode;
}

const ContactOption = ({ 
  icon, 
  label, 
  color, 
  onClick, 
  isHovered, 
  setIsHovered, 
  id,
  children
}: ContactOptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative"
      onMouseEnter={() => setIsHovered(id)}
      onMouseLeave={() => setIsHovered(null)}
    >
      {onClick ? (
        <Button
          size="icon"
          className={`rounded-full ${color} shadow-lg transition-transform transform hover:scale-110 ${isHovered === id ? 'scale-110' : ''}`}
          onClick={onClick}
        >
          {icon}
        </Button>
      ) : (
        children
      )}
      {isHovered === id && (
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {label}
        </div>
      )}
    </motion.div>
  );
};

export default ContactOption;
