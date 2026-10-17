import React from 'react';
import { CVData } from '../types/cv';

// --- IMPORTACIONES DE CARPETA BÁSICOS ---
import TemplateLaura from '../components/templates/basicos/TemplateLaura';
import TemplateAcademicResearch from '../components/templates/basicos/TemplateAcademicResearch';
import TemplateAtsClassic from '../components/templates/basicos/TemplateAtsClassic';
import TemplateAtsMinimal from '../components/templates/basicos/TemplateAtsMinimal';
import TemplateCharcoalCompact from '../components/templates/basicos/TemplateCharcoalCompact';
import TemplateCommercialSales from '../components/templates/basicos/TemplateCommercialSales';
import TemplateCorporateStandard from '../components/templates/basicos/TemplateCorporateStandard';
import TemplateCustomerCare from '../components/templates/basicos/TemplateCustomerCare';
import EmeraldCleanTemplate from '../components/templates/basicos/EmeraldCleanTemplate';
import TemplateExecutiveClean from '../components/templates/basicos/TemplateExecutiveClean';
import TemplateFinanceStrict from '../components/templates/basicos/TemplateFinanceStrict';
import TemplateLegalStructural from '../components/templates/basicos/TemplateLegalStructural';
import TemplateMinimalistLine from '../components/templates/basicos/TemplateMinimalistLine';
import TemplateModernGrid from '../components/templates/basicos/TemplateModernGrid';
import TemplateMultisectorBase from '../components/templates/basicos/TemplateMultisectorBase';
import TemplateOperationalPro from '../components/templates/basicos/TemplateOperationalPro';
import TemplateTechFocused from '../components/templates/basicos/TemplateTechFocused';

// --- IMPORTACIONES DE CARPETA MASTER ---
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

// --- IMPORTACIONES DE CARPETA PREMIUM ---
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
  ],
  education: [
    {
      id: 'edu1',
      institution: 'INTEC',
      degree: 'Ingeniería en Sistemas Computacionales',
      startDate: '2015',
      endDate: '2019',
    },
  ],
  skills: [
    { id: 's1', name: 'TypeScript / React', level: 'Experto' },
    { id: 's2', name: 'Next.js & Tailwind CSS', level: 'Experto' },
  ],
  languages: [
    { id: 'l1', name: 'Español', level: 'Nativo' },
  ],
  references: [],
  extras: {
    linkedin: 'linkedin.com/in/carlosmendozard',
  },
  styles: {
    fontFamily: 'Poppins, sans-serif',
    accentColor: '#111827',
  },
} as unknown as CVData;

// --- DICCIONARIO DE MAPEO COMPLETO Y SINCRONIZADO ---
export const TEMPLATE_COMPONENTS: Record<string, React.FC<{ data: CVData }>> = {
  // 1. Básicos
  TemplateAcademicResearch: TemplateAcademicResearch as React.FC<{ data: CVData }>,
  TemplateAtsClassic: TemplateAtsClassic as React.FC<{ data: CVData }>,
  TemplateAtsMinimal: TemplateAtsMinimal as React.FC<{ data: CVData }>,
  TemplateCharcoalCompact: TemplateCharcoalCompact as React.FC<{ data: CVData }>,
  TemplateCommercialSales: TemplateCommercialSales as React.FC<{ data: CVData }>,
  TemplateCustomerCare: TemplateCustomerCare as React.FC<{ data: CVData }>,
  EmeraldCleanTemplate: EmeraldCleanTemplate as React.FC<{ data: CVData }>,
  TemplateMultisectorBase: TemplateMultisectorBase as React.FC<{ data: CVData }>,
  TemplateLegalStructural: TemplateLegalStructural as React.FC<{ data: CVData }>,
  TemplateOperationalPro: TemplateOperationalPro as React.FC<{ data: CVData }>,
  TemplateExecutiveClean: TemplateExecutiveClean as React.FC<{ data: CVData }>,
  TemplateCorporateStandard: TemplateCorporateStandard as React.FC<{ data: CVData }>,
  TemplateMinimalistLine: TemplateMinimalistLine as React.FC<{ data: CVData }>,
  TemplateTechFocused: TemplateTechFocused as React.FC<{ data: CVData }>,

  // 2. Premium
  TemplateBrandDesigner: TemplateBrandDesigner as React.FC<{ data: CVData }>,
  TemplateDataScienceElite: TemplateDataScienceElite as React.FC<{ data: CVData }>,
  TemplateExecutiveLeadership: TemplateExecutiveLeadership as React.FC<{ data: CVData }>,
  TemplateFullStackArchitect: TemplateFullStackArchitect as React.FC<{ data: CVData }>,
  TemplateCreativeDirector: TemplateCreativeDirector as React.FC<{ data: CVData }>,
  TemplateTechLeadPro: TemplateTechLeadPro as React.FC<{ data: CVData }>,
  TemplateProductManager: TemplateProductManager as React.FC<{ data: CVData }>,
  TemplateConsultingSenior: TemplateConsultingSenior as React.FC<{ data: CVData }>,
  TemplateOperationsDirector: TemplateOperationsDirector as React.FC<{ data: CVData }>,
  TemplateMarketingGrowth: TemplateMarketingGrowth as React.FC<{ data: CVData }>,

  // 3. Master (Incluyendo las 15 plantillas completas)
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

  // 4. Extras / Adicionales
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