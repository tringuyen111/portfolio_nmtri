
import React from 'react';
import { PencilIcon } from './icons';

interface HeroProps {
  kicker: string;
  title: string;
  paragraphs: string[];
  imageUrl: string;
  isEditing: boolean;
  onEdit: () => void;
}

const Hero: React.FC<HeroProps> = ({ kicker, title, paragraphs, imageUrl, isEditing, onEdit }) => {
  return (
    // Removed overflow-hidden from the main section to ensure the absolute-positioned edit button is never clipped.
    <section id="home" className="pt-40 pb-20 bg-brand-background relative"> 
       {isEditing && (
            <button onClick={onEdit} className="absolute top-24 right-8 bg-brand-green text-white p-2 rounded-full hover:opacity-80 transition-opacity z-10">
                <PencilIcon />
            </button>
        )}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content Column */}
          <div className="text-center md:text-left">
            <span className="text-lg font-medium text-brand-green mb-4 block">{kicker}</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-text mb-8">
              {title}
            </h1>
            <div className="max-w-xl mx-auto md:mx-0 text-lg text-brand-text-secondary space-y-4">
                {(paragraphs || []).map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
            </div>
          </div>
          {/* Image Column */}
           {/* Added overflow-hidden to this container to clip the rotated decorative circles without affecting the edit button. */}
           <div className="flex justify-center items-center overflow-hidden py-4">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-brand-green-light rounded-full transform rotate-6"></div>
                <div className="absolute inset-0 bg-brand-green rounded-full transform -rotate-6"></div>
                <img 
                    src={imageUrl} 
                    alt="Tri Nguyen" 
                    className="relative w-full h-full object-cover rounded-full border-8 border-brand-background"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;