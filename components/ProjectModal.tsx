


import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, Bars3BottomLeftIcon, BriefcaseIcon, BuildingOfficeIcon, CalendarDaysIcon, ListBulletIcon } from './icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  visitProjectLinkText: string;
  detailLabels: {
    overview: string;
    role: string;
    client: string;
    deliverables: string;
    date: string;
    tools: string;
  };
}

const DetailItem: React.FC<{ icon: React.ReactNode, label: string, children: React.ReactNode }> = ({ icon, label, children }) => (
    <>
        <div className="flex items-center gap-2 font-medium text-brand-text whitespace-nowrap">
            <span className="w-5 h-5 text-gray-500">{icon}</span>
            <span>{label}</span>
        </div>
        <div>{children}</div>
    </>
);


const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, visitProjectLinkText, detailLabels }) => {
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
      } else if (project && [project.coverImage, ...project.detailImages].filter(Boolean).length > 1) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, project]);

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
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-lg w-full max-w-6xl h-full max-h-[95vh] flex flex-col overflow-hidden relative animate-slide-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-black/40 rounded-full p-1.5 z-30 hover:bg-black/60 transition-colors"
          aria-label="Close project details"
        >
          <CloseIcon className="w-7 h-7"/>
        </button>

        {/* Image Viewer Section */}
        <div className="flex-grow w-full relative bg-gray-900 flex items-center justify-center overflow-hidden">
            <img 
                src={allImages[currentImageIndex]}
                alt={`${project.title} - view ${currentImageIndex + 1}`}
                className="w-auto h-auto max-w-full max-h-full object-contain"
            />
            {allImages.length > 1 && (
                <>
                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors z-20" aria-label="Previous image">
                    <ChevronLeftIcon className="w-7 h-7" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors z-20" aria-label="Next image">
                    <ChevronRightIcon className="w-7 h-7" />
                </button>
                </>
            )}
        </div>
        
        {/* Details Section */}
        <div className="w-full flex-shrink-0 p-6 md:p-8 overflow-y-auto h-auto max-h-[55%] md:max-h-[50%] border-t border-gray-200">
          <h2 className="text-3xl font-serif text-brand-text mb-6">{project.title}</h2>
          
          <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-5 items-start text-brand-text-secondary">
            <DetailItem icon={<Bars3BottomLeftIcon />} label={detailLabels.overview}>
                <p className="whitespace-pre-line">{project.description}</p>
            </DetailItem>
            
            <DetailItem icon={<BriefcaseIcon />} label={detailLabels.role}>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded border border-blue-400">{project.role}</span>
            </DetailItem>

            <DetailItem icon={<BuildingOfficeIcon />} label={detailLabels.client}>
                <p>{project.client}</p>
            </DetailItem>
            
            <DetailItem icon={<Bars3BottomLeftIcon />} label={detailLabels.deliverables}>
                <ul className="space-y-1">
                  {project.deliverables.map((item, i) => <li key={i} className="flex items-start"><span className="mr-2 mt-1">-</span><span>{item}</span></li>)}
                </ul>
            </DetailItem>

            {project.date && (
              <DetailItem icon={<CalendarDaysIcon />} label={detailLabels.date}>
                  <p>{project.date}</p>
              </DetailItem>
            )}

            <DetailItem icon={<ListBulletIcon />} label={detailLabels.tools}>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                        <span key={tech} className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded border border-gray-300">
                            {tech}
                        </span>
                    ))}
                </div>
            </DetailItem>
          </div>

          {project.url && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center bg-brand-green text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                      {visitProjectLinkText}
                  </a>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;