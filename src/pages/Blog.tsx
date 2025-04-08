
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

// Blog article type
type BlogArticle = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
};

const Blog = () => {
  // Sample blog articles
  const blogArticles: BlogArticle[] = [
    {
      id: 1,
      title: "Как выбрать идеальную кухню для вашего дома",
      excerpt: "Наш гид по выбору материалов, дизайна и планировки кухни, которая будет соответствовать вашим потребностям и стилю жизни.",
      image: "https://i.postimg.cc/MTZvXjmP/bfl8-HSy-URY.png",
      date: "15 апреля 2025"
    },
    {
      id: 2,
      title: "Тренды в дизайне мебели 2025 года",
      excerpt: "Узнайте о последних тенденциях в мире мебельного дизайна и как они могут быть интегрированы в ваш интерьер.",
      image: "https://i.postimg.cc/sfqgCLq0/hbi6-LHogp-Q.png",
      date: "2 апреля 2025"
    },
    {
      id: 3,
      title: "Организация пространства: секреты функциональной мебели",
      excerpt: "Как максимально эффективно использовать пространство с помощью грамотно подобранной и спроектированной мебели.",
      image: "https://i.postimg.cc/44DsS9HD/0-T2p-Iwn3-Cf.png",
      date: "25 марта 2025"
    }
  ];

  // Полезные ссылки для мебельной тематики
  const usefulLinks = [
    {
      title: "Руководство по уходу за деревянной мебелью",
      url: "https://www.example.com"
    },
    {
      title: "Калькулятор расчета материалов для мебели",
      url: "https://www.example.com"
    },
    {
      title: "Экологичные материалы в производстве мебели",
      url: "https://www.example.com"
    },
    {
      title: "Как самостоятельно обновить старую мебель",
      url: "https://www.example.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-npm-blue to-npm-light">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Blog Header */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4">Наш блог о мебели</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Полезные статьи, советы экспертов и интересные идеи для вашего дома
            </p>
          </section>

          {/* Blog Articles Section */}
          <section className="mb-16">
            <h2 className="section-title mb-8">Последние статьи</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-sm text-gray-600 block mb-2">{article.date}</span>
                    <h3 className="text-xl font-medium mb-3">{article.title}</h3>
                    <p className="text-gray-700 mb-4">{article.excerpt}</p>
                    <Button variant="outline" className="mt-2 border-npm-blue text-npm-blue hover:bg-npm-blue hover:text-white">
                      Читать статью
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Useful Links Section */}
          <section className="mb-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="section-title mb-8">Полезные ссылки</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usefulLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 border border-npm-blue/30 rounded-lg hover:bg-npm-light transition-colors duration-200 flex items-center"
                >
                  <span className="text-npm-blue mr-2">→</span>
                  <span>{link.title}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-npm-blue/10 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-medium mb-4">Нужна помощь с выбором мебели?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Консультации наших специалистов помогут вам определиться с выбором и создать идеальный интерьер для вашего дома.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button className="bg-npm-blue hover:bg-blue-700">
                <Link to="/information">Связаться с нами</Link>
              </Button>
              <Button variant="outline" className="border-npm-blue text-npm-blue hover:bg-npm-blue hover:text-white">
                <Link to="/catalog">Смотреть каталог</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
