import React from 'react';
import { CVData } from '../types/cv';

// --- 1. IMPORTACIONES DE CARPETA BÁSICOS (01 al 25) ---
import templateBasico01 from '../components/templates/basicos/templateBasico01';
import templateBasico02 from '../components/templates/basicos/templateBasico02';
import templateBasico03 from '../components/templates/basicos/templateBasico03';
import templateBasico04 from '../components/templates/basicos/templateBasico04';
import templateBasico05 from '../components/templates/basicos/templateBasico05';
import templateBasico06 from '../components/templates/basicos/templateBasico06';
import templateBasico07 from '../components/templates/basicos/templateBasico07';
import templateBasico08 from '../components/templates/basicos/templateBasico08';
import templateBasico09 from '../components/templates/basicos/templateBasico09';
import templateBasico10 from '../components/templates/basicos/templateBasico10';
import templateBasico11 from '../components/templates/basicos/templateBasico11';
import templateBasico12 from '../components/templates/basicos/templateBasico12';
import templateBasico13 from '../components/templates/basicos/templateBasico13';
import templateBasico14 from '../components/templates/basicos/templateBasico14';
import templateBasico15 from '../components/templates/basicos/templateBasico15';
import templateBasico16 from '../components/templates/basicos/templateBasico16';
import templateBasico17 from '../components/templates/basicos/templateBasico17';
import templateBasico18 from '../components/templates/basicos/templateBasico18';
import templateBasico19 from '../components/templates/basicos/templateBasico19';
import templateBasico20 from '../components/templates/basicos/templateBasico20';
import templateBasico21 from '../components/templates/basicos/templateBasico21';
import templateBasico22 from '../components/templates/basicos/templateBasico22';
import templateBasico23 from '../components/templates/basicos/templateBasico23';
import templateBasico24 from '../components/templates/basicos/templateBasico24';
import templateBasico25 from '../components/templates/basicos/templateBasico25';

// --- 2. IMPORTACIONES DE CARPETA PREMIUM ---
import TemplateBrandDesigner from '../components/templates/premium/TemplateBrandDesigner';
import TemplateConsultingSenior from '../components/templates/premium/TemplateConsultingSenior';
import TemplateCreativeDirector from '../components/templates/premium/TemplateCreativeDirector';
import TemplateDataScienceElite from '../components/templates/premium/TemplateDataScienceElite';
import TemplateExecutiveLeadership from '../components/templates/premium/TemplateExecutiveLeadership';
import TemplateFullStackArchitect from '../components/templates/premium/TemplateFullStackArchitect';
import TemplateMarketingGrowth from '../components/templates/premium/TemplateMarketingGrowth';
import TemplateOperationsDirector from '../components/templates/premium/TemplateOperationsDirector';
import TemplateProductManager from '../components/templates/premium/TemplateProductManager';
import TemplateTechLeadPro from '../components/templates/premium/TemplateTechLeadPro';

// --- 3. IMPORTACIONES DE CARPETA MASTER ---
import TemplateMasterApexExecutive from '../components/templates/master/TemplateMasterApexExecutive';
import TemplateMasterChiefInnovator from '../components/templates/master/TemplateMasterChiefInnovator';
import TemplateMasterCreativeVision from '../components/templates/master/TemplateMasterCreativeVision';
import TemplateMasterCsuiteSignature from '../components/templates/master/TemplateMasterCsuiteSignature';
import TemplateMasterEliteArchitect from '../components/templates/master/TemplateMasterEliteArchitect';
import TemplateMasterEnterpriseLead from '../components/templates/master/TemplateMasterEnterpriseLead';
import TemplateMasterGlobalDirector from '../components/templates/master/TemplateMasterGlobalDirector';
import TemplateMasterLegacyExecutive from '../components/templates/master/TemplateMasterLegacyExecutive';
import TemplateMasterMasterpiecePrint from '../components/templates/master/TemplateMasterMasterpiecePrint';
import TemplateMasterPinnacleGrid from '../components/templates/master/TemplateMasterPinnacleGrid';
import TemplateMasterPrestigeBoutique from '../components/templates/master/TemplateMasterPrestigeBoutique';
import TemplateMasterQuantumData from '../components/templates/master/TemplateMasterQuantumData';
import TemplateMasterSiliconValley from '../components/templates/master/TemplateMasterSiliconValley';
import TemplateMasterVentureCapital from '../components/templates/master/TemplateMasterVentureCapital';
import TemplateMasterVisionaryImpact from '../components/templates/master/TemplateMasterVisionaryImpact';

