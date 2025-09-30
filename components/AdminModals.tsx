import React, { useState, useEffect } from 'react';
import { CloseIcon, TrashIcon, PlusIcon } from './icons';
import type { Project, Experience, SkillCategory, HeroData, ContactMethod } from '../types';
import type { LanguageContent } from '../i18n';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => boolean;
  title: string;
  loginButtonText: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  loginErrorText: string;
  forgotPasswordLinkText: string;
  forgotPasswordHelpText: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ 
    isOpen, onClose, onLogin, title, loginButtonText, 
    usernamePlaceholder, passwordPlaceholder, loginErrorText,
    forgotPasswordLinkText, forgotPasswordHelpText
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      setUsername('');
      setPassword('');
      setError('');
      setShowHelp(false);
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowHelp(false);
    const success = onLogin(username, password);
    if (success) {
      onClose();
    } else {
      setError(loginErrorText);
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
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={usernamePlaceholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={passwordPlaceholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md">
            {loginButtonText}
          </button>
        </form>
        <div className="text-center mt-4">
            <button onClick={() => setShowHelp(true)} className="text-sm text-gray-500 hover:underline">
                {forgotPasswordLinkText}
            </button>
        </div>
        {showHelp && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-md text-center">
                {forgotPasswordHelpText}
            </div>
        )}
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
        <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
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

const LanguageTabs: React.FC<{ activeLang: 'en' | 'vn', onSelect: (lang: 'en' | 'vn') => void }> = ({ activeLang, onSelect }) => {
    const baseClasses = "px-4 py-2 text-sm font-medium focus:outline-none transition-colors duration-200";
    const activeClasses = "border-b-2 border-brand-green text-brand-green";
    const inactiveClasses = "text-gray-500 hover:text-gray-700";

    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button type="button" onClick={() => onSelect('en')} className={`${baseClasses} ${activeLang === 'en' ? activeClasses : inactiveClasses}`}>English</button>
                <button type="button" onClick={() => onSelect('vn')} className={`${baseClasses} ${activeLang === 'vn' ? activeClasses : inactiveClasses}`}>Vietnamese</button>
            </nav>
        </div>
    );
};


// Hero Edit Modal
interface HeroEditModalProps {
    heroData: { en: HeroData, vn: HeroData };
    onSave: (data: { en: HeroData, vn: HeroData }) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
}
export const HeroEditModal: React.FC<HeroEditModalProps> = ({ heroData, onSave, onClose, title, saveButtonText }) => {
    const [formData, setFormData] = useState(heroData);
    const [activeLang, setActiveLang] = useState<'en' | 'vn'>('en');

    const currentLangData = formData[activeLang];

    const handleTextChange = (field: keyof Omit<HeroData, 'imageUrl' | 'paragraphs'>, value: string) => {
      setFormData(prev => ({
        ...prev,
        [activeLang]: { ...prev[activeLang], [field]: value }
      }));
    };
    
    const handleParagraphsChange = (value: string) => {
         setFormData(prev => ({
            ...prev,
            [activeLang]: { ...prev[activeLang], paragraphs: value.split(/\n\s*\n/) }
        }));
    };
    
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                setFormData(prev => ({
                    en: {...prev.en, imageUrl: base64},
                    vn: {...prev.vn, imageUrl: base64}
                }));
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
                <LanguageTabs activeLang={activeLang} onSelect={setActiveLang} />
                <FormField label="Kicker">
                    <TextInput value={currentLangData.kicker} onChange={e => handleTextChange('kicker', e.target.value)} />
                </FormField>
                <FormField label="Title">
                    <TextInput value={currentLangData.title} onChange={e => handleTextChange('title', e.target.value)} />
                </FormField>
                <FormField label="Paragraphs" instruction="Separate paragraphs with a blank line. Use <b>text</b> for bold text.">
                    <TextArea 
                        rows={6} 
                        value={currentLangData.paragraphs.join('\n\n')} 
                        onChange={e => handleParagraphsChange(e.target.value)} 
                    />
                </FormField>
                
                <hr className="my-6"/>

                 <FormField label="Hero Image (Shared)">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green-light file:text-brand-green hover:file:bg-brand-green-light/80 mb-2"/>
                    {formData.en.imageUrl && <img src={formData.en.imageUrl} alt="Hero preview" className="mt-2 rounded-lg w-full object-cover" />}
                </FormField>
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-4">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};

// Project Edit Modal
interface ProjectEditModalProps {
    project: { en: Project, vn: Project } | 'new';
    onSave: (data: { en: Project, vn: Project } | { en: Omit<Project, 'id'>, vn: Omit<Project, 'id'> }) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
    urlLabelText: string;
    imageResolutionWarningText: string;
}
const emptyBilingualProject: { en: Omit<Project, 'id'>, vn: Omit<Project, 'id'> } = {
    en: { title: '', description: '', responsibilities: [], technologies: [], coverImage: '', detailImages: [], url: '' },
    vn: { title: '', description: '', responsibilities: [], technologies: [], coverImage: '', detailImages: [], url: '' },
};

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({ project, onSave, onClose, title, saveButtonText, urlLabelText, imageResolutionWarningText }) => {
    const [formData, setFormData] = useState(project === 'new' ? emptyBilingualProject : project);
    const [activeLang, setActiveLang] = useState<'en' | 'vn'>('en');
    
    const currentLangData = formData[activeLang];
    
    const handleTextChange = (field: keyof Omit<Project, 'id' | 'coverImage' | 'detailImages' | 'url'>, value: string | string[]) => {
      setFormData(prev => ({
        ...prev,
        [activeLang]: { ...prev[activeLang], [field]: value }
      }));
    };
    
    const handleSharedChange = (field: 'url', value: string) => {
        setFormData(prev => ({
            en: { ...prev.en, [field]: value },
            vn: { ...prev.vn, [field]: value },
        }));
    };

    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                setFormData(prev => ({
                    en: { ...prev.en, coverImage: base64 },
                    vn: { ...prev.vn, coverImage: base64 },
                }));
            } catch (error) {
                alert("Error uploading cover image.");
            }
        }
    };

    const handleDetailImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const currentImages = formData.en.detailImages || [];
            if (currentImages.length + files.length > 15) {
                alert('You can have a maximum of 15 detail images in total.');
                return;
            }
            try {
                const base64Promises = files.map(fileToBase64);
                const newBase64Images = await Promise.all(base64Promises);
                const updatedImages = [...currentImages, ...newBase64Images];
                setFormData(prev => ({
                    en: { ...prev.en, detailImages: updatedImages },
                    vn: { ...prev.vn, detailImages: updatedImages },
                }));
            } catch (error) {
                alert("Error uploading detail images.");
            }
        }
    };

    const removeDetailImage = (indexToRemove: number) => {
        const updatedImages = formData.en.detailImages.filter((_, index) => index !== indexToRemove);
        setFormData(prev => ({
            en: { ...prev.en, detailImages: updatedImages },
            vn: { ...prev.vn, detailImages: updatedImages },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.en.title.trim() || !formData.vn.title.trim()) {
            alert('Title is required for both languages.');
            return;
        }
        onSave(formData);
    };

    return (
        <EditModalBase title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <LanguageTabs activeLang={activeLang} onSelect={setActiveLang} />
                <FormField label="Title"><TextInput required value={currentLangData.title} onChange={e => handleTextChange('title', e.target.value)} /></FormField>
                <FormField label="Description"><TextArea required value={currentLangData.description} onChange={e => handleTextChange('description', e.target.value)} /></FormField>
                <FormField label="Responsibilities (one per line)"><TextArea value={currentLangData.responsibilities.join('\n')} onChange={e => handleTextChange('responsibilities', e.target.value.split('\n').filter(r => r.trim() !== ''))} /></FormField>
                <FormField label="Technologies (comma-separated)"><TextInput value={currentLangData.technologies.join(', ')} onChange={e => handleTextChange('technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t !== ''))} /></FormField>
                
                <hr className="my-6"/>

                <FormField label={urlLabelText}>
                    <TextInput 
                        value={formData.en.url || ''} 
                        onChange={e => handleSharedChange('url', e.target.value)} 
                        placeholder="https://example.com/prototype"
                    />
                </FormField>

                <FormField label="Cover Image (Shared)">
                    <input type="file" accept="image/*" onChange={handleCoverImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green-light file:text-brand-green hover:file:bg-brand-green-light/80 mb-2"/>
                    <p className="text-xs text-gray-500 mt-1">{imageResolutionWarningText}</p>
                    {formData.en.coverImage && <img src={formData.en.coverImage} alt="Cover preview" className="mt-2 rounded-lg w-48 object-cover" />}
                </FormField>
                
                <FormField label={`Detail Images (Shared) (${formData.en.detailImages.length} / 15)`}>
                    <input type="file" multiple accept="image/*" onChange={handleDetailImagesUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green-light file:text-brand-green hover:file:bg-brand-green-light/80 mb-2" />
                    <p className="text-xs text-gray-500 mt-1">{imageResolutionWarningText}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.en.detailImages.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img} alt={`detail ${index + 1}`} className="w-24 h-24 object-cover rounded-md"/>
                                <button type="button" onClick={() => removeDetailImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">&times;</button>
                            </div>
                        ))}
                    </div>
                </FormField>
                
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-6">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};

// Experience Edit Modal
interface ExperienceEditModalProps {
    experience: { en: Experience, vn: Experience } | 'new';
    onSave: (data: { en: Experience, vn: Experience } | { en: Omit<Experience, 'id'>, vn: Omit<Experience, 'id'> }) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
}
const emptyBilingualExperience = {
    en: { role: '', company: '', period: '', description: '' },
    vn: { role: '', company: '', period: '', description: '' },
};
export const ExperienceEditModal: React.FC<ExperienceEditModalProps> = ({ experience, onSave, onClose, title, saveButtonText }) => {
    const [formData, setFormData] = useState(experience === 'new' ? emptyBilingualExperience : experience);
    const [activeLang, setActiveLang] = useState<'en' | 'vn'>('en');

    const currentLangData = formData[activeLang];

    const handleChange = (field: keyof Omit<Experience, 'id'>, value: string) => {
      setFormData(prev => ({
        ...prev,
        [activeLang]: { ...prev[activeLang], [field]: value }
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    return (
        <EditModalBase title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <LanguageTabs activeLang={activeLang} onSelect={setActiveLang} />
                <FormField label="Role"><TextInput value={currentLangData.role} onChange={e => handleChange('role', e.target.value)} /></FormField>
                <FormField label="Company"><TextInput value={currentLangData.company} onChange={e => handleChange('company', e.target.value)} /></FormField>
                <FormField label="Period"><TextInput value={currentLangData.period} onChange={e => handleChange('period', e.target.value)} /></FormField>
                <FormField label="Description"><TextArea value={currentLangData.description} onChange={e => handleChange('description', e.target.value)} /></FormField>
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-4">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};

// Skill Category Edit Modal
interface SkillCategoryEditModalProps {
    skillCategory: { en: SkillCategory, vn: SkillCategory } | 'new';
    onSave: (data: { en: SkillCategory, vn: SkillCategory } | { en: Omit<SkillCategory, 'id'>, vn: Omit<SkillCategory, 'id'> }) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
}
const emptyBilingualSkillCategory = {
    en: { title: '', skills: [] },
    vn: { title: '', skills: [] },
};
export const SkillCategoryEditModal: React.FC<SkillCategoryEditModalProps> = ({ skillCategory, onSave, onClose, title, saveButtonText }) => {
    const [formData, setFormData] = useState(skillCategory === 'new' ? emptyBilingualSkillCategory : skillCategory);
    const [activeLang, setActiveLang] = useState<'en' | 'vn'>('en');
    
    const currentLangData = formData[activeLang];

    const handleChange = (field: keyof Omit<SkillCategory, 'id'>, value: string | string[]) => {
      setFormData(prev => ({
        ...prev,
        [activeLang]: { ...prev[activeLang], [field]: value }
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    return (
        <EditModalBase title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <LanguageTabs activeLang={activeLang} onSelect={setActiveLang} />
                <FormField label="Category Title"><TextInput value={currentLangData.title} onChange={e => handleChange('title', e.target.value)} /></FormField>
                <FormField label="Skills (comma-separated)"><TextInput value={currentLangData.skills.join(', ')} onChange={e => handleChange('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s !== ''))} /></FormField>
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-4">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};


// Contact Edit Modal
interface ContactEditModalProps {
    contactData: { en: LanguageContent['contact'], vn: LanguageContent['contact'] };
    onSave: (data: { en: LanguageContent['contact'], vn: LanguageContent['contact'] }) => void;
    onClose: () => void;
    title: string;
    saveButtonText: string;
}
export const ContactEditModal: React.FC<ContactEditModalProps> = ({ contactData, onSave, onClose, title, saveButtonText }) => {
    const [formData, setFormData] = useState(contactData);
    const [activeLang, setActiveLang] = useState<'en' | 'vn'>('en');
    
    const currentLangData = formData[activeLang];

    const handleTextChange = (field: 'title' | 'subtitle', value: string) => {
      setFormData(prev => ({
        ...prev,
        [activeLang]: { ...prev[activeLang], [field]: value }
      }));
    };

    const handleMethodChange = <K extends keyof ContactMethod>(index: number, field: K, value: ContactMethod[K]) => {
        setFormData(prev => {
            const newEnMethods = [...prev.en.contactMethods];
            const newVnMethods = [...prev.vn.contactMethods];
            
            if (field === 'label') {
                if (activeLang === 'en') {
                    newEnMethods[index] = { ...newEnMethods[index], [field]: value };
                } else {
                    newVnMethods[index] = { ...newVnMethods[index], [field]: value };
                }
            } else { // Shared fields
                newEnMethods[index] = { ...newEnMethods[index], [field]: value };
                newVnMethods[index] = { ...newVnMethods[index], [field]: value };
            }
            
            return {
                en: { ...prev.en, contactMethods: newEnMethods },
                vn: { ...prev.vn, contactMethods: newVnMethods }
            };
        });
    };
    
    const addMethod = () => {
        const newMethod: ContactMethod = { type: 'email', label: '', url: '' };
        setFormData(prev => ({
            en: { ...prev.en, contactMethods: [...prev.en.contactMethods, newMethod] },
            vn: { ...prev.vn, contactMethods: [...prev.vn.contactMethods, newMethod] },
        }));
    };

    const removeMethod = (index: number) => {
        setFormData(prev => ({
            en: { ...prev.en, contactMethods: prev.en.contactMethods.filter((_, i) => i !== index) },
            vn: { ...prev.vn, contactMethods: prev.vn.contactMethods.filter((_, i) => i !== index) },
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    return (
        <EditModalBase title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <LanguageTabs activeLang={activeLang} onSelect={setActiveLang} />
                <FormField label="Title"><TextInput value={currentLangData.title} onChange={e => handleTextChange('title', e.target.value)} /></FormField>
                <FormField label="Subtitle"><TextArea value={currentLangData.subtitle} onChange={e => handleTextChange('subtitle', e.target.value)} /></FormField>
                
                <hr className="my-6"/>

                <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Methods</h3>
                <div className="space-y-4">
                    {formData.en.contactMethods.map((_, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                            <button type="button" onClick={() => removeMethod(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><TrashIcon className="w-4 h-4" /></button>
                            <FormField label="Type (Shared)">
                                <select 
                                    value={formData.en.contactMethods[index].type} 
                                    onChange={e => handleMethodChange(index, 'type', e.target.value as ContactMethod['type'])}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                </select>
                            </FormField>
                            <FormField label="URL (Shared)">
                                <TextInput value={formData.en.contactMethods[index].url} onChange={e => handleMethodChange(index, 'url', e.target.value)} />
                            </FormField>
                             <FormField label="Label (English)">
                                <TextInput value={formData.en.contactMethods[index].label} onChange={e => handleMethodChange(index, 'label', e.target.value)} />
                            </FormField>
                             <FormField label="Label (Vietnamese)">
                                <TextInput value={formData.vn.contactMethods[index].label} onChange={e => handleMethodChange(index, 'label', e.target.value)} />
                            </FormField>
                        </div>
                    ))}
                </div>

                <button type="button" onClick={addMethod} className="mt-4 text-sm font-medium text-brand-green hover:underline inline-flex items-center">
                   <PlusIcon className="w-4 h-4 mr-1"/> Add Contact Method
                </button>
                
                <button type="submit" className="w-full bg-brand-green text-white py-2 rounded-md mt-6">{saveButtonText}</button>
            </form>
        </EditModalBase>
    );
};