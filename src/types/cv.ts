export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  secondaryPhone?: string;
  location: string;
  locationLine2?: string;
  photoUrl: string;
  photoShape: 'circle' | 'square' | 'rounded';
  showPhoto: boolean;
}

export interface ExtrasInfo {
  linkedin?: string;
  portfolio?: string;
  customLinks?: Array<{
    label: string;
    url: string;
    urlLine2?: string;
  }>;
}

export interface CVData {
  personal: PersonalInfo;
  profile: string;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    type: 'técnica' | 'blanda';
  }>;
  languages: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  references: Array<{
    id: string;
    name: string;
    company: string;
    position: string;
    phone: string;
    email: string;
  }>;
  extras: ExtrasInfo;
  styles: {
    fontFamily: string;
    accentColor: string;
  };
}

export const INITIAL_CV_DATA: CVData = {
  personal: {
    fullName: 'Carlos Mendoza',
    title: 'Ingeniero de Sistemas',
    email: 'carlos.mendoza@email.com',
    secondaryEmail: '',
    phone: '+1 (809) 555-0192',
    secondaryPhone: '',
    location: 'Santo Domingo, R.D.',
    locationLine2: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    photoShape: 'circle',
    showPhoto: true,
  },
  profile: 'Ingeniero de Sistemas con más de 6 años de experiencia liderando proyectos de transformación digital y desarrollo de software escalable en el sector corporativo de República Dominicana.',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  references: [],
  extras: {
    linkedin: '',
    portfolio: '',
    customLinks: []
  },
  styles: {
    fontFamily: 'Poppins',
    accentColor: '#111827',
  },
};