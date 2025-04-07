
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TestimonialProps {
  name: string;
  position: string;
  text: string;
  rating: number;
}

const Testimonial = ({ name, position, text, rating }: TestimonialProps) => {
  return (
    <Card className="p-6 shadow-md border-0 h-full flex flex-col">
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              size={20}
              className={`${
                i < rating ? "text-[#e5dbb7] fill-[#e5dbb7]" : "text-gray-300"
              }`}
            />
          ))}
      </div>
      <p className="text-gray-700 mb-6 flex-grow">{text}</p>
      <div>
        <h4 className="font-medium text-lg">{name}</h4>
        <p className="text-gray-500">{position}</p>
      </div>
    </Card>
  );
};

const testimonialData = [
  {
    name: "Анна Петрова",
    position: "Дизайнер интерьера",
    text: "Уже более 5 лет сотрудничаю с НПМ и могу с уверенностью сказать, что это одни из лучших производителей мебели. Высокое качество, точность исполнения и внимание к деталям отличает их от многих других.",
    rating: 5,
  },
  {
    name: "Сергей Иванов",
    position: "Клиент",
    text: "Заказывали кухню и гардеробную. Результат превзошел все ожидания! Отличное качество материалов, идеальная сборка и монтаж. Рекомендую всем, кто ценит функциональность и эстетику.",
    rating: 5,
  },
  {
    name: "Марина Сидорова",
    position: "Архитектор",
    text: "Компания НПМ - это надежный партнер для реализации сложных и нестандартных решений. Всегда предлагают оптимальные варианты по соотношению цена-качество. Наше сотрудничество всегда приносит отличные результаты.",
    rating: 4,
  },
];

interface TestimonialsProps {
  className?: string;
}

const Testimonials = ({ className = "" }: TestimonialsProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container-custom">
        <h2 className="text-4xl font-playfair text-center mb-12">
          Отзывы наших клиентов
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialData.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
