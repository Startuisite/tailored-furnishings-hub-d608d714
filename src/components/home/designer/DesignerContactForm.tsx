
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email").optional(),
  phone: z.string().min(5, "Телефон должен содержать минимум 5 символов"),
  message: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: "Вы должны согласиться с политикой конфиденциальности"
  })
});

const DesignerContactForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: false
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = {
        "Имя": data.name,
        "Телефон": data.phone,
        "Email": data.email,
        "Сообщение": data.message,
        "Тип клиента": "Дизайнер",
        "Статус": "Новая"
      };

      const { error } = await supabase
        .from("client_requests")
        .insert(formData);

      if (error) {
        throw error;
      }
      
      toast.success("Ваша заявка успешно отправлена!");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  };

  return (
    <div>
      <h2 className="section-title mb-6">Не нашли ответа? Задайте свой вопрос</h2>
      <Card className="border-0 shadow-md">
        <CardContent className="p-6 bg-neutral-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
                name="agreement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Я согласен с политикой конфиденциальности
                      </FormLabel>
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

export default DesignerContactForm;
