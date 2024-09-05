import OpenAI from 'openai'
import type { UserInformation } from '@/schema'

export async function generateCoverLetter(AIClient: OpenAI, data: UserInformation, jobDescription: string) {
  const askGPT = await AIClient.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content: `
        You are an expert career assistant specializing in crafting compelling cover letters. Your task is to write a professional, personalized cover letter for a job application based on the provided user information and job description. Follow these guidelines:

        1. Structure:
          - Opening paragraph: Introduce yourself and express enthusiasm for the specific role.
          - Body paragraphs (2-3): Highlight relevant skills, experiences, and qualifications.
          - Closing paragraph: Summarize interest, request an interview, and provide contact information.

        2. Content Focus:
          - Align the user's experience with the job requirements, using specific examples.
          - Emphasize achievements and quantifiable results where possible.
          - Demonstrate knowledge of the company and industry.

        3. Style and Tone:
          - Maintain a formal and professional tone throughout.
          - Use active voice and strong action verbs.
          - Tailor the language to match the company's culture and values.

        4. Customization:
          - Address the letter to a specific person if provided in the job description.
          - Reference any mutual connections or referrals if mentioned in the user information.
          - Incorporate keywords from the job description naturally.

        5. Format:
          - Keep the letter concise, ideally between 250-400 words.
          - Use standard business letter formatting.
          - Include the date, company address, and recipient's name/title if available.

        User Information:
        Name: ${data.fullName}
        Email: ${data.email}
        Phone: ${data.phone}
        Job Title: ${data.jobTitle}
        Address: ${data.address}
        Experience: ${data.experience
          .map(
            exp => `
          - Company: ${exp.company}
          - Location: ${exp.location}
          - Position: ${exp.position}
          - Dates: ${exp.startDate} to ${exp.endDate}
          - Description: ${exp.description}
        `
          )
          .join('')}
        Education: ${data?.education
          ?.map(
            edu => `
          - School: ${edu.school}
          - Location: ${edu.location}
          - Graduation Date: ${edu.graduationDate}
          - Major: ${edu.major}
          - GPA: ${edu.GPA}
        `
          )
          .join('')}
        Skills: ${data?.skills?.join(', ')}
        Languages: ${data?.languages
          ?.map(
            lang => `
          - Language: ${lang.name} (${lang.proficiency})
        `
          )
          .join('')}
        Interests: ${data?.interests?.join(', ')}
        Certifications: ${data?.certifications
          ?.map(
            cert => `
          - Name: ${cert.name}
          - Description: ${cert.description}
        `
          )
          .join('')}

        Ensure the cover letter emphasizes the connection between the user's experience and the specific job requirements. Avoid generic statements and focus on creating a compelling narrative that showcases the user's unique value proposition for this particular role and company.`
      },
      {
        role: 'user',
        content: jobDescription
      }
    ],
    temperature: 0.7
  })

  return askGPT.choices[0].message.content as string
}

export async function generateUserInformation(AIClient: OpenAI, data: UserInformation, jobDescription: string) {
  const askGPT = await AIClient.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content: `
        Your task is to enhance the user's resume information based on the provided job description. Follow these guidelines:

        1. Modify Experience Descriptions:
          - Align existing experience entries with job requirements
          - Emphasize relevant skills and achievements
          - Use action verbs and quantify accomplishments where possible
          - Maintain all existing experience entries

        2. Enhance Skills and Interests:
        - Add relevant skills based on the job description
        - Include interests that align with the company culture or industry

        3. Optimize Education and Certifications:
        - Highlight relevant coursework or projects
        - Add any missing certifications that match job requirements

        4. Maintain Data Integrity:
        - Preserve the existing JSON structure
        - Do not remove any existing fields or experience entries
        - Only update content within existing fields and add new skills/interests as needed

        5. Input:
        - Current user information: ${JSON.stringify(data, null, 2)}
        - Job Description: ${jobDescription}

        6. Output Format:
        - Provide the updated user information in JSON format
        - Do not include any additional text or formatting outside the JSON structure because i will JSON.parse the response directly.

        7. Enhancement Guidelines:
        - Use industry-specific terminology from the job description
        - Tailor the language to reflect the company's tone and values
        - Ensure all added information is realistic and consistent with the user's background

        8. Example Output Structure:
        ${JSON.stringify(
          {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '555-1234',
            jobTitle: 'Software Engineer',
            address: '123 Main Street',
            experience: [
              {
                company: 'TechCorp',
                location: 'New York, NY',
                position: 'Backend Developer',
                startDate: '2019-01-01',
                endDate: '2021-01-01',
                description: 'Implemented scalable microservices architecture, resulting in 30% improvement in system performance...'
              }
              // Additional experience entries...
            ],
            education: [
              {
                school: 'State University',
                location: 'New York, NY',
                graduationDate: '2021-01-01',
                major: 'Computer Science',
                GPA: '3.8',
                description: 'Coursework in algorithms, data structures, and software engineering...'
              }
            ],
            skills: [{ name: 'JavaScript' }],
            languages: [{ name: 'English', proficiency: 'Fluent' }],
            interests: [{ name: 'Programming' }],
            certifications: [
              {
                name: 'AWS Certified Developer',
                description: 'Associate level certification for developing on AWS'
              }
            ]
          },
          null,
          2
        )}`
      },
      {
        role: 'user',
        content: jobDescription
      }
    ]
  })

  console.log(askGPT.choices[0].message.content)

  return JSON.parse(askGPT.choices[0].message.content as string) as UserInformation
}
