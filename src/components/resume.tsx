import dayjs from 'dayjs'
import { Page, Text, Document, StyleSheet, View, Font, PDFViewer } from '@react-pdf/renderer'

import type { UserInformation } from '@/schema'

// Create Document Component
export const Resume = ({ data }: { data: UserInformation | null }) => {
  return (
    <PDFViewer className='w-full h-full rounded-md border'>
      <Document>
        <Page style={styles.body}>
          <View style={{ width: '70%', marginRight: 40 }}>
            <View style={{ marginBottom: 20, height: 50 }}>
              <Text style={{ fontSize: 32, marginBottom: 4, fontWeight: 'semibold' }}>{data?.fullName}</Text>
              <Text style={{ color: GRAY, fontWeight: 'semibold' }}>{data?.jobTitle}</Text>
            </View>
            {!!data?.experience.length && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: BLUE, fontWeight: 'bold', marginBottom: 8 }}>EXPERIENCE</Text>
                {data?.experience.map((exp, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <View
                      style={{
                        marginBottom: 4,
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{exp.company}</Text>
                      <Text style={{ fontSize: 12 }}>
                        , {exp.position} — {exp.location}
                      </Text>
                    </View>
                    <Text style={{ color: GRAY, marginBottom: 4 }}>
                      {dayjs(exp.startDate).format('DD MMMM YYYY')} - {dayjs(exp.endDate).format('DD MMMM YYYY')}
                    </Text>
                    <Text style={{ color: GRAY, lineHeight: 1.5 }}>{exp.description}</Text>
                  </View>
                ))}
              </View>
            )}
            {!!data?.education?.length && (
              <View style={{ marginBottom: data.education.length ? 16 : 0 }}>
                <Text style={{ color: BLUE, fontWeight: 'bold', marginBottom: 8 }}>EDUCATION</Text>
                {data.education.map((edu, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <View
                      style={{
                        marginBottom: 4,
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{edu.school}</Text>
                      <Text style={{ fontSize: 12 }}>
                        , {edu.location} — {edu.major}
                      </Text>
                    </View>
                    <Text style={{ color: GRAY, marginBottom: 4 }}>
                      Graduated at {dayjs(edu.graduationDate).format('DD MMMM YYYY')} with {edu.GPA} GPA
                    </Text>
                    <Text style={{ color: GRAY, lineHeight: 1.5 }}>{edu.description}</Text>
                  </View>
                ))}
              </View>
            )}
            {!!data?.certifications?.length && (
              <View>
                <Text style={{ color: BLUE, fontWeight: 'bold', marginBottom: 8 }}>CERTIFICATIONS</Text>
                {data?.certifications?.map((cert, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <View
                      style={{
                        marginBottom: 4,
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{cert.name}</Text>
                    </View>
                    <Text style={{ color: GRAY, lineHeight: 1.5 }}>{cert.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={{ width: '30%' }}>
            <View style={{ marginBottom: 20, height: 50 }}>
              <Text style={{ color: GRAY }}>{data?.address}</Text>
              <Text style={{ color: GRAY }}>{data?.phone}</Text>
              <Text style={{ color: GRAY }}>{data?.email}</Text>
            </View>
            {!!data?.skills?.length && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: BLUE, fontWeight: 'bold', marginBottom: 8 }}>SKILLS</Text>
                {data.skills.map((skills, index) => (
                  <Text key={index} style={{ color: GRAY, marginBottom: 4 }}>
                    {skills.name}
                  </Text>
                ))}
              </View>
            )}
            {!!data?.languages?.length && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: BLUE, fontWeight: 'bold', marginBottom: 8 }}>LANGUAGES</Text>
                {data.languages.map((lang, index) => (
                  <Text key={index} style={{ color: GRAY, marginBottom: 4 }}>
                    {lang.name} ({lang.proficiency})
                  </Text>
                ))}
              </View>
            )}
            {!!data?.interests?.length && (
              <View>
                <Text style={{ color: BLUE, fontWeight: 'bold', marginBottom: 8 }}>INTERESTS</Text>
                {data.interests.map((int, index) => (
                  <Text key={index} style={{ color: GRAY, marginBottom: 4 }}>
                    {int.name}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

const GRAY = '#666666'
const BLUE = '#1F79C7'

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 25,
    paddingBottom: 55,
    paddingHorizontal: 25,
    fontSize: 9,
    fontFamily: 'Open Sans',
    fontWeight: 500
  }
})

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: '/fonts/OpenSans-Regular.ttf',
      fontWeight: 400,
      fontStyle: 'normal'
    },
    {
      src: '/fonts/OpenSans-Italic.ttf',
      fontWeight: 400,
      fontStyle: 'italic'
    },
    {
      src: '/fonts/OpenSans-Bold.ttf',
      fontWeight: 700,
      fontStyle: 'normal'
    },
    {
      src: '/fonts/OpenSans-BoldItalic.ttf',
      fontWeight: 700,
      fontStyle: 'italic'
    },
    {
      src: '/fonts/OpenSans-Light.ttf',
      fontWeight: 300,
      fontStyle: 'normal'
    },
    {
      src: '/fonts/OpenSans-LightItalic.ttf',
      fontWeight: 300,
      fontStyle: 'italic'
    },
    {
      src: '/fonts/OpenSans-Medium.ttf',
      fontWeight: 500,
      fontStyle: 'normal'
    },
    {
      src: '/fonts/OpenSans-MediumItalic.ttf',
      fontWeight: 500,
      fontStyle: 'italic'
    },
    {
      src: '/fonts/OpenSans-SemiBold.ttf',
      fontWeight: 600,
      fontStyle: 'normal'
    },
    {
      src: '/fonts/OpenSans-SemiBoldItalic.ttf',
      fontWeight: 600,
      fontStyle: 'italic'
    },
    {
      src: '/fonts/OpenSans-ExtraBold.ttf',
      fontWeight: 800,
      fontStyle: 'normal'
    },
    {
      src: '/fonts/OpenSans-ExtraBoldItalic.ttf',
      fontWeight: 800,
      fontStyle: 'italic'
    }
  ]
})
