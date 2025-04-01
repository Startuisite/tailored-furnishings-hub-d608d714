
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Form validation schema with optional isDesigner field and required consent
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  phone: z.string().min(6, {
    message: "Введите корректный номер телефона",
  }),
  email: z.string().email({
    message: "Введите корректный email",
  }),
  message: z.string().optional(),
  isDesigner: z.boolean().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
  }),
});

// Phone-only form schema
const phoneOnlySchema = z.object({
  phone: z.string().min(6, {
    message: "Введите корректный номер телефона",
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
  }),
});

// Form values type
type FormValues = z.infer<typeof formSchema>;
type PhoneOnlyFormValues = z.infer<typeof phoneOnlySchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  customButtonClass?: string;
  showDesignerCheckbox?: boolean;
  phoneOnly?: boolean;
}

const ContactForm = ({ 
  onSuccess, 
  customButtonClass, 
  showDesignerCheckbox = false,
  phoneOnly = false
}: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      isDesigner: false,
      consent: false,
    },
  });

  const phoneOnlyForm = useForm<PhoneOnlyFormValues>({
    resolver: zodResolver(phoneOnlySchema),
    defaultValues: {
      phone: "",
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues | PhoneOnlyFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form submitted:", data);
      toast.success("Ваша заявка успешно отправлена!");
      
      if (phoneOnly) {
        phoneOnlyForm.reset();
      } else {
        fullForm.reset();
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Ошибка при отправке. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (phoneOnly) {
    return (
      <Form {...phoneOnlyForm}>
        <form onSubmit={phoneOnlyForm.handleSubmit(onSubmit)} className="space-y-6 h-full flex flex-col">
          <div className="space-y-6 flex-grow">
            <FormField
              control={phoneOnlyForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="+7 (___) ___-__-__" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={phoneOnlyForm.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Согласие на обработку персональных данных</FormLabel>
                    <FormDescription>
                      Нажимая кнопку, вы даете согласие на обработку персональных данных
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className={`w-full ${customButtonClass || ''}`} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Заказать звонок"}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...fullForm}>
      <form onSubmit={fullForm.handleSubmit(onSubmit)} className="space-y-6 h-full flex flex-col">
        <div className="space-y-6 flex-grow">
          <FormField
            control={fullForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={fullForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <Input placeholder="+7 (___) ___-__-__" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={fullForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={fullForm.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сообщение</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Опишите ваш запрос" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Designer checkbox - only shown if showDesignerCheckbox prop is true */}
          {showDesignerCheckbox && (
            <FormField
              control={fullForm.control}
              name="isDesigner"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Вы дизайнер?</FormLabel>
                    <FormDescription>
                      Мы предоставляем особые условия для дизайнеров
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          )}
          
          {/* Consent checkbox - always shown */}
          <FormField
            control={fullForm.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Согласие на обработку персональных данных</FormLabel>
                  <FormDescription>
                    Нажимая кнопку, вы даете согласие на обработку персональных данных
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className={`w-full ${customButtonClass || ''}`} 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Отправить заявку"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
