import React, { useState, useEffect } from 'react';
import type { Project, Experience, SkillCategory, HeroData } from './types';
import { allLanguageData } from './i18n';
import type { LanguageContent } from './i18n';

import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperienceComponent from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import { AdminLoginModal, HeroEditModal, ProjectEditModal, ExperienceEditModal, SkillCategoryEditModal } from './components/AdminModals';

// --- LocalStorage Persistence ---

const LS_KEY_CONTENT = 'portfolio-content-v2';

const getFromStorage = <T,>(key: string, fallback: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        return fallback;
    }
};

// --- Helper for deep comparison ---
const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};


// --- End LocalStorage ---

type EditingItem = 
    | { type: 'hero'; data: HeroData }
    | { type: 'project'; data: Project | 'new' }
    | { type: 'experience'; data: Experience | 'new' }
    | { type: 'skill'; data: SkillCategory | 'new' };

type Language = 'en' | 'vn';

type AppContent = { en: LanguageContent; vn: LanguageContent };

const App: React.FC = () => {
  const [content, setContent] = useState<AppContent>(() => getFromStorage(LS_KEY_CONTENT, allLanguageData));
  const [draftContent, setDraftContent] = useState<AppContent | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  // --- State Persistence Effect ---
  useEffect(() => {
      // Don't persist while in admin mode to avoid saving partial drafts
      if (!isAdmin) {
          try {
              localStorage.setItem(LS_KEY_CONTENT, JSON.stringify(content));
          } catch (error) {
              console.error("Failed to save content to localStorage:", error);
              const alertMessage = allLanguageData[language].modals.localStorageError || "Could not save changes. You may have too many large images. Please reduce image sizes and try again.";
              alert(alertMessage);
          }
      }
  }, [content, isAdmin, language]);
  
  // --- Unsaved Changes Warning Effect ---
  useEffect(() => {
    const hasUnsavedChanges = isAdmin && draftContent && !deepEqual(content, draftContent);

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        const message = allLanguageData[language].modals.unsavedChangesWarning;
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAdmin, draftContent, content, language]);
  // --- End Effect ---

  const handleAdminLogin = () => {
    setDraftContent(JSON.parse(JSON.stringify(content))); // Deep copy to create a draft
    setIsAdmin(true);
  };

  const handleCancel = () => {
    // Discard draft and exit admin mode
    setDraftContent(null);
    setIsAdmin(false);
    setEditingItem(null);
  };

  const handleSaveChanges = () => {
    // Commit draft to main content state and exit admin mode
    if (draftContent) {
      setContent(draftContent);
    }
    setDraftContent(null);
    setIsAdmin(false);
    setEditingItem(null);
  };

  const activeContent = isAdmin && draftContent ? draftContent : content;
  const currentLangContent = activeContent[language];

  const handleSaveHero = (data: HeroData) => {
    setDraftContent(prev => {
        if (!prev) return null;
        return {
            ...prev,
            [language]: {
                ...prev[language],
                hero: data,
            }
        };
    });
    setEditingItem(null);
  }

  const handleSaveProject = (projectToSave: Project | Omit<Project, 'id'>) => {
    setDraftContent(prev => {
        if (!prev) return null;
        if ('id' in projectToSave) { // Editing existing
            const updateProject = (p: Project) => p.id === projectToSave.id ? projectToSave : p;
            return {
                ...prev,
                en: { ...prev.en, projectsData: prev.en.projectsData.map(updateProject) },
                vn: { ...prev.vn, projectsData: prev.vn.projectsData.map(updateProject) },
            };
        } else { // Adding new
            const newProject = { ...projectToSave, id: Date.now() };
            return {
                ...prev,
                en: { ...prev.en, projectsData: [...prev.en.projectsData, newProject] },
                vn: { ...prev.vn, projectsData: [...prev.vn.projectsData, JSON.parse(JSON.stringify(newProject))] },
            };
        }
    });
    setEditingItem(null);
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm(currentLangContent.modals.deleteProjectConfirmation)) {
      setDraftContent(prev => {
        if (!prev) return null;
        const filterProject = (p: Project) => p.id !== id;
        return {
            ...prev,
            en: { ...prev.en, projectsData: prev.en.projectsData.filter(filterProject) },
            vn: { ...prev.vn, projectsData: prev.vn.projectsData.filter(filterProject) },
        };
      });
    }
  };

  const handleSaveExperience = (expToSave: Experience | Omit<Experience, 'id'>) => {
    setDraftContent(prev => {
        if (!prev) return null;
        if ('id' in expToSave) { // Editing existing
            const updateExp = (e: Experience) => e.id === expToSave.id ? expToSave : e;
            return {
                ...prev,
                en: { ...prev.en, experiencesData: prev.en.experiencesData.map(updateExp) },
                vn: { ...prev.vn, experiencesData: prev.vn.experiencesData.map(updateExp) },
            };
        } else { // Adding new
            const newExp = { ...expToSave, id: Date.now() };
            return {
                ...prev,
                en: { ...prev.en, experiencesData: [...prev.en.experiencesData, newExp] },
                vn: { ...prev.vn, experiencesData: [...prev.vn.experiencesData, JSON.parse(JSON.stringify(newExp))] },
            };
        }
    });
    setEditingItem(null);
  };

  const handleDeleteExperience = (id: number) => {
    if (window.confirm(currentLangContent.modals.deleteExperienceConfirmation)) {
      setDraftContent(prev => {
        if (!prev) return null;
        const filterExp = (e: Experience) => e.id !== id;
        return {
            ...prev,
            en: { ...prev.en, experiencesData: prev.en.experiencesData.filter(filterExp) },
            vn: { ...prev.vn, experiencesData: prev.vn.experiencesData.filter(filterExp) },
        };
      });
    }
  };

  const handleSaveSkillCategory = (scToSave: SkillCategory | Omit<SkillCategory, 'id'>) => {
    setDraftContent(prev => {
        if (!prev) return null;
        if ('id' in scToSave) { // Editing existing
            const updateSc = (sc: SkillCategory) => sc.id === scToSave.id ? scToSave : sc;
            return {
                ...prev,
                en: { ...prev.en, skillCategoriesData: prev.en.skillCategoriesData.map(updateSc) },
                vn: { ...prev.vn, skillCategoriesData: prev.vn.skillCategoriesData.map(updateSc) },
            };
        } else { // Adding new
            const newSc = { ...scToSave, id: Date.now() };
            return {
                ...prev,
                en: { ...prev.en, skillCategoriesData: [...prev.en.skillCategoriesData, newSc] },
                vn: { ...prev.vn, skillCategoriesData: [...prev.vn.skillCategoriesData, JSON.parse(JSON.stringify(newSc))] },
            };
        }
    });
    setEditingItem(null);
  };

  const handleDeleteSkillCategory = (id: number) => {
    if (window.confirm(currentLangContent.modals.deleteSkillCategoryConfirmation)) {
      setDraftContent(prev => {
        if (!prev) return null;
        const filterSc = (sc: SkillCategory) => sc.id !== id;
        return {
            ...prev,
            en: { ...prev.en, skillCategoriesData: prev.en.skillCategoriesData.filter(filterSc) },
            vn: { ...prev.vn, skillCategoriesData: prev.vn.skillCategoriesData.filter(filterSc) },
        };
      });
    }
  };
  
  const handleCloseModal = () => {
      setEditingItem(null);
  }

  return (
    <div className="bg-brand-background font-sans text-brand-text">
      <Header 
        isAdmin={isAdmin} 
        onAdminLoginClick={() => setLoginModalOpen(true)}
        onSave={handleSaveChanges}
        onCancel={handleCancel}
        language={language}
        onLanguageChange={setLanguage}
        navLinks={currentLangContent.navLinks}
        adminLoginText={content[language].header.adminLogin}
        saveText={content[language].header.save}
        cancelText={content[language].header.cancel}
      />
      <main>
        <Hero 
            kicker={currentLangContent.hero.kicker}
            title={currentLangContent.hero.title}
            paragraphs={currentLangContent.hero.paragraphs}
            imageUrl={currentLangContent.hero.imageUrl}
            isAdmin={isAdmin}
            onEdit={() => setEditingItem({ type: 'hero', data: currentLangContent.hero })}
        />
        <Projects 
            sectionTitle={currentLangContent.projects.sectionTitle}
            title={currentLangContent.projects.title}
            addProjectText={currentLangContent.projects.addProject}
            projects={currentLangContent.projectsData} 
            onViewProject={setSelectedProject} 
            isAdmin={isAdmin}
            onAddProject={() => setEditingItem({ type: 'project', data: 'new' })}
            onEditProject={(p) => setEditingItem({ type: 'project', data: p })}
            onDeleteProject={handleDeleteProject}
        />
        <ExperienceComponent 
            sectionTitle={currentLangContent.experience.sectionTitle}
            title={currentLangContent.experience.title}
            subtitle={currentLangContent.experience.subtitle}
            addExperienceText={currentLangContent.experience.addExperience}
            experiences={currentLangContent.experiencesData} 
            isAdmin={isAdmin}
            onAdd={() => setEditingItem({ type: 'experience', data: 'new' })}
            onEdit={(e) => setEditingItem({ type: 'experience', data: e })}
            onDelete={handleDeleteExperience}
        />
        <Skills 
            sectionTitle={currentLangContent.skills.sectionTitle}
            title={currentLangContent.skills.title}
            subtitle={currentLangContent.skills.subtitle}
            addSkillCategoryText={currentLangContent.skills.addSkillCategory}
            skillCategories={currentLangContent.skillCategoriesData} 
            isAdmin={isAdmin}
            onAdd={() => setEditingItem({ type: 'skill', data: 'new' })}
            onEdit={(sc) => setEditingItem({ type: 'skill', data: sc })}
            onDelete={handleDeleteSkillCategory}
        />
        <Contact 
            title={currentLangContent.contact.title}
            subtitle={currentLangContent.contact.subtitle}
            contactMethods={currentLangContent.contact.contactMethods}
        />
      </main>
      <Footer 
        navLinks={currentLangContent.navLinks}
      />

      {/* View Modals */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      {/* Admin and Edit Modals */}
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleAdminLogin}
        title={currentLangContent.modals.loginTitle}
        loginButtonText={currentLangContent.modals.loginButton}
      />
      {editingItem?.type === 'hero' && <HeroEditModal heroData={editingItem.data} onSave={handleSaveHero} onClose={handleCloseModal} title={currentLangContent.modals.editHeroTitle} saveButtonText={currentLangContent.modals.saveChanges} />}
      {editingItem?.type === 'project' && <ProjectEditModal project={editingItem.data} onSave={handleSaveProject} onClose={handleCloseModal} title={editingItem.data === 'new' ? currentLangContent.modals.addProjectTitle : currentLangContent.modals.editProjectTitle} saveButtonText={currentLangContent.modals.saveProject} />}
      {editingItem?.type === 'experience' && <ExperienceEditModal experience={editingItem.data} onSave={handleSaveExperience} onClose={handleCloseModal} title={editingItem.data === 'new' ? currentLangContent.modals.addExperienceTitle : currentLangContent.modals.editExperienceTitle} saveButtonText={currentLangContent.modals.saveExperience} />}
      {editingItem?.type === 'skill' && <SkillCategoryEditModal skillCategory={editingItem.data} onSave={handleSaveSkillCategory} onClose={handleCloseModal} title={editingItem.data === 'new' ? currentLangContent.modals.addSkillCategoryTitle : currentLangContent.modals.editSkillCategoryTitle} saveButtonText={currentLangContent.modals.saveSkillCategory} />}

    </div>
  );
};

export default App;