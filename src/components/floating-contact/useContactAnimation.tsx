
import { useState, useEffect } from "react";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { ReactNode } from "react";

export const useContactAnimation = () => {
  const [currentIcon, setCurrentIcon] = useState<number>(0);
  const [isPulsing, setIsPulsing] = useState(false);

  // Array of contact button icons to cycle through
  const contactIcons: ReactNode[] = [
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

  return {
    currentIcon,
    isPulsing,
    contactIcons
  };
};
