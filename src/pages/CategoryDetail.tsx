
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import CatalogItemCarousel from '@/components/CatalogItemCarousel';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface CategoryDetailProps {
  id?: number;
  title: string;
  contentBlock1?: string;
  contentBlock2?: string;
  images: string[];
}

const defaultImages = [
  "https://i.postimg.cc/PxXf4pJg/image.png",
  "https://i.postimg.cc/7LxMg91w/image.png",
  "https://i.postimg.cc/cLdXmdZp/image.png"
];

const grammarCorrectionMap: Record<string, { title: string; question: string }> = {
  "прихожая": { 
    title: "Мебель в прихожую на заказ по индивидуальным размерам", 
    question: "Нужна мебель в прихожую?" 
  },
  "гостиная": { 
    title: "Мебель в гостиную на заказ по индивидуальным размерам", 
    question: "Нужна мебель в гостиную?" 
  },
  "кухня": { 
    title: "Мебель для кухни на заказ по индивидуальным размерам", 
    question: "Нужна мебель для кухни?" 
  },
  "детская": { 
    title: "Мебель в детскую на заказ по индивидуальным размерам", 
    question: "Нужна мебель в детскую?" 
  },
  "спальня": { 
    title: "Мебель для спальни на заказ по индивидуальным размерам", 
    question: "Нужна мебель для спальни?" 
  },
  "гардеробная": { 
    title: "Гардеробная на заказ по индивидуальным размерам", 
    question: "Нужна гардеробная?" 
  },
  "шкафы": { 
    title: "Шкафы на заказ по индивидуальным размерам", 
    question: "Нужны шкафы?" 
  },
  "ванная": { 
    title: "Мебель для ванной комнаты на заказ по индивидуальным размерам", 
    question: "Нужна мебель для ванной комнаты?" 
  },
  "мягкая мебель": { 
    title: "Мягкая мебель на заказ по индивидуальным размерам", 
    question: "Нужна мягкая мебель?" 
  },
  "отели": { 
    title: "Мебель для отелей на заказ по индивидуальным размерам", 
    question: "Нужна мебель для отеля?" 
  },
  "перегородки из мебели": { 
    title: "Перегородки из мебели на заказ по индивидуальным размерам", 
    question: "Нужны перегородки из мебели?" 
  },
  "комплексная меблировка": { 
    title: "Комплексная меблировка на заказ по индивидуальным размерам", 
    question: "Нужна комплексная меблировка?" 
  }
};

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryDetailProps | null>(null);

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      if (!categoryId) {
        setError("Категория не найдена");
        setLoading(false);
        return;
      }

      try {
        // Fetch category details from Supabase
        const { data, error } = await supabase
          .from('Карточки каталога')
          .select('id, "Название карточки", "Наполнение карточки (Блок 1)", "Наполнение карточки (блок 2)", "Фото внутри карточки (блок 3)"')
          .ilike('Название карточки', `%${categoryId}%`)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          // Parse images from the "Фото внутри карточки (блок 3)" field
          // It can be a comma-separated string, JSON array or a single URL
          let parsedImages: string[] = [];
          if (data["Фото внутри карточки (блок 3)"]) {
            try {
              // Try parsing as JSON array first
              parsedImages = JSON.parse(data["Фото внутри карточки (блок 3)"]);
            } catch (e) {
              // If not JSON, try as comma-separated string
              if (typeof data["Фото внутри карточки (блок 3)"] === 'string') {
                parsedImages = data["Фото внутри карточки (блок 3)"].split(',').map(url => url.trim());
              }
            }
            
            // If still empty and we have a string, use it as a single image
            if (parsedImages.length === 0 && typeof data["Фото внутри карточки (блок 3)"] === 'string') {
              parsedImages = [data["Фото внутри карточки (блок 3)"]];
            }
          }

          setCategory({
            id: data.id,
            title: data["Название карточки"] || "",
            contentBlock1: data["Наполнение карточки (Блок 1)"] || "",
            contentBlock2: data["Наполнение карточки (блок 2)"] || "",
            images: parsedImages.length > 0 ? parsedImages : defaultImages
          });
        } else {
          // If no data from Supabase, create a placeholder based on categoryId
          const title = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
          setCategory({
            title: title,
            images: defaultImages
          });
        }
      } catch (err) {
        console.error("Error fetching category detail:", err);
        setError("Не удалось загрузить информацию о категории.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetail();
  }, [categoryId]);

  // Get the corrected grammar versions for title and question
  const getCorrectedText = () => {
    if (!categoryId) return { title: "", question: "" };
    
    // Try to find a match in our mapping
    const lowerCaseCategoryId = categoryId.toLowerCase();
    
    for (const [key, value] of Object.entries(grammarCorrectionMap)) {
      if (lowerCaseCategoryId.includes(key)) {
        return value;
      }
    }
    
    // Fallback if no match found
    return { 
      title: `${categoryId} на заказ по индивидуальным размерам`, 
      question: `Нужна ${categoryId}?` 
    };
  };

  const correctedText = getCorrectedText();

  if (loading) {
    return (
      <div className="min-h-screen bg-npm-light/30">
        <Header />
        <main className="pt-24 pb-16 container-custom">
          <Skeleton className="h-10 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-[400px] w-full rounded-md mb-6" />
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-npm-light/30">
        <Header />
        <main className="pt-24 pb-16 container-custom">
          <h1 className="text-2xl font-bold mb-6">Ошибка</h1>
          <p>{error || "Категория не найдена"}</p>
          <Button asChild className="mt-6">
            <Link to="/catalog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться в каталог
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-npm-light/30">
      <Header />
      <main className="pt-24 pb-16 container-custom">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4 p-0">
            <Link to="/catalog">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Назад к каталогу
            </Link>
          </Button>
        </div>
        
        <h1 className="section-title mb-10">
          {correctedText.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Image carousel */}
          <div className="mb-8 md:mb-0">
            <CatalogItemCarousel 
              images={category.images} 
              className="mb-6 w-full" 
            />
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-medium mb-4">{correctedText.question}</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: category.contentBlock1 || "" }} />
            </div>
          </div>
          
          {/* Right column - Content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-4">Преимущества работы с нами</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: category.contentBlock2 || "" }} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
