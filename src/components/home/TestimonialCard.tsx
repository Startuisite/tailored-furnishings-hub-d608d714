
import { Star } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  position: string;
  text: string;
  rating: number;
  image?: string;
};

const TestimonialCard = ({ name, position, text, rating, image }: TestimonialCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {image && (
            <img 
              src={image} 
              alt={name} 
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        <div className="flex">
          {renderStars(rating)}
        </div>
      </div>
      
      <p className="text-gray-700 flex-grow">{text}</p>
    </div>
  );
};

export default TestimonialCard;
