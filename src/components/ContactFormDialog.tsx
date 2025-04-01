
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
}

const ContactFormDialog = ({
  trigger,
  title = "Заказать консультацию",
  description = "Заполните форму, и наш менеджер свяжется с вами в ближайшее время",
  showDesignerCheckbox = false,
  phoneOnly = false,
}: ContactFormDialogProps) => {
  const [open, setOpen] = useState(false);

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
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
