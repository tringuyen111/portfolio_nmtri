
import React from 'react';
import type { Experience } from '../types';
import { PencilIcon, TrashIcon, PlusIcon } from './icons';

interface ExperienceProps {
  sectionTitle: string;
  title: string;
  subtitle: string;
  addExperienceText: string;
  experiences: Experience[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (experience: Experience) => void;
  onDelete: (id: number) => void;
}

const ExperienceComponent: React.FC<ExperienceProps> = ({ sectionTitle, title, subtitle, addExperienceText, experiences, isAdmin, onAdd, onEdit, onDelete }) => {
  return (
    <section id="experience" className="py-20 bg-brand-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <span className="text-brand-green font-semibold">{sectionTitle}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-text mt-2">{title}</h2>
            <p className="max-w-2xl mx-auto text-brand-text-secondary mt-4">
                {subtitle}
            </p>
        </div>
        {isAdmin && (
             <div className="text-center mb-8">
                <button onClick={onAdd} className="bg-brand-green text-white font-medium py-2 px-6 rounded-full hover:opacity-90 transition-opacity duration-300 inline-flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2"/> {addExperienceText}
                </button>
            </div>
        )}
        <div className="relative">
          <div className="absolute left-5 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
          <div className="space-y-12">
            {(experiences || []).map((exp, index) => (
              <div key={exp.id} className="relative flex items-start md:grid md:grid-cols-2 md:gap-x-16 group">
                
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 bg-brand-green rounded-full flex-shrink-0 flex items-center justify-center z-10">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>

                <div className={`w-full pl-16 md:pl-0 ${index % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-2 md:text-left'}`}>
                  <div className="p-4 rounded-md relative">
                      {isAdmin && (
                          <div className={`absolute top-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ${index % 2 === 0 ? 'md:left-2 right-auto' : 'md:right-2 left-auto'} right-2`}>
                              <button onClick={() => onEdit(exp)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"><PencilIcon /></button>
                              <button onClick={() => onDelete(exp.id)} className="bg-gray-200 p-2 rounded-full hover:bg-red-500 hover:text-white"><TrashIcon /></button>
                          </div>
                      )}
                      <h3 className="text-lg font-bold text-brand-text">{exp.role}</h3>
                      {exp.url ? (
                        <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-brand-green font-semibold hover:underline">
                            {exp.company}
                        </a>
                      ) : (
                        <p className="text-brand-green font-semibold">{exp.company}</p>
                      )}
                      <p className="text-sm text-brand-text-secondary mb-2">{exp.period}</p>
                      <p className="text-sm text-brand-text-secondary">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceComponent;