
const AboutUsSection = () => (
  <section className="mb-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div>
        <h2 className="section-title mb-6">О нас</h2>
        <div className="space-y-4 text-lg">
          <p>
            Наша компания специализируется на производстве высококачественной 
            мебели на заказ для вашего дома и офиса. Мы используем только 
            проверенные материалы и современные технологии производства.
          </p>
          <p>Работая с нами, вы получаете:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 flex-shrink-0 text-black font-bold">✓</span>
              <span>Индивидуальный подход к каждому клиенту</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 flex-shrink-0 text-black font-bold">✓</span>
              <span>Качественную мебель, произведенную с учетом всех ваших пожеланий</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 flex-shrink-0 text-black font-bold">✓</span>
              <span>Профессиональную доставку и сборку</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 flex-shrink-0 text-black font-bold">✓</span>
              <span>Гарантию на всю нашу продукцию</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <img 
          src="https://i.postimg.cc/kXvJrDs0/0-NVcqry-Z2q.png" 
          alt="О нас" 
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  </section>
);
export default AboutUsSection;
