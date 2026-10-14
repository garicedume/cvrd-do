import React from 'react';
import { CVData } from '../types/cv';
import TemplateLaura from '../components/templates/basicos/TemplateLaura';

export const SAMPLE_CV_DATA: CVData = {
  personal: {
    fullName: 'Carlos Mendoza',
    title: 'Ingeniero de Sistemas',
    email: 'carlos.mendoza@email.com',
    phone: '+1 (809) 555-0192',
    location: 'Santo Domingo, Rep. Dominicana',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    photoShape: 'circle',
    showPhoto: true,
  },
  profile: 'Ingeniero de Sistemas con más de 6 años de experiencia liderando proyectos de transformación digital y desarrollo de software escalable en el sector corporativo de República Dominicana.',
  experience: [
    {
      id: 'exp1',
      company: 'TechCorp Dominicana',
      role: 'Senior Software Engineer & Tech Lead',
      startDate: '2022',
      endDate: 'Presente',
      description: '• Liderazgo técnico de un equipo de 8 desarrolladores.\n• Optimización de arquitectura reduciendo tiempos de respuesta un 40%.\n• Implementación de procesos automatizados de despliegue cloud.',
    },
    {
      id: 'exp2',
      company: 'Grupo Empresarial Caribe',
      role: 'Desarrollador Full Stack',
      startDate: '2019',
      endDate: '2022',
      description: '• Integración de pasarelas de pago e interfaces web responsivas.\n• Mejora del rendimiento web incrementando la tasa de conversión.',
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'INTEC',
      degree: 'Ingeniería en Sistemas Computacionales',
      startDate: '2015',
      endDate: '2019',
    },
    {
      id: 'edu2',
      institution: 'PUCMM',
      degree: 'Maestría en Gestión de TI',
      startDate: '2020',
      endDate: '2022',
    },
  ],
  skills: [
    { id: 's1', name: 'TypeScript / React', level: 'Experto' },
    { id: 's2', name: 'Next.js & Tailwind CSS', level: 'Experto' },
    { id: 's3', name: 'Arquitectura Cloud & AWS', level: 'Avanzado' },
    { id: 's4', name: 'Gestión de Proyectos', level: 'Avanzado' },
  ],
  languages: [
    { id: 'l1', name: 'Español', level: 'Nativo' },
    { id: 'l2', name: 'Inglés', level: 'Avanzado' },
  ],
  references: [
    {
      id: 'r1',
      name: 'Lic. Roberto Gómez',
      position: 'Director de Tecnología',
      company: 'TechCorp RD',
      phone: '+1 (809) 555-9988',
    },
    {
      id: 'r2',
      name: 'Ing. Laura Fernández',
      position: 'Gerente de Operaciones',
      company: 'Grupo Caribe',
      phone: '+1 (809) 555-3344',
    },
  ],
  extras: {
    linkedin: 'linkedin.com/in/carlosmendozard',
    portfolio: 'carlosmendoza.dev',
  },
  styles: {
    fontFamily: 'Poppins, sans-serif',
    accentColor: '#111827',
  },
} as any;

// Registro unificado de componentes de plantillas para el catálogo y constructor
export const TEMPLATE_COMPONENTS: Record<string, React.FC<{ data: CVData }>> = {
  // Básicos
  TemplateLaura: TemplateLaura as React.FC<{ data: CVData }>,
  AcademicResearchTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  ATSDirectClassicTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  ATSMinimalTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  CharcoalCompactTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  CommercialSalesTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  CustomerCareTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  EmeraldCleanTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  HospitalityTourismTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  LegalCounselTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  LogisticsProTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  MedicalHealthTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  NavyCorporateTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  OperationsLeadTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  SlateModernTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  TechDeveloperTemplate: TemplateLaura as React.FC<{ data: CVData }>,

  // Premium
  CorporateArchTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  DarkMonolithTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  ExecutiveGoldTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  FintechAnalyticsTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  MinimalLuxeTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  NordicMinimalTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  PortfolioShowcaseTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  SeniorConsultantTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  StrategicDirectorTemplate: TemplateLaura as React.FC<{ data: CVData }>,
  StudioHorizonTemplate: TemplateLaura as React.FC<{ data: CVData }>,

  // Master (15 plantillas)
  TemplateMasterApexExecutive: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterSiliconValley: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterGlobalDirector: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterCreativeVision: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterVentureCapital: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterQuantumData: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterCsuiteSignature: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterEliteArchitect: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterChiefInnovator: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterMasterpiecePrint: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterPrestigeBoutique: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterEnterpriseLead: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterVisionaryImpact: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterPinnacleGrid: TemplateLaura as React.FC<{ data: CVData }>,
  TemplateMasterLegacyExecutive: TemplateLaura as React.FC<{ data: CVData }>,

  // Extras
  ExtraStandard01: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard02: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard03: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard04: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard05: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard06: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard07: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard08: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard09: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraStandard10: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraPremium01: TemplateLaura as React.FC<{ data: CVData }>,
  ExtraPremium02: TemplateLaura as React.FC<{ data: CVData }>,
};