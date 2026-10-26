import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 36,
    fontFamily: 'Helvetica',
  },
  // Encabezado Clásico / Universal
  headerClassic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 14,
    marginBottom: 14,
  },
  headerInfo: {
    flexDirection: 'column',
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 3,
    fontWeight: 'semibold',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    objectFit: 'cover',
  },
  // Contenedores de dos columnas / Sidebar
  sidebarContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '32%',
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    flexDirection: 'column',
  },
  mainContent: {
    width: '68%',
    paddingLeft: 12,
    flexDirection: 'column',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 2,
    marginBottom: 5,
  },
  text: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.35,
  },
  rowItem: {
    marginBottom: 6,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  itemTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  itemSubtitle: {
    fontSize: 8.5,
    fontWeight: 'semibold',
    color: '#4B5563',
    marginBottom: 1,
  },
  itemDate: {
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'right',
  },
  sidebarBlock: {
    marginBottom: 8,
  },
  sidebarText: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 2.5,
  },
});

interface CVDocumentProps {
  data: CVData;
  templateKey?: string;
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data, templateKey = 'templateBasico01' }) => {
  const { personal, profile, experience, education, skills, languages, references, extras, styles: cvStyles } = data;
  const accentColor = cvStyles?.accentColor || '#111827';

  // Detección inteligente de la familia de plantillas (Barra lateral vs Clásica)
  const isSidebarLayout = 
    templateKey === 'templateBasico10' ||
    templateKey.includes('Laura') || 
    templateKey.includes('sidebar') || 
    templateKey.includes('CorporateArchTemplate') || 
    templateKey.includes('ExecutiveGoldTemplate') ||
    templateKey.includes('TemplateMasterApexExecutive');

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        
        {/* ENCABEZADO */}
        <View style={[styles.headerClassic, { borderBottomColor: accentColor }]}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{personal.fullName || 'Nombre Apellido'}</Text>
            <Text style={styles.title}>{personal.title || 'Título Profesional'}</Text>
            
            {!isSidebarLayout && (
              <View style={styles.contactRow}>
                {personal.email && <Text style={styles.contactItem}>✉ {personal.email}</Text>}
                {personal.phone && <Text style={styles.contactItem}>📞 {personal.phone}</Text>}
                {personal.location && <Text style={styles.contactItem}>📍 {personal.location}</Text>}
              </View>
            )}
          </View>

          {personal.showPhoto && personal.photoUrl && (
            <Image src={personal.photoUrl} style={styles.avatar} />
          )}
        </View>

        {/* DISTRIBUCIÓN SEGÚN EL TIPO DE PLANTILLA */}
        {isSidebarLayout ? (
          /* DISEÑO CON BARRA LATERAL (Ej: TemplateLaura / templateBasico10) */
          <View style={styles.sidebarContainer}>
            <View style={styles.sidebar}>
              <View style={styles.sidebarBlock}>
                <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Contacto</Text>
                {personal.email && <Text style={styles.sidebarText}>✉ {personal.email}</Text>}
                {personal.secondaryEmail && <Text style={styles.sidebarText}>✉ {personal.secondaryEmail}</Text>}
                {personal.phone && <Text style={styles.sidebarText}>📞 {personal.phone}</Text>}
                {personal.secondaryPhone && <Text style={styles.sidebarText}>📞 {personal.secondaryPhone}</Text>}
                {personal.location && <Text style={styles.sidebarText}>📍 {personal.location}</Text>}
                {personal.locationLine2 && <Text style={styles.sidebarText}>{personal.locationLine2}</Text>}
                
                {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.map((link: any, idx: number) => (
                  <Text key={idx} style={styles.sidebarText}>🔗 {link.label}: {link.url}</Text>
                ))}
              </View>

              {skills && skills.length > 0 && (
                <View style={styles.sidebarBlock}>
                  <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Habilidades</Text>
                  {skills.map((s) => (
                    <Text key={s.id} style={styles.sidebarText}>• {s.name}</Text>
                  ))}
                </View>
              )}

              {languages && languages.length > 0 && (
                <View style={styles.sidebarBlock}>
                  <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Idiomas</Text>
                  {languages.map((l) => (
                    <Text key={l.id} style={styles.sidebarText}>{l.name} ({l.level})</Text>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.mainContent}>
              {profile && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Perfil Profesional</Text>
                  <Text style={styles.text}>{profile}</Text>
                </View>
              )}

              {experience && experience.length > 0 && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Experiencia Laboral</Text>
                  {experience.map((exp, idx) => (
                    <View key={idx} style={styles.rowItem}>
                      <View style={styles.rowHeader}>
                        <Text style={styles.itemTitle}>{exp.role}</Text>
                        <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
                      </View>
                      <Text style={[styles.itemSubtitle, { color: accentColor }]}>{exp.company}</Text>
                      {exp.description && <Text style={styles.text}>{exp.description}</Text>}
                    </View>
                  ))}
                </View>
              )}

              {education && education.length > 0 && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Educación</Text>
                  {education.map((edu, idx) => (
                    <View key={idx} style={styles.rowItem}>
                      <View style={styles.rowHeader}>
                        <Text style={styles.itemTitle}>{edu.degree}</Text>
                        <Text style={styles.itemDate}>{edu.startDate} - {edu.endDate}</Text>
                      </View>
                      <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ) : (
          /* DISEÑO CLÁSICO / UNA COLUMNA */
          <View>
            {profile && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Perfil Profesional</Text>
                <Text style={styles.text}>{profile}</Text>
              </View>
            )}

            {experience && experience.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Experiencia Laboral</Text>
                {experience.map((exp, idx) => (
                  <View key={idx} style={styles.rowItem}>
                    <View style={styles.rowHeader}>
                      <Text style={styles.itemTitle}>{exp.role} — <Text style={{ color: accentColor }}>{exp.company}</Text></Text>
                      <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
                    </View>
                    {exp.description && <Text style={styles.text}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {education && education.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Educación</Text>
                {education.map((edu, idx) => (
                  <View key={idx} style={styles.rowItem}>
                    <View style={styles.rowHeader}>
                      <Text style={styles.itemTitle}>{edu.degree}</Text>
                      <Text style={styles.itemDate}>{edu.startDate} - {edu.endDate}</Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  </View>
                ))}
              </View>
            )}

            {skills && skills.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Habilidades</Text>
                <Text style={styles.text}>
                  {skills.map((s) => s.name).join(' • ')}
                </Text>
              </View>
            )}

            {languages && languages.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: accentColor }]}>Idiomas</Text>
                <Text style={styles.text}>
                  {languages.map((l) => `${l.name} (${l.level})`).join(' • ')}
                </Text>
              </View>
            )}
          </View>
        )}

      </Page>
    </Document>
  );
};