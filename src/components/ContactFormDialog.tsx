
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ContactForm from "./ContactForm";

interface ContactFormDialogProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  showDesignerCheckbox?: boolean;
  phoneOnly?: boolean;
  sourcePageType?: 'designers' | 'customers' | 'default';
  // Add controlled state props (optional)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ContactFormDialog = ({
  trigger,
  title = "Заказать расчёт",
  description = "Заполните форму, и наш менеджер свяжется с вами в ближайшее время",
  showDesignerCheckbox = true,
  phoneOnly = false,
  sourcePageType = 'default',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ContactFormDialogProps) => {
  // Use internal state if not controlled externally
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;

  const handleSuccess = () => {
    // Close dialog on successful form submission
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription className="text-sm">{description}</DialogDescription>
        </DialogHeader>
        <ContactForm 
          onSuccess={handleSuccess} 
          showDesignerCheckbox={showDesignerCheckbox}
          phoneOnly={phoneOnly}
          sourcePageType={sourcePageType}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
