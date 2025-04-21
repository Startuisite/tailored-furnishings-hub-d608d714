
import { CheckCircle2 } from "lucide-react";
import ContactForm from '@/components/ContactForm';

const CustomerSection = () => {
  return (
    <div id="customers" className="customers-section">
      {/* About Us Section - теперь всегда первая */}
      <section className="mb-16 container-custom about-us-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col md:h-[450px]">
            <h2 className="section-title mb-6">О нас</h2>
            <div className="space-y-4 text-lg flex-grow">
              <p>
                Наша компания специализируется на производстве высококачественной 
                мебели на заказ для вашего дома и офиса. Мы используем только 
                проверенные материалы и современные технологии производства.
              </p>
              <p>
                Работая с нами, вы получаете:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black mt-0.5" />
                  <span>Индивидуальный подход к каждому клиенту</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black mt-0.5" />
                  <span>Качественную мебель, произведенную с учетом всех ваших пожеланий</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black mt-0.5" />
                  <span>Профессиональную доставку и сборку</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black mt-0.5" />
                  <span>Гарантию на всю нашу продукцию</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:h-[450px]">
            <img 
              src="https://i.postimg.cc/kXvJrDs0/0-NVcqry-Z2q.png" 
              alt="О нас" 
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Hero Section with Image and CTA - Updated with external image link */}
      <section className="mb-16 container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-xl overflow-hidden shadow-md">
          <div className="h-full">
            <img 
              src="https://i.postimg.cc/FKFwCjbV/image.png" 
              alt="Комфортный интерьер" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              ПОЛНОСТЬЮ берем весь процесс разработки и реализации проекта на себя
            </h2>
          </div>
        </div>
      </section>

      {/* Contact Form for Customers - Updated to show the top of the image */}
      <section className="mb-16 container-custom">
        <h2 className="section-title text-center mb-8">Свяжитесь с нами</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <ContactForm sourcePageType="customers" />
          </div>
          <div className="h-auto">
            <div className="w-full h-full max-h-[600px] relative rounded-lg shadow-md">
              <img 
                src="https://i.postimg.cc/6320TYhF/Qnez6ad-RP3.png" 
                alt="Связаться с нами" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerSection;

