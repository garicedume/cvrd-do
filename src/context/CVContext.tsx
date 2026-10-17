'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  CVData, Experience, Education, Skill, Language, 
  Certification, Reference 
} from '../types/cv';
import { INITIAL_CV_DATA } from '../types/cv'; // O ajusta si viene de templateRegistry

interface CVContextType {
  cvData: CVData;
  activeTemplateId: string;
  setActiveTemplateId: (id: string) => void;
  updateCVData: (newData: Partial<CVData>) => void;
  updatePersonal: (personal: Partial<CVData['personal']>) => void;
  
  handlePhotoUpload: (file: File) => { success: boolean; error?: string };
  removePhoto: () => void;

  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  addSkill: (type: 'técnica' | 'blanda') => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, lang: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  addReference: () => void;
  updateReference: (id: string, ref: Partial<Reference>) => void;
  removeReference: (id: string) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [activeTemplateId, setActiveTemplateId] = useState<string>('TemplateLaura');

  const updateCVData = (newData: Partial<CVData>) => {
    setCvData((prev) => ({ ...prev, ...newData }));
  };

  const updatePersonal = (personal: Partial<CVData['personal']>) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...personal },
    }));
  };

  const handlePhotoUpload = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return { success: false, error: 'Formato no permitido. Utiliza JPG, PNG, WEBP o GIF.' };
    }
    if (file.size > 2 * 1024 * 1024) {
      return { success: false, error: 'La imagen supera el límite de 2MB.' };
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const photoUrl = e.target?.result as string;
      setCvData((prev) => ({
        ...prev,
        personal: { ...prev.personal, showPhoto: true, photoUrl },
      }));
    };
    reader.readAsDataURL(file);
    return { success: true };
  };

  const removePhoto = () => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, showPhoto: false, photoUrl: '' },
    }));
  };

  // Experiencia
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setCvData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...exp } : item)),
    }));
  };

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  // Educación
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
    };
    setCvData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...edu } : item)),
    }));
  };

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // Habilidades
  const addSkill = (type: 'técnica' | 'blanda') => {
    const newSkill: Skill = { id: Date.now().toString(), name: '', type };
    setCvData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, ...skill } : item)),
    }));
  };

  const removeSkill = (id: string) => {
    setCvData((prev) => ({ ...prev, skills: prev.skills.filter((item) => item.id !== id) }));
  };

  // Idiomas
  const addLanguage = () => {
    const newLang: Language = { id: Date.now().toString(), name: '', level: 'Intermedio' };
    setCvData((prev) => ({ ...prev, languages: [...prev.languages, newLang] }));
  };

  const updateLanguage = (id: string, lang: Partial<Language>) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((item) => (item.id === id ? { ...item, ...lang } : item)),
    }));
  };

  const removeLanguage = (id: string) => {
    setCvData((prev) => ({ ...prev, languages: prev.languages.filter((item) => item.id !== id) }));
  };

  // Certificaciones (Si aplica en tu tipo CVData)
 const addCertification = () => {
    const newCert: Certification = { 
      id: Date.now().toString(), 
      name: '', 
      issuer: '', // <-- Analizando el error, el tipo Certification usa 'issuer' en lugar de 'institution'
      date: '' 
    };
    setCvData((prev) => ({ 
      ...prev, 
      certifications: [...(prev.certifications || []), newCert] 
    }));
  };

  const updateCertification = (id: string, cert: Partial<Certification>) => {
    setCvData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).map((item) => (item.id === id ? { ...item, ...cert } : item)),
    }));
  };

  const removeCertification = (id: string) => {
    setCvData((prev) => ({ 
      ...prev, 
      certifications: (prev.certifications || []).filter((item) => item.id !== id) 
    }));
  };

  // Referencias
  const addReference = () => {
    const newRef: Reference = { id: Date.now().toString(), name: '', company: '', position: '', phone: '', email: '' };
    setCvData((prev) => ({ ...prev, references: [...prev.references, newRef] }));
  };

  const updateReference = (id: string, ref: Partial<Reference>) => {
    setCvData((prev) => ({
      ...prev,
      references: prev.references.map((item) => (item.id === id ? { ...item, ...ref } : item)),
    }));
  };

  const removeReference = (id: string) => {
    setCvData((prev) => ({ ...prev, references: prev.references.filter((item) => item.id !== id) }));
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        activeTemplateId,
        setActiveTemplateId,
        updateCVData,
        updatePersonal,
        handlePhotoUpload,
        removePhoto,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addCertification,
        updateCertification,
        removeCertification,
        addReference,
        updateReference,
        removeReference,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useCV debe ser utilizado dentro de un CVProvider');
  return context;
};