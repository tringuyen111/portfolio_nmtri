import React from 'react';
import type { SkillCategory } from '../types';
import { PencilIcon, TrashIcon, PlusIcon } from './icons';

interface SkillsProps {
  sectionTitle: string;
  title: string;
  subtitle: string;
  addSkillCategoryText: string;
  skillCategories: SkillCategory[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (skillCategory: SkillCategory) => void;
  onDelete: (id: number) => void;
}

const Skills: React.FC<SkillsProps> = ({ sectionTitle, title, subtitle, addSkillCategoryText, skillCategories, isAdmin, onAdd, onEdit, onDelete }) => {
  return (
    <section id="skills" className="py-20 bg-brand-background">
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
                    <PlusIcon className="w-5 h-5 mr-2" /> {addSkillCategoryText}
                </button>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
              {isAdmin && (
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit(category)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"><PencilIcon /></button>
                      <button onClick={() => onDelete(category.id)} className="bg-gray-200 p-2 rounded-full hover:bg-red-500 hover:text-white"><TrashIcon /></button>
                  </div>
              )}
              <h3 className="text-xl font-bold text-brand-text mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center text-brand-text-secondary">
                    <svg className="w-4 h-4 mr-2 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
