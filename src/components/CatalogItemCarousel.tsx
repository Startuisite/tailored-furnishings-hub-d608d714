
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface CatalogItemCarouselProps {
  images: string[];
  className?: string;
}

const CatalogItemCarousel = ({ images, className = "" }: CatalogItemCarouselProps) => {
  const [loaded, setLoaded] = useState<boolean[]>([]);
  
  useEffect(() => {
    // Initialize loaded state for each image
    setLoaded(new Array(images.length).fill(false));
  }, [images]);

  const handleImageLoad = (index: number) => {
    setLoaded(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  if (!images || images.length === 0) {
    return (
      <div className={`rounded-md overflow-hidden ${className}`}>
        <AspectRatio ratio={4/3}>
          <Skeleton className="w-full h-full" />
        </AspectRatio>
      </div>
    );
  }

  return (
    <Carousel className={`${className}`}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={4/3} className="bg-gray-100 rounded-md overflow-hidden">
              {!loaded[index] && <Skeleton className="w-full h-full absolute z-10" />}
              <img
                src={image}
                alt={`Изображение ${index + 1}`}
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(index)}
                style={{ opacity: loaded[index] ? 1 : 0 }}
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 bg-white border-0 shadow-md" />
      <CarouselNext className="right-2 bg-white border-0 shadow-md" />
    </Carousel>
  );
};

export default CatalogItemCarousel;
