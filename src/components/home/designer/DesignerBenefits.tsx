
import { useState } from 'react';

const DesignerBenefits = () => {
  const [benefits] = useState([
    {
      title: "Качественные материалы",
      description: "Мы используем только высококачественные материалы от проверенных поставщиков, что гарантирует долговечность и надежность нашей мебели.",
      icon: "/pictures/79705624-800c-45dd-aa32-96cd9357b606.png"
    },
    {
      title: "Доставка и сборка",
      description: "Мы обеспечиваем доставку и профессиональную сборку мебели, чтобы гарантировать правильную установку и удовлетворение клиента.",
      icon: "/pictures/79705624-800c-45dd-aa32-96cd9357b606.png"
    },
    {
      title: "Гарантия",
      description: "На всю нашу мебель предоставляется гарантия, подтверждающая уверенность в ее качестве и долговечности.",
      icon: "/pictures/79705624-800c-45dd-aa32-96cd9357b606.png"
    }
  ]);

  return (
    <section className="mb-20">
      <h2 className="section-title text-center mb-10">
        Качество без компромиссов, а так же сервис высокого уровня - это про нас
      </h2>
      
      <div className="mb-8">
        <img 
          src="https://i.postimg.cc/2yv12WR7/rw-WKn-NH7q-X-1.avif" 
          alt="Качество без компромиссов" 
          className="w-full h-auto object-cover rounded-lg shadow-md" 
        />
      </div>
      
      <div className="bg-[#b3c9dd] p-8 rounded-lg shadow-md flex flex-col justify-center space-y-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-xl font-medium">{benefit.title}</h3>
            <p className="text-gray-700">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DesignerBenefits;
