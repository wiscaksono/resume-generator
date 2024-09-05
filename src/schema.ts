import { z } from 'zod'

export const jobDescSchema = z.object({ jobDesc: z.string().min(1) })
export type JobDesc = z.infer<typeof jobDescSchema>

export const userInformationSchema = z.object({
  fullName: z.string({ message: 'Full name is required' }),
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email format' }),
  phone: z.string({ message: 'Phone number is required' }),
  jobTitle: z.string({ message: 'Job title is required' }),
  address: z.string({ message: 'Address is required' }),
  experience: z.array(
    z.object({
      company: z.string({ message: 'Company name is required' }),
      location: z.string({ message: 'Location is required' }),
      position: z.string({ message: 'Position is required' }),
      startDate: z.string({ message: 'Start date is required' }),
      endDate: z.string({ message: 'End date is required' }),
      description: z.string({ message: 'Description is required' })
    }),
    { message: 'At least one experience entry is required' }
  ),
  education: z
    .array(
      z.object({
        school: z.string({ message: 'School name is required' }),
        location: z.string({ message: 'School location is required' }),
        graduationDate: z.string({ message: 'Graduation date is required' }),
        major: z.string({ message: 'Major is required' }),
        GPA: z.string({ message: 'GPA is required' }),
        description: z.string({ message: 'Description is required' })
      }),
      { message: 'Education information is required' }
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string({ message: 'Certification name is required' }),
        description: z.string({ message: 'Certification description is required' })
      }),
      { message: 'Certification information is required' }
    )
    .optional(),
  skills: z.array(z.object({ name: z.string({ message: 'Skill name is required' }) })).optional(),
  languages: z
    .array(
      z.object({
        name: z.string({ message: 'Language name is required' }),
        proficiency: z.string({ message: 'Language proficiency is required' })
      }),
      { message: 'Language information is required' }
    )
    .optional(),
  interests: z
    .array(
      z
        .object({
          name: z.string({ message: 'Interest name is required' })
        })
        .required()
    )
    .optional()
})
export type UserInformation = z.infer<typeof userInformationSchema>

export const userGPTKeySchema = z.object({ userGPTKey: z.string().min(1) })
export type UserGPTKey = z.infer<typeof userGPTKeySchema>