export const SAMPLE_CV_DATA: CVData = {
  personal: {
    fullName: 'Carlos Mendoza',
    title: 'Ingeniero de Sistemas y Arquitecto de Software',
    email: 'carlos.mendoza@email.com',
    secondaryEmail: 'carlos.mendoza.dev@gmail.com',
    phone: '+1 (809) 555-0192',
    secondaryPhone: '+1 (809) 555-9988',
    location: 'Santo Domingo, Rep. Dominicana',
    locationLine2: 'Distrito Nacional, Sector Piantini',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    photoShape: 'circle',
    showPhoto: true,
  },
  profile: 'Ingeniero de Sistemas con más de 6 años de experiencia liderando proyectos de transformación digital, desarrollo de software escalable y optimización de arquitectura en el sector corporativo de República Dominicana. Especialista en metodologías ágiles, gestión de equipos técnicos de alto rendimiento y despliegues en la nube.',
  experience: [
    {
      id: 'exp1',
      company: 'TechCorp Dominicana',
      role: 'Senior Software Engineer & Tech Lead',
      startDate: '2022',
      endDate: 'Presente',
      description: '• Liderazgo técnico de un equipo multidisciplinario de 8 desarrolladores.\n• Optimización de arquitectura backend reduciendo tiempos de respuesta un 40%.\n• Implementación de procesos automatizados de despliegue cloud en AWS y Vercel.',
    },
    {
      id: 'exp2',
      company: 'Soluciones Digitales del Caribe',
      role: 'Desarrollador Full Stack Senior',
      startDate: '2019',
      endDate: '2022',
      description: '• Desarrollo de aplicaciones web interactivas utilizando React, Next.js y Node.js.\n• Integración de pasarelas de pago locales e internacionales (Stripe, PayPal).\n• Reducción de incidencias de producción en un 25% mediante pruebas automatizadas.',
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'Instituto Tecnológico de Santo Domingo (INTEC)',
      degree: 'Maestría en Gestión de Tecnología de Información',
      startDate: '2020',
      endDate: '2022',
    },
    {
      id: 'edu2',
      institution: 'Pontificia Universidad Católica Madre y Maestra (PUCMM)',
      degree: 'Ingeniería en Sistemas y Computación',
      startDate: '2015',
      endDate: '2019',
    },
    {
      id: 'edu3',
      institution: 'Politécnico ITLA',
      degree: 'Certificación Avanzada en Redes y Bases de Datos',
      startDate: '2014',
      endDate: '2015',
    },
  ],
  skills: [
    { id: 's1', name: 'TypeScript / JavaScript', level: 'Experto', type: 'técnica' },
    { id: 's2', name: 'React.js & Next.js', level: 'Experto', type: 'técnica' },
    { id: 's3', name: 'Node.js & Express', level: 'Avanzado', type: 'técnica' },
    { id: 's4', name: 'Tailwind CSS & UI/UX', level: 'Avanzado', type: 'técnica' },
    { id: 's5', name: 'SQL & PostgreSQL', level: 'Avanzado', type: 'técnica' },
    { id: 's6', name: 'Git & GitHub Actions', level: 'Experto', type: 'técnica' },
    { id: 's7', name: 'Docker & Cloud Deployment', level: 'Intermedio', type: 'técnica' },
    { id: 's8', name: 'Liderazgo de Equipos', level: 'Experto', type: 'blanda' },
    { id: 's9', name: 'Resolución de Conflictos', level: 'Avanzado', type: 'blanda' },
  ],
  languages: [
    { id: 'l1', name: 'Español', level: 'Nativo' },
    { id: 'l2', name: 'Inglés', level: 'Profesional / B2' },
    { id: 'l3', name: 'Portugués', level: 'Intermedio / B1' },
  ],
  references: [
    {
      id: 'ref1',
      name: 'Lic. Roberto Almonte',
      company: 'TechCorp Dominicana',
      position: 'Director de Ingeniería',
      phone: '+1 (809) 555-7890',
      email: 'roberto.almonte@techcorp.do',
    },
    {
      id: 'ref2',
      name: 'Dra. Mariela Peguero',
      company: 'INTEC',
      position: 'Decana de la Facultad de Ingenierías',
      phone: '+1 (809) 555-4321',
      email: 'mariela.peguero@intec.edu.do',
    },
  ],
  extras: {
    linkedin: 'linkedin.com/in/carlosmendozard',
    customLinks: [
      { label: 'GitHub', url: 'github.com/carlosmendoza-dev', urlLine2: 'Repositorio personal' },
      { label: 'Portafolio Web', url: 'carlosmendoza.dev', urlLine2: 'Proyectos destacados' },
    ],
  },
  styles: {
    fontFamily: 'Poppins',
    accentColor: '#111827',
  },
} as any;

