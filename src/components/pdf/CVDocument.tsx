import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 32,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 16,
    marginBottom: 16,
  },
  headerInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
    fontSize: 9,
    color: '#6B7280',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    objectFit: 'cover',
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 3,
    marginBottom: 5,
  },
  text: {
    fontSize: 9,
    color: '#374151',
    lineLineHeight: 1.3,
  },
  rowItem: {
    marginBottom: 6,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 9,
    color: '#4B5563',
  },
  itemDate: {
    fontSize: 8,
    color: '#6B7280',
  },
});

interface CVDocumentProps {
  data: CVData;
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data }) => {
  const { personal, profile, experience, education, skills, languages } = data;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{personal.fullName || 'Nombre Apellido'}</Text>
            <Text style={styles.title}>{personal.title || 'Título Profesional'}</Text>
            
            <View style={styles.contactRow}>
              {personal.email && <Text>{personal.email}</Text>}
              {personal.phone && <Text>{personal.phone}</Text>}
              {personal.location && <Text>{personal.location}</Text>}
            </View>
          </View>

          {personal.showPhoto && personal.photoUrl && (
            <Image src={personal.photoUrl} style={styles.avatar} />
          )}
        </View>

        {/* PERFIL */}
        {profile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <Text style={styles.text}>{profile}</Text>
          </View>
        )}

        {/* EXPERIENCIA */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
            {experience.map((exp, idx) => (
              <View key={idx} style={styles.rowItem}>
                <View style={styles.rowHeader}>
                  <Text style={styles.itemTitle}>{exp.role} — {exp.company}</Text>
                  <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                {exp.description && <Text style={styles.text}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* EDUCACIÓN */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educación</Text>
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

        {/* HABILIDADES */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <Text style={styles.text}>
              {skills.map((s) => s.name).join(' • ')}
            </Text>
          </View>
        )}

        {/* IDIOMAS */}
        {languages && languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Idiomas</Text>
            <Text style={styles.text}>
              {languages.map((l) => `${l.name} (${l.level})`).join(' • ')}
            </Text>
          </View>
        )}

      </Page>
    </Document>
  );
};