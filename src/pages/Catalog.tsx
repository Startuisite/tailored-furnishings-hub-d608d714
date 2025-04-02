
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type CategoryProps = {
  id: number;
  title: string;
  image: string;
};

const CategoryCard = ({ title, image }: CategoryProps) => {
  return (
    <Link to={`/catalog/${title.toLowerCase()}`}>
      <Card className="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex items-center justify-between p-4 bg-npm-beige">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          <div className="bg-npm-light p-2 rounded-full shadow-sm transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
            <ArrowRight 
              className="text-black transition-all duration-300 group-hover:translate-x-1" 
              size={22} 
              strokeWidth={2.5} 
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Fallback data for when Supabase data is not available
const fallbackCategories: CategoryProps[] = [
  {
    id: 1,
    title: "Прихожая",
    image: "https://i.postimg.cc/sXRBKY6D/2-P5-Z3-R2o0t.png"
  },
  {
    id: 2,
    title: "Гостиная",
    image: "https://i.postimg.cc/2j1tDn2S/w-XOps33y-Lh.png"
  },
  {
    id: 3,
    title: "Кухня",
    image: "https://i.postimg.cc/DyXGPN0K/bfl8-HSy-URY.png"
  },
  {
    id: 4,
    title: "Детская",
    image: "https://i.postimg.cc/SQXDYk0S/c-COii-RTOMr.png"
  },
  {
    id: 5,
    title: "Спальня",
    image: "https://i.postimg.cc/FRZBHxwY/hbi6-LHogp-Q.png"
  },
  {
    id: 6,
    title: "Гардеробная",
    image: "https://i.postimg.cc/CMf9Tjxs/k3u1-F9-Odg0.png"
  },
  {
    id: 7,
    title: "Шкафы",
    image: "https://i.postimg.cc/W457YmfV/1b-F5-JIOCs-V-1.png"
  },
  {
    id: 8,
    title: "Ванная комната",
    image: "https://i.postimg.cc/G3kT55GP/0-T2p-Iwn3-Cf.png"
  },
  {
    id: 9,
    title: "Мягкая мебель",
    image: "https://i.postimg.cc/fyPz8PYd/AErw-XCs-HOn.png"
  },
  {
    id: 10,
    title: "Мебель для отелей",
    image: "https://i.postimg.cc/x8BWBV8K/4-KM0-OH6-Myn.png"
  },
  {
    id: 11,
    title: "Перегородки из мебели",
    image: "https://i.postimg.cc/wB8HrJZ1/3-DZ5-Nk948-L.png"
  },
  {
    id: 12,
    title: "Комплексная меблировка",
    image: "https://i.postimg.cc/V6tKV0yk/aeog-UZSa-Uz.png"
  }
];

const Catalog = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fix: Use the correct table name from Supabase
        const { data, error: supabaseError } = await supabase
          .from('Карточки каталога')
          .select('id, "Название карточки", "Фото в каталоге"');

        if (supabaseError) {
          throw supabaseError;
        }

        // Transform data to match our CategoryProps structure
        if (data && data.length > 0) {
          const transformedData = data.map(item => ({
            id: item.id,
            title: item["Название карточки"] || "",
            image: item["Фото в каталоге"] || ""
          }));
          setCategories(transformedData);
        } else {
          // Use fallback data if no data from Supabase
          console.log("No data from Supabase, using fallback data");
          setCategories(fallbackCategories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Не удалось загрузить данные. Используем резервные данные.");
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Render skeleton loading state
  const renderSkeletons = () => (
    <>
      {[...Array(12)].map((_, index) => (
        <Card key={index} className="overflow-hidden border-0 shadow-md">
          <div className="h-64">
            <Skeleton className="h-full w-full" />
          </div>
          <CardContent className="flex items-center justify-between p-4 bg-npm-beige">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </CardContent>
        </Card>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-npm-light/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="section-title mb-10 text-center">Каталог</h1>
          {error && <div className="text-center text-red-600 mb-6">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading 
              ? renderSkeletons()
              : categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    id={category.id}
                    title={category.title}
                    image={category.image}
                  />
                ))
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
