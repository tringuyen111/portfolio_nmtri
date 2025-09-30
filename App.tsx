
import React, { useState, useEffect } from 'react';
import type { Project, Experience, SkillCategory, HeroData, AppContent, AppSettings } from './types';
import { initialContent } from './i18n';
import type { LanguageContent } from './i18n';

import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperienceComponent from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ThemeEditor from './components/ThemeEditor';
import { AdminLoginModal, HeroEditModal, ProjectEditModal, ExperienceEditModal, SkillCategoryEditModal, ContactEditModal } from './components/AdminModals';

// --- LocalStorage Persistence ---

const LS_KEY_CONTENT = 'portfolio-content-v3'; // Incremented version for new data structure

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

type Bilingual<T> = { en: T; vn: T };

type EditingItem =
    | { type: 'hero'; data: Bilingual<HeroData> }
    | { type: 'project'; data: Bilingual<Project> | 'new' }
    | { type: 'experience'; data: Bilingual<Experience> | 'new' }
    | { type: 'skill'; data: Bilingual<SkillCategory> | 'new' }
    | { type: 'contact'; data: Bilingual<LanguageContent['contact']> };

type Language = 'en' | 'vn';

const App: React.FC = () => {
  const [content, setContent] = useState<AppContent>(() => getFromStorage(LS_KEY_CONTENT, initialContent));
  const [draftContent, setDraftContent] = useState<AppContent | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => !!sessionStorage.getItem('isAdminLoggedIn'));
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  const isEditing = draftContent !== null;
  const activeContent = isEditing && draftContent ? draftContent : content;
  const currentLangContent = activeContent[language];

  // --- State Persistence Effect ---
  useEffect(() => {
      // Don't persist while in editing mode to avoid saving partial drafts
      if (!isEditing) {
          try {
              localStorage.setItem(LS_KEY_CONTENT, JSON.stringify(content));
          } catch (error) {
              console.error("Failed to save content to localStorage:", error);
              const alertMessage = initialContent[language].modals.localStorageError || "Could not save changes. Data may be too large to be stored locally.";
              alert(alertMessage);
          }
      }
  }, [content, isEditing, language]);
  
  // --- Unsaved Changes Warning Effect ---
  useEffect(() => {
    const hasUnsavedChanges = isEditing && draftContent && !deepEqual(content, draftContent);

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        const message = initialContent[language].modals.unsavedChangesWarning;
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEditing, draftContent, content, language]);

  // --- Dynamic Style Application Effect ---
   useEffect(() => {
        const settings = activeContent.settings;
        const root = document.documentElement;
        root.style.setProperty('--font-sans', settings.fontFamilySans);
        root.style.setProperty('--font-serif', settings.fontFamilySerif);
        root.style.fontSize = `${settings.baseFontSize}px`;
    }, [activeContent.settings]);


  const handleLoginAttempt = (username: string, password: string): boolean => {
      if (username === 'nguyenmanhtri2907@gmail.com' && password === 'nmt29072002') {
          sessionStorage.setItem('isAdminLoggedIn', 'true');
          setIsAdmin(true);
          // Do not enter edit mode automatically on login
          return true;
      }
      return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    setIsAdmin(false);
    setDraftContent(null);
    setEditingItem(null);
  };

  const handleStartEditing = () => {
      if (isAdmin) {
          setDraftContent(JSON.parse(JSON.stringify(content)));
      }
  };

  const handleCancel = () => {
    setDraftContent(null);
    setEditingItem(null);
  };

  const handleSaveChanges = () => {
    if (draftContent) {
      setContent(draftContent);
    }
    setDraftContent(null);
    setEditingItem(null);
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    setDraftContent(prev => {
        if (!prev) return null;
        return { ...prev, settings: newSettings };
    });
  };

  const handleSaveHero = (data: Bilingual<HeroData>) => {
    setDraftContent(prev => {
        if (!prev) return null;
        const sharedImageUrl = data.en.imageUrl;
        return {
            ...prev,
            en: { ...prev.en, hero: { ...data.en, imageUrl: sharedImageUrl } },
            vn: { ...prev.vn, hero: { ...data.vn, imageUrl: sharedImageUrl } },
        };
    });
    setEditingItem(null);
  };
  
  const handleEditProject = (projectToEdit: Project) => {
      if (!draftContent) return;
      const enProject = draftContent.en.projectsData.find(p => p.id === projectToEdit.id);
      const vnProject = draftContent.vn.projectsData.find(p => p.id === projectToEdit.id);
      if (enProject && vnProject) {
          setEditingItem({ type: 'project', data: { en: enProject, vn: vnProject } });
      }
  };

  const handleSaveProject = (data: Bilingual<Project> | Bilingual<Omit<Project, 'id'>>) => {
    // FIX: Cast data within each branch to help TypeScript's type inference.
    // The `in` operator type guard was not correctly narrowing the `data` object's bilingual properties together.
    setDraftContent(prev => {
        if (!prev) return null;
        if ('id' in data.en) { // Editing existing
            const editingData = data as Bilingual<Project>;
            const updateEn = prev.en.projectsData.map(p => p.id === editingData.en.id ? editingData.en : p);
            const updateVn = prev.vn.projectsData.map(p => p.id === editingData.vn.id ? editingData.vn : p);
            return {
                ...prev,
                en: { ...prev.en, projectsData: updateEn },
                vn: { ...prev.vn, projectsData: updateVn },
            };
        } else { // Adding new
            const newData = data as Bilingual<Omit<Project, 'id'>>;
            const newId = Date.now();
            const newEnProject: Project = { ...newData.en, id: newId };
            const newVnProject: Project = { ...newData.vn, id: newId };
            // Sync shared fields
            newVnProject.coverImage = newEnProject.coverImage;
            newVnProject.detailImages = newEnProject.detailImages;
            newVnProject.url = newEnProject.url;
            return {
                ...prev,
                en: { ...prev.en, projectsData: [...prev.en.projectsData, newEnProject] },
                vn: { ...prev.vn, projectsData: [...prev.vn.projectsData, newVnProject] },
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

  const handleEditExperience = (expToEdit: Experience) => {
      if (!draftContent) return;
      const enExp = draftContent.en.experiencesData.find(e => e.id === expToEdit.id);
      const vnExp = draftContent.vn.experiencesData.find(e => e.id === expToEdit.id);
      if (enExp && vnExp) {
          setEditingItem({ type: 'experience', data: { en: enExp, vn: vnExp } });
      }
  };

  const handleSaveExperience = (data: Bilingual<Experience> | Bilingual<Omit<Experience, 'id'>>) => {
    // FIX: Cast data within each branch to help TypeScript's type inference.
    // The `in` operator type guard was not correctly narrowing the `data` object's bilingual properties together.
    setDraftContent(prev => {
        if (!prev) return null;
        if ('id' in data.en) { // Editing existing
            const editingData = data as Bilingual<Experience>;
            const updateEn = prev.en.experiencesData.map(e => e.id === editingData.en.id ? editingData.en : e);
            const updateVn = prev.vn.experiencesData.map(e => e.id === editingData.vn.id ? editingData.vn : e);
            return {
                ...prev,
                en: { ...prev.en, experiencesData: updateEn },
                vn: { ...prev.vn, experiencesData: updateVn },
            };
        } else { // Adding new
            const newData = data as Bilingual<Omit<Experience, 'id'>>;
            const newId = Date.now();
            const newEnExp: Experience = { ...newData.en, id: newId };
            const newVnExp: Experience = { ...newData.vn, id: newId };
            return {
                ...prev,
                en: { ...prev.en, experiencesData: [newEnExp, ...prev.en.experiencesData] },
                vn: { ...prev.vn, experiencesData: [newVnExp, ...prev.vn.experiencesData] },
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
  
  const handleEditSkillCategory = (scToEdit: SkillCategory) => {
      if (!draftContent) return;
      const enSc = draftContent.en.skillCategoriesData.find(sc => sc.id === scToEdit.id);
      const vnSc = draftContent.vn.skillCategoriesData.find(sc => sc.id === scToEdit.id);
      if (enSc && vnSc) {
          setEditingItem({ type: 'skill', data: { en: enSc, vn: vnSc } });
      }
  };

  const handleSaveSkillCategory = (data: Bilingual<SkillCategory> | Bilingual<Omit<SkillCategory, 'id'>>) => {
    // FIX: Cast data within each branch to help TypeScript's type inference.
    // The `in` operator type guard was not correctly narrowing the `data` object's bilingual properties together.
    setDraftContent(prev => {
        if (!prev) return null;
        if ('id' in data.en) { // Editing existing
            const editingData = data as Bilingual<SkillCategory>;
            const updateEn = prev.en.skillCategoriesData.map(sc => sc.id === editingData.en.id ? editingData.en : sc);
            const updateVn = prev.vn.skillCategoriesData.map(sc => sc.id === editingData.vn.id ? editingData.vn : sc);
            return {
                ...prev,
                en: { ...prev.en, skillCategoriesData: updateEn },
                vn: { ...prev.vn, skillCategoriesData: updateVn },
            };
        } else { // Adding new
            const newData = data as Bilingual<Omit<SkillCategory, 'id'>>;
            const newId = Date.now();
            const newEnSc: SkillCategory = { ...newData.en, id: newId };
            const newVnSc: SkillCategory = { ...newData.vn, id: newId };
            return {
                ...prev,
                en: { ...prev.en, skillCategoriesData: [...prev.en.skillCategoriesData, newEnSc] },
                vn: { ...prev.vn, skillCategoriesData: [...prev.vn.skillCategoriesData, newVnSc] },
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

  const handleSaveContact = (data: Bilingual<LanguageContent['contact']>) => {
    setDraftContent(prev => {
        if (!prev) return null;
        return {
            ...prev,
            en: { ...prev.en, contact: data.en },
            vn: { ...prev.vn, contact: data.vn },
        };
    });
    setEditingItem(null);
  };
  
  const handleCloseModal = () => {
      setEditingItem(null);
  }

  return (
    <div className="bg-brand-background font-sans text-brand-text">
      <Header 
        isAdmin={isAdmin}
        isEditing={isEditing} 
        onAdminLoginClick={() => setLoginModalOpen(true)}
        onSave={handleSaveChanges}
        onCancel={handleCancel}
        onLogout={handleLogout}
        onStartEditing={handleStartEditing}
        language={language}
        onLanguageChange={setLanguage}
        navLinks={currentLangContent.navLinks}
        adminLoginText={content[language].header.adminLogin}
        saveText={content[language].header.save}
        cancelText={content[language].header.cancel}
        logoutText={content[language].header.logout}
        startEditingText={content[language].header.startEditing}
      />
      <main>
        <Hero 
            kicker={currentLangContent.hero.kicker}
            title={currentLangContent.hero.title}
            paragraphs={currentLangContent.hero.paragraphs}
            imageUrl={currentLangContent.hero.imageUrl}
            isEditing={isEditing}
            onEdit={() => isEditing && setEditingItem({ type: 'hero', data: { en: activeContent.en.hero, vn: activeContent.vn.hero } })}
        />
        <Projects 
            sectionTitle={currentLangContent.projects.sectionTitle}
            title={currentLangContent.projects.title}
            addProjectText={currentLangContent.projects.addProject}
            viewProjectLinkText={currentLangContent.projects.viewProjectLink}
            projects={currentLangContent.projectsData} 
            onViewProject={setSelectedProject} 
            isAdmin={isEditing}
            onAddProject={() => setEditingItem({ type: 'project', data: 'new' })}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
        />
        <ExperienceComponent 
            sectionTitle={currentLangContent.experience.sectionTitle}
            title={currentLangContent.experience.title}
            subtitle={currentLangContent.experience.subtitle}
            addExperienceText={currentLangContent.experience.addExperience}
            experiences={currentLangContent.experiencesData} 
            isAdmin={isEditing}
            onAdd={() => setEditingItem({ type: 'experience', data: 'new' })}
            onEdit={handleEditExperience}
            onDelete={handleDeleteExperience}
        />
        <Skills 
            sectionTitle={currentLangContent.skills.sectionTitle}
            title={currentLangContent.skills.title}
            subtitle={currentLangContent.skills.subtitle}
            addSkillCategoryText={currentLangContent.skills.addSkillCategory}
            skillCategories={currentLangContent.skillCategoriesData} 
            isAdmin={isEditing}
            onAdd={() => setEditingItem({ type: 'skill', data: 'new' })}
            onEdit={handleEditSkillCategory}
            onDelete={handleDeleteSkillCategory}
        />
        <Contact 
            title={currentLangContent.contact.title}
            subtitle={currentLangContent.contact.subtitle}
            contactMethods={currentLangContent.contact.contactMethods}
            isEditing={isEditing}
            onEdit={() => isEditing && setEditingItem({ type: 'contact', data: { en: activeContent.en.contact, vn: activeContent.vn.contact } })}
        />
      </main>
      <Footer 
        navLinks={currentLangContent.navLinks}
      />

      {/* View Modals */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        visitProjectLinkText={currentLangContent.modals.visitProjectLink}
      />
      
      {/* Admin and Edit Modals */}
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLoginAttempt}
        title={currentLangContent.modals.loginTitle}
        loginButtonText={currentLangContent.modals.loginButton}
        usernamePlaceholder={currentLangContent.modals.loginUsernamePlaceholder}
        passwordPlaceholder={currentLangContent.modals.loginPasswordPlaceholder}
        loginErrorText={currentLangContent.modals.loginError}
        forgotPasswordLinkText={currentLangContent.modals.forgotPasswordLink}
        forgotPasswordHelpText={currentLangContent.modals.forgotPasswordHelp}
      />
      {isEditing && draftContent && (
        <ThemeEditor 
            settings={draftContent.settings}
            onSettingsChange={handleSettingsChange}
            labels={{
                title: currentLangContent.modals.themeEditorTitle,
                fontSettings: currentLangContent.modals.fontSettings,
                sansSerifFont: currentLangContent.modals.sansSerifFont,
                serifFont: currentLangContent.modals.serifFont,
                baseFontSize: currentLangContent.modals.baseFontSize,
            }}
        />
      )}
      {isEditing && editingItem?.type === 'hero' && <HeroEditModal heroData={editingItem.data} onSave={handleSaveHero} onClose={handleCloseModal} title={currentLangContent.modals.editHeroTitle} saveButtonText={currentLangContent.modals.saveChanges} />}
      {isEditing && editingItem?.type === 'project' && <ProjectEditModal project={editingItem.data} onSave={handleSaveProject} onClose={handleCloseModal} title={editingItem.data === 'new' ? currentLangContent.modals.addProjectTitle : currentLangContent.modals.editProjectTitle} saveButtonText={currentLangContent.modals.saveProject} urlLabelText={currentLangContent.modals.projectUrlLabel} imageResolutionWarningText={currentLangContent.modals.imageResolutionWarning} />}
      {isEditing && editingItem?.type === 'experience' && <ExperienceEditModal experience={editingItem.data} onSave={handleSaveExperience} onClose={handleCloseModal} title={editingItem.data === 'new' ? currentLangContent.modals.addExperienceTitle : currentLangContent.modals.editExperienceTitle} saveButtonText={currentLangContent.modals.saveExperience} labels={{url: currentLangContent.modals.experienceUrlLabel, periodSettings: currentLangContent.modals.periodSettingsLabel, startDate: currentLangContent.modals.startDateLabel, endDate: currentLangContent.modals.endDateLabel, currentRole: currentLangContent.modals.currentRoleCheckbox, periodPreview: currentLangContent.modals.periodPreviewLabel}} />}
      {isEditing && editingItem?.type === 'skill' && <SkillCategoryEditModal skillCategory={editingItem.data} onSave={handleSaveSkillCategory} onClose={handleCloseModal} title={editingItem.data === 'new' ? currentLangContent.modals.addSkillCategoryTitle : currentLangContent.modals.editSkillCategoryTitle} saveButtonText={currentLangContent.modals.saveSkillCategory} />}
      {isEditing && editingItem?.type === 'contact' && <ContactEditModal contactData={editingItem.data} onSave={handleSaveContact} onClose={handleCloseModal} title={currentLangContent.modals.editContactTitle} saveButtonText={currentLangContent.modals.saveContact} />}

    </div>
  );
};

export default App;