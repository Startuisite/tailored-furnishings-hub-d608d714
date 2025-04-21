
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Props {
  categoryData: any;
  openContactForm: () => void;
}

const getCarouselImages = (categoryData: any) => {
  if (!categoryData) return [];
  const images = [];
  if (categoryData["Фото внутри карточки (блок 3)"]) {
    images.push(categoryData["Фото внутри карточки (блок 3)"]);
  } else if (categoryData["Фото в каталоге"]) {
    images.push(categoryData["Фото в каталоге"]);
  }
  if (categoryData["Фото для карусели"] && Array.isArray(categoryData["Фото для карусели"])) {
    images.push(...categoryData["Фото для карусели"]);
  }
  return [...new Set(images)].filter(Boolean);
};

const CategoryImageCarousel = ({ categoryData, openContactForm }: Props) => {
  const carouselImages = getCarouselImages(categoryData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
      {/* Left: title, descriptions, CTA */}
      <div className="space-y-6">
        <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 lg:p-8">
            <h1 className="text-3xl font-medium mb-6">
              {categoryData["Название карточки"]} на заказ по индивидуальным размерам
            </h1>
            <div className="space-y-4">
              <p className="text-gray-700">{categoryData["Наполнение карточки (Блок 1)"]}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 lg:p-8">
            <h2 className="text-2xl font-medium mb-6">
              {categoryData["Наполнение карточки (блок 2)"]}
            </h2>
            <Button 
              onClick={openContactForm} 
              className="bg-[#8DD4DA] hover:bg-[#7BC9CF] text-black px-8 py-6 h-auto text-base"
            >
              Да, нужна
            </Button>
          </div>
        </Card>
      </div>
      {/* Right: carousel or image */}
      <div className="h-full">
        <Card className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
          <div className="h-full">
            {carouselImages.length > 1 ? (
              <Carousel className="w-full h-full">
                <CarouselContent className="h-full">
                  {carouselImages.map((image: string, index: number) => (
                    <CarouselItem key={index} className="h-full">
                      <AspectRatio ratio={4/3} className="h-full">
                        <img
                          src={image}
                          alt={`${categoryData["Название карточки"]} - изображение ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              <img
                src={carouselImages[0] || categoryData["Фото в каталоге"]}
                alt={categoryData["Название карточки"]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default CategoryImageCarousel;
