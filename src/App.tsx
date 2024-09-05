import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import { jobDescSchema, JobDesc } from './schema'

export default function App() {
  const { data } = useQuery({
    queryKey: ['user-data'],
    queryFn: () => {
      const GPTKey = localStorage.getItem('gpt-key')
      const user = localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')!) : {}

      return { user, GPTKey }
    },
    initialData: { user: {}, GPTKey: '' }
  })

  const form = useForm<JobDesc>({ defaultValues: { jobDesc: '' }, resolver: zodResolver(jobDescSchema) })

  function onSubmit(values: JobDesc) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <main className='h-dvh grid grid-cols-2 p-5 gap-2.5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='h-full gap-y-2.5 flex flex-col'>
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
          <Button type='submit' className='w-max ml-auto'>
            Generate
          </Button>
        </form>
      </Form>
    </main>
  )
}
