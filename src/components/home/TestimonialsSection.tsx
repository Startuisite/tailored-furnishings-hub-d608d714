
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  // Testimonials data with images
  const testimonials = [
    {
      name: "Анна Петрова",
      position: "Дизайнер интерьера",
      text: "Уже более 5 лет сотрудничаю с НПМ и могу с уверенностью сказать, что это одни из лучших производителей мебели. Высокое качество, точность исполнения и внимание к деталям отличает их от многих других.",
      rating: 5,
      image: "https://i.postimg.cc/L8hF3XBS/portrait-woman.jpg"
    },
    {
      name: "Сергей Иванов",
      position: "Клиент",
      text: "Заказывали кухню и гардеробную. Результат превзошел все ожидания! Отличное качество материалов, идеальная сборка и монтаж. Рекомендую всем, кто ценит функциональность и эстетику.",
      rating: 5,
      image: "https://i.postimg.cc/vTXKgTL2/portrait-man.jpg"
    },
    {
      name: "Марина Сидорова",
      position: "Архитектор",
      text: "Компания НПМ - это надежный партнер для реализации сложных и нестандартных решений. Всегда предлагают оптимальные варианты по соотношению цена-качество. Наше сотрудничество всегда приносит отличные результаты.",
      rating: 4,
      image: "https://i.postimg.cc/PqkPsqgS/portrait-woman2.jpg"
    }
  ];

  return (
    <section className="py-16 bg-[#fbf6f0]">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Отзывы наших клиентов</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              position={testimonial.position}
              text={testimonial.text}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
