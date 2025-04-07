
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TestimonialProps = {
  name: string;
  position: string;
  text: string;
  rating: number;
  image?: string;
};

const TestimonialsSection = () => {
  // Testimonials data with added images
  const testimonials: TestimonialProps[] = [
    {
      name: "Анна Петрова",
      position: "Дизайнер интерьера",
      text: "Уже более 5 лет сотрудничаю с НПМ и могу с уверенностью сказать, что это одни из лучших производителей мебели. Высокое качество, точность исполнения и внимание к деталям отличает их от многих других.",
      rating: 5,
      image: "https://i.postimg.cc/qRbkpSKM/woman1.jpg"
    },
    {
      name: "Сергей Иванов",
      position: "Клиент",
      text: "Заказывали кухню и гардеробную. Результат превзошел все ожидания! Отличное качество материалов, идеальная сборка и монтаж. Рекомендую всем, кто ценит функциональность и эстетику.",
      rating: 5,
      image: "https://i.postimg.cc/GmWD6QZY/man1.jpg"
    },
    {
      name: "Марина Сидорова",
      position: "Архитектор",
      text: "Компания НПМ - это надежный партнер для реализации сложных и нестандартных решений. Всегда предлагают оптимальные варианты по соотношению цена-качество. Наше сотрудничество всегда приносит отличные результаты.",
      rating: 4,
      image: "https://i.postimg.cc/c4CtfQR9/woman2.jpg"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-[#fbf6f0]">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Отзывы наших клиентов</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-npm-blue bg-npm-blue/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-npm-blue text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              
              <p className="text-gray-700 flex-grow">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
