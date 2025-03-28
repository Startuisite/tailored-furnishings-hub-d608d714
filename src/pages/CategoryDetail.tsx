
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  
  const formatCategoryTitle = (category: string) => {
    const categoryMap: Record<string, string> = {
      'кухня': 'Кухня',
      'гардероб': 'Гардероб',
      'шкафы': 'Шкафы',
      'спальня': 'Спальня',
      'прихожая': 'Прихожая',
      'ванная': 'Ванная',
      'детская': 'Детская',
      'гостиная': 'Гостиная',
      'мягкая мебель': 'Мягкая мебель',
      'перегородки': 'Перегородки',
      'офисы': 'Офисы',
      'комплексная меблировка': 'Комплексная меблировка'
    };
    
    return categoryMap[category || ''] || category;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="section-title mb-10">{formatCategoryTitle(category || '')}</h1>
          <div className="text-center py-10">
            <p className="text-gray-600">Эта страница находится в разработке.</p>
            <p className="text-gray-600">Скоро здесь будут представлены все товары категории {formatCategoryTitle(category || '')}.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
