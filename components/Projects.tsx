
import React from 'react';
import type { Project } from '../types';
import { PencilIcon, TrashIcon } from './icons';

interface ProjectsProps {
  sectionTitle: string;
  title: string;
  addProjectText: string;
  viewProjectLinkText: string;
  projects: Project[];
  onViewProject: (project: Project) => void;
  isAdmin: boolean;
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ sectionTitle, title, addProjectText, viewProjectLinkText, projects, onViewProject, isAdmin, onAddProject, onEditProject, onDeleteProject }) => {
  
  const handleProjectClick = (project: Project) => {
    if (isAdmin) {
      onEditProject(project);
    } else {
      onViewProject(project);
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-brand-green font-semibold">{sectionTitle}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-text mt-2">{title}</h2>
          </div>
           {isAdmin && (
            <button
                onClick={onAddProject}
                className="bg-brand-green text-white font-medium py-2 px-5 rounded-full hover:opacity-90 transition-opacity duration-300"
            >
                {addProjectText}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(projects || []).map(project => (
            <div 
              key={project.id} 
              className="group"
            >
              <div 
                className="overflow-hidden rounded-2xl mb-4 relative cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {isAdmin && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onEditProject(project); }} 
                        className="bg-white/80 text-brand-text p-3 rounded-full hover:bg-white"
                      >
                        <PencilIcon className="w-6 h-6" />
                      </button>
                       <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteProject(project.id); }} 
                        className="bg-white/80 text-red-500 p-3 rounded-full hover:bg-white"
                      >
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-serif text-brand-text">{project.title}</h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block mt-2 bg-brand-green-light text-brand-green font-medium text-sm px-3 py-1 rounded-full hover:bg-brand-green hover:text-white transition-all"
                >
                  {viewProjectLinkText}
                </a>
              )}
              <p className="text-brand-text-secondary mt-2">
                {project.description.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;