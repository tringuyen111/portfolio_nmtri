
import React from 'react';
import { PencilIcon } from './icons';

interface HeroProps {
  kicker: string;
  title: string;
  paragraphs: string[];
  imageUrl: string;
  isAdmin: boolean;
  onEdit: () => void;
}

const Hero: React.FC<HeroProps> = ({ kicker, title, paragraphs, imageUrl, isAdmin, onEdit }) => {
  return (
    <section id="home" className="pt-32 pb-16 bg-brand-background">
      <div className="container mx-auto px-6 text-center relative">
        {isAdmin && (
            <button onClick={onEdit} className="absolute top-0 right-0 bg-brand-green text-white p-2 rounded-full hover:opacity-80 transition-opacity">
                <PencilIcon />
            </button>
        )}
        <span className="text-lg font-medium text-brand-green mb-4 block">{kicker}</span>
        <h1 className="text-5xl md:text-7xl font-serif text-brand-text mb-8">
          {title}
        </h1>
        <div className="max-w-3xl mx-auto text-lg text-brand-text-secondary mb-10 space-y-4 text-left md:text-center">
            {paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="relative bg-brand-green-light rounded-3xl p-4 shadow-lg">
          <img 
            src={imageUrl} 
            alt="Abstract data visualization" 
            className="rounded-2xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;