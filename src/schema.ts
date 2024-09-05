import { z } from 'zod'

export const jobDescSchema = z.object({ jobDesc: z.string().min(1) })
export type JobDesc = z.infer<typeof jobDescSchema>
