

import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const allImages = [project.coverImage, ...project.detailImages].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white md:text-gray-500 z-20 hover:opacity-75 transition-opacity"
        >
          <CloseIcon className="w-8 h-8"/>
        </button>

        <div className="w-full md:w-1/2 relative">
            <img 
                src={allImages[currentImageIndex]}
                alt={`${project.title} - view ${currentImageIndex + 1}`}
                className="w-full h-64 md:h-full object-cover"
            />
            {allImages.length > 1 && (
                <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors">
                    <ChevronLeftIcon />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors">
                    <ChevronRightIcon />
                </button>
                </>
            )}
        </div>
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <h2 className="text-3xl font-serif text-brand-text mb-4">{project.title}</h2>
          <p className="text-brand-text-secondary mb-6">{project.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-brand-text mb-2">My Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1 text-brand-text-secondary">
              {project.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand-text mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                    <span key={tech} className="bg-brand-green-light text-brand-green font-medium text-sm px-3 py-1 rounded-full">
                        {tech}
                    </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;