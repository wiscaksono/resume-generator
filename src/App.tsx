import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import OpenAI from 'openai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation } from '@tanstack/react-query'

import { Label } from '@/components/ui/label'
import { Resume } from '@/components/resume'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { UserInformation } from '@/components/user-information'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import { generateCoverLetter, generateUserInformation } from './lib/gpt'
import { jobDescSchema, JobDesc, UserInformation as TUserInformation } from './schema'
import { useState } from 'react'

export default function App() {
  const [coverLetter, setCoverLetter] = useState('')
  const [resumeResult, setResumeResult] = useState<TUserInformation>(initialData)

  const { data, isFetched } = useQuery({
    queryKey: ['user-data'],
    queryFn: () => {
      const GPTKey = localStorage.getItem('gpt-key') ?? ''
      if (!GPTKey) localStorage.setItem('gpt-key', '')
      const user = localStorage.getItem('user-data') ? (JSON.parse(localStorage.getItem('user-data')!) as TUserInformation) : null
      if (!user) localStorage.setItem('user-data', JSON.stringify(initialData))
      return { user, GPTKey }
    },
    initialData: { user: initialData, GPTKey: '' }
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['result'],
    mutationFn: async (jobDesc: string) => {
      if (!data.GPTKey || !data.user) return
      const AIClient = new OpenAI({ apiKey: data.GPTKey, dangerouslyAllowBrowser: true })
      await Promise.all([generateUserInformation(AIClient, data.user, jobDesc), generateCoverLetter(AIClient, data.user, jobDesc)]).then(([resumeRes, coverLetterRes]) => {
        setResumeResult(resumeRes)
        setCoverLetter(coverLetterRes)
      })
    }
  })

  const form = useForm<JobDesc>({ defaultValues: { jobDesc: '' }, resolver: zodResolver(jobDescSchema) })

  return (
    <main className='h-dvh grid grid-cols-2 p-5 gap-2.5'>
      <section className='relative'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(val => mutate(val.jobDesc))} className='h-full gap-y-2.5 flex flex-col'>
            <FormField
              control={form.control}
              name='jobDesc'
              render={({ field }) => (
                <FormItem className='flex flex-col flex-1'>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea autoFocus className='flex-1' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit' className='w-max ml-auto' disabled={isPending || !data.GPTKey}>
              {!data.GPTKey ? 'Missing OPEN API Key' : isPending ? 'Generating...' : 'Generate'}
            </Button>
          </form>
        </Form>
        {isFetched && data.user && data.GPTKey && <UserInformation user={data.user} gptKey={data.GPTKey} />}
      </section>
      <section className='space-y-2.5'>
        <div className='space-y-2 flex flex-col h-[65%]'>
          <Label>Resume</Label>
          <Resume data={isSuccess ? resumeResult : data.user} />
        </div>
        <div className='space-y-2 flex flex-col h-[35%]'>
          <Label>Cover Letter</Label>
          <Textarea className='w-full h-96' placeholder='Generated cover letter will be provided here' defaultValue={coverLetter} readOnly />
        </div>
      </section>
    </main>
  )
}

const initialData: TUserInformation = {
  fullName: '',
  email: '',
  phone: '',
  jobTitle: '',
  address: '',
  experience: [
    {
      company: '',
      location: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  education: [
    {
      school: '',
      location: '',
      graduationDate: '',
      major: '',
      GPA: '',
      description: ''
    }
  ],
  skills: [{ name: '' }],
  languages: [
    {
      name: '',
      proficiency: ''
    },
    {
      name: '',
      proficiency: ''
    }
  ],
  interests: [{ name: '' }],
  certifications: [
    {
      name: '',
      description: ''
    }
  ]
}
