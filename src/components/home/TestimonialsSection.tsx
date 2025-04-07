
import { Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type TestimonialProps = {
  name: string;
  position: string;
  text: string;
  rating: number;
  photo?: string;
};

const TestimonialsSection = () => {
  // Testimonials data with photos
  const testimonials: TestimonialProps[] = [
    {
      name: "Анна Петрова",
      position: "Дизайнер интерьера",
      text: "Уже более 5 лет сотрудничаю с НПМ и могу с уверенностью сказать, что это одни из лучших производителей мебели. Высокое качество, точность исполнения и внимание к деталям отличает их от многих других.",
      rating: 5,
      photo: "https://i.postimg.cc/xCtnTmV4/designer-woman.jpg"
    },
    {
      name: "Сергей Иванов",
      position: "Клиент",
      text: "Заказывали кухню и гардеробную. Результат превзошел все ожидания! Отличное качество материалов, идеальная сборка и монтаж. Рекомендую всем, кто ценит функциональность и эстетику.",
      rating: 5,
      photo: "https://i.postimg.cc/FKQcn6NP/client-man.jpg"
    },
    {
      name: "Марина Сидорова",
      position: "Архитектор",
      text: "Компания НПМ - это надежный партнер для реализации сложных и нестандартных решений. Всегда предлагают оптимальные варианты по соотношению цена-качество. Наше сотрудничество всегда приносит отличные результаты.",
      rating: 4,
      photo: "https://i.postimg.cc/DyvSn74S/architect-woman.jpg"
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
                <div>
                  <h3 className="font-medium text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{testimonial.text}</p>
              
              {testimonial.photo && (
                <div className="mt-auto mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100">
                    <AspectRatio ratio={1} className="h-full">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name} 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
