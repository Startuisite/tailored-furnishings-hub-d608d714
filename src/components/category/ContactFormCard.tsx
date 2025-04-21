
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  email: z.string().email({ message: "Введите корректный email" }).optional().or(z.literal('')),
  message: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, { message: "Необходимо согласие на обработку персональных данных" }),
});
type FormValues = z.infer<typeof formSchema>;

const ContactFormCard = () => {
  const designerForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: false,
    }
  });

  const onDesignerSubmit = async (data: FormValues) => {
    try {
      const formData = {
        "Имя": data.name,
        "Телефон": data.phone,
        "Email": data.email || "",
        "Сообщение": data.message || "",
        "Тип клиента": "Обычный", 
        "Статус": "Новая"
      };
      const { error } = await supabase
        .from("client_requests")
        .insert(formData);
      if (error) {
        throw error;
      }
      toast.success("Ваша заявка успешно отправлена!");
      designerForm.reset();
    } catch (error) {
      toast.error("Ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  };

  return (
    <div>
      <h2 className="section-title mb-6">Свяжитесь с нами</h2>
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <Form {...designerForm}>
            <form onSubmit={designerForm.handleSubmit(onDesignerSubmit)} className="space-y-4">
              <FormField
                control={designerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите ваше имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={designerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (необязательно)</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите ваш email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={designerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите ваш телефон" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={designerForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сообщение</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ваше сообщение" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={designerForm.control}
                name="agreement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Я согласен с политикой конфиденциальности</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#b3c9dd] text-black hover:bg-[#b3c9dd]/80">
                Отправить
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactFormCard;
