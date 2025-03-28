
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
}

const ContactFormDialog = ({
  trigger,
  title = "Заказать консультацию",
  description = "Заполните форму, и наш менеджер свяжется с вами в ближайшее время",
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
