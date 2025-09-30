
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons';
import type { Project, Experience, SkillCategory, HeroData } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  title: string;
  loginButtonText: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess, title, loginButtonText }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'nmt29072002') {
      onLoginSuccess();
      onClose();
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-8 w-full max-w-sm relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500"><CloseIcon /></button>
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md">
            {loginButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Helper for file to base64 conversion ---
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};


// Generic Modal Wrapper
const EditModalBase: React.FC<{ title: string, onClose: () => void, children: React.ReactNode }> = ({ title, onClose, children }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500"><CloseIcon /></button>
            <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
            {children}
        </div>
    </div>
);

// Generic Form Components
const FormField: React.FC<{ label: string, children: React.ReactNode, instruction?: string }> = ({ label, children, instruction }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {children}
        {instruction && <p className="text-xs text-gray-500 mt-1">{instruction}</p>}
    </div>
);
const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className="w-full border border-gray-300 rounded-md px-3 py-2" />
);
const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea {...props} rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2" />
);

// Hero Edit Modal
interface HeroEditModalProps {
    heroData: HeroData;
    onSave: (data: HeroData) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
}
export const HeroEditModal: React.FC<HeroEditModalProps> = ({ heroData, onSave, onClose, title, saveButtonText }) => {
    const [formData, setFormData] = useState(heroData);
    
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                setFormData({...formData, imageUrl: base64});
            } catch (error) {
                console.error("Error converting file to base64", error);
                alert("Error uploading image.");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <EditModalBase title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <FormField label="Kicker">
                    <TextInput value={formData.kicker} onChange={e => setFormData({...formData, kicker: e.target.value})} />
                </FormField>
                <FormField label="Title">
                    <TextInput value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </FormField>
                <FormField label="Paragraphs" instruction="Separate paragraphs with a blank line. Use <b>text</b> for bold text.">
                    <TextArea 
                        rows={6} 
                        value={formData.paragraphs.join('\n\n')} 
                        onChange={e => setFormData({...formData, paragraphs: e.target.value.split(/\n\s*\n/)})} 
                    />
                </FormField>
                 <FormField label="Hero Image">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green-light file:text-brand-green hover:file:bg-brand-green-light/80 mb-2"/>
                    {formData.imageUrl && <img src={formData.imageUrl} alt="Hero preview" className="mt-2 rounded-lg w-full object-cover" />}
                </FormField>
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-4">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};

// Project Edit Modal
interface ProjectEditModalProps {
    project: Project | 'new';
    onSave: (data: Omit<Project, 'id'> | Project) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
}
const emptyProject: Omit<Project, 'id'> = { title: '', description: '', responsibilities: [], technologies: [], coverImage: '', detailImages: [] };

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({ project, onSave, onClose, title, saveButtonText }) => {
    const [formData, setFormData] = useState(project === 'new' ? emptyProject : project);

    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                setFormData({...formData, coverImage: base64});
            } catch (error) {
                alert("Error uploading cover image.");
            }
        }
    };

    const handleDetailImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (formData.detailImages.length + files.length > 15) {
                alert('You can have a maximum of 15 detail images in total.');
                return;
            }
            try {
                const base64Promises = files.map(fileToBase64);
                const newBase64Images = await Promise.all(base64Promises);
                setFormData(prev => ({...prev, detailImages: [...prev.detailImages, ...newBase64Images]}));
            } catch (error) {
                alert("Error uploading detail images.");
            }
        }
    };

    const removeDetailImage = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            detailImages: prev.detailImages.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) {
            alert('Title and Description are required.');
            return;
        }
        onSave(formData);
    };

    return (
        <EditModalBase title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <FormField label="Title"><TextInput required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></FormField>
                <FormField label="Description"><TextArea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></FormField>
                <FormField label="Responsibilities (one per line)"><TextArea value={formData.responsibilities.join('\n')} onChange={e => setFormData({...formData, responsibilities: e.target.value.split('\n').filter(r => r.trim() !== '')})} /></FormField>
                <FormField label="Technologies (comma-separated)"><TextInput value={formData.technologies.join(', ')} onChange={e => setFormData({...formData, technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '')})} /></FormField>
                
                <FormField label="Cover Image">
                    <input type="file" accept="image/*" onChange={handleCoverImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green-light file:text-brand-green hover:file:bg-brand-green-light/80 mb-2"/>
                    {formData.coverImage && <img src={formData.coverImage} alt="Cover preview" className="mt-2 rounded-lg w-48 object-cover" />}
                </FormField>
                
                <FormField label={`Detail Images (${formData.detailImages.length} / 15)`}>
                    <input type="file" multiple accept="image/*" onChange={handleDetailImagesUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green-light file:text-brand-green hover:file:bg-brand-green-light/80 mb-2" />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.detailImages.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img} alt={`detail ${index + 1}`} className="w-24 h-24 object-cover rounded-md"/>
                                <button type="button" onClick={() => removeDetailImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">&times;</button>
                            </div>
                        ))}
                    </div>
                </FormField>
                
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-4">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};

// Experience Edit Modal
interface ExperienceEditModalProps {
    experience: Experience | 'new';
    onSave: (data: Experience | Omit<Experience, 'id'>) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
}
const emptyExperience: Omit<Experience, 'id'> = { role: '', company: '', period: '', description: '' };
export const ExperienceEditModal: React.FC<ExperienceEditModalProps> = ({ experience, onSave, onClose, title, saveButtonText }) => {
    const [formData, setFormData] = useState(experience === 'new' ? emptyExperience : experience);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    return (
        <EditModalBase title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <FormField label="Role"><TextInput value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} /></FormField>
                <FormField label="Company"><TextInput value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} /></FormField>
                <FormField label="Period"><TextInput value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} /></FormField>
                <FormField label="Description"><TextArea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></FormField>
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-4">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};

// Skill Category Edit Modal
interface SkillCategoryEditModalProps {
    skillCategory: SkillCategory | 'new';
    onSave: (data: SkillCategory | Omit<SkillCategory, 'id'>) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
}
const emptySkillCategory: Omit<SkillCategory, 'id'> = { title: '', skills: [] };
export const SkillCategoryEditModal: React.FC<SkillCategoryEditModalProps> = ({ skillCategory, onSave, onClose, title, saveButtonText }) => {
    const [formData, setFormData] = useState(skillCategory === 'new' ? emptySkillCategory : skillCategory);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    return (
        <EditModalBase title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <FormField label="Category Title"><TextInput value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></FormField>
                <FormField label="Skills (comma-separated)"><TextInput value={formData.skills.join(', ')} onChange={e => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')})} /></FormField>
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-4">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};