// --- DICCIONARIO DE MAPEO ---
export const TEMPLATE_COMPONENTS: Record<string, React.FC<{ data: CVData }>> = {
  // 1. Básicos (01 al 25)
  templateBasico01: templateBasico01 as React.FC<{ data: CVData }>,
  templateBasico02: templateBasico02 as React.FC<{ data: CVData }>,
  templateBasico03: templateBasico03 as React.FC<{ data: CVData }>,
  templateBasico04: templateBasico04 as React.FC<{ data: CVData }>,
  templateBasico05: templateBasico05 as React.FC<{ data: CVData }>,
  templateBasico06: templateBasico06 as React.FC<{ data: CVData }>,
  templateBasico07: templateBasico07 as React.FC<{ data: CVData }>,
  templateBasico08: templateBasico08 as React.FC<{ data: CVData }>,
  templateBasico09: templateBasico09 as React.FC<{ data: CVData }>,
  templateBasico10: templateBasico10 as React.FC<{ data: CVData }>,
  templateBasico11: templateBasico11 as React.FC<{ data: CVData }>,
  templateBasico12: templateBasico12 as React.FC<{ data: CVData }>,
  templateBasico13: templateBasico13 as React.FC<{ data: CVData }>,
  templateBasico14: templateBasico14 as React.FC<{ data: CVData }>,
  templateBasico15: templateBasico15 as React.FC<{ data: CVData }>,
  templateBasico16: templateBasico16 as React.FC<{ data: CVData }>,
  templateBasico17: templateBasico17 as React.FC<{ data: CVData }>,
  templateBasico18: templateBasico18 as React.FC<{ data: CVData }>,
  templateBasico19: templateBasico19 as React.FC<{ data: CVData }>,
  templateBasico20: templateBasico20 as React.FC<{ data: CVData }>,
  templateBasico21: templateBasico21 as React.FC<{ data: CVData }>,
  templateBasico22: templateBasico22 as React.FC<{ data: CVData }>,
  templateBasico23: templateBasico23 as React.FC<{ data: CVData }>,
  templateBasico24: templateBasico24 as React.FC<{ data: CVData }>,
  templateBasico25: templateBasico25 as React.FC<{ data: CVData }>,

  // 2. Premium
  CorporateArchTemplate: TemplateBrandDesigner as React.FC<{ data: CVData }>,
  DarkMonolithTemplate: TemplateConsultingSenior as React.FC<{ data: CVData }>,
  ExecutiveGoldTemplate: TemplateCreativeDirector as React.FC<{ data: CVData }>,
  FintechAnalyticsTemplate: TemplateDataScienceElite as React.FC<{ data: CVData }>,
  MinimalLuxeTemplate: TemplateExecutiveLeadership as React.FC<{ data: CVData }>,
  NordicMinimalTemplate: TemplateFullStackArchitect as React.FC<{ data: CVData }>,
  PortfolioShowcaseTemplate: TemplateMarketingGrowth as React.FC<{ data: CVData }>,
  SeniorConsultantTemplate: TemplateOperationsDirector as React.FC<{ data: CVData }>,
  StrategicDirectorTemplate: TemplateProductManager as React.FC<{ data: CVData }>,
  StudioHorizonTemplate: TemplateTechLeadPro as React.FC<{ data: CVData }>,

  // 3. Master
  TemplateMasterApexExecutive: TemplateMasterApexExecutive as React.FC<{ data: CVData }>,
  TemplateMasterSiliconValley: TemplateMasterSiliconValley as React.FC<{ data: CVData }>,
  TemplateMasterGlobalDirector: TemplateMasterGlobalDirector as React.FC<{ data: CVData }>,
  TemplateMasterCreativeVision: TemplateMasterCreativeVision as React.FC<{ data: CVData }>,
  TemplateMasterVentureCapital: TemplateMasterVentureCapital as React.FC<{ data: CVData }>,
  TemplateMasterQuantumData: TemplateMasterQuantumData as React.FC<{ data: CVData }>,
  TemplateMasterCsuiteSignature: TemplateMasterCsuiteSignature as React.FC<{ data: CVData }>,
  TemplateMasterEliteArchitect: TemplateMasterEliteArchitect as React.FC<{ data: CVData }>,
  TemplateMasterChiefInnovator: TemplateMasterChiefInnovator as React.FC<{ data: CVData }>,
  TemplateMasterMasterpiecePrint: TemplateMasterMasterpiecePrint as React.FC<{ data: CVData }>,
  TemplateMasterPrestigeBoutique: TemplateMasterPrestigeBoutique as React.FC<{ data: CVData }>,
  TemplateMasterEnterpriseLead: TemplateMasterEnterpriseLead as React.FC<{ data: CVData }>,
  TemplateMasterVisionaryImpact: TemplateMasterVisionaryImpact as React.FC<{ data: CVData }>,
  TemplateMasterPinnacleGrid: TemplateMasterPinnacleGrid as React.FC<{ data: CVData }>,
  TemplateMasterLegacyExecutive: TemplateMasterLegacyExecutive as React.FC<{ data: CVData }>,
};