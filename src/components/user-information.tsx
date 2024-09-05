import { useState } from 'react'
import { Settings, X, Plus } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { userInformationSchema, UserInformation as TUserInformation, userGPTKeySchema, UserGPTKey } from '@/schema'

export const UserInformation = ({ data }: { data: { user: TUserInformation; GPTKey: string } }) => {
  const [open, onOpenChange] = useState(false)

  const queryClient = useQueryClient()
  const gptForm = useForm<UserGPTKey>({ defaultValues: { userGPTKey: data.GPTKey }, resolver: zodResolver(userGPTKeySchema) })
  const form = useForm<TUserInformation>({ defaultValues: data.user, resolver: zodResolver(userInformationSchema) })
  const fieldExp = useFieldArray({ control: form.control, name: 'experience' })
  const fieldEdu = useFieldArray({ control: form.control, name: 'education' })
  const fieldLang = useFieldArray({ control: form.control, name: 'languages' })
  const fieldCert = useFieldArray({ control: form.control, name: 'certifications' })
  const fieldSkill = useFieldArray({ control: form.control, name: 'skills' })
  const fieldInt = useFieldArray({ control: form.control, name: 'interests' })

  async function onSubmit(values: TUserInformation) {
    localStorage.setItem('user-data', JSON.stringify(values))
    await queryClient.invalidateQueries({ queryKey: ['user-data'] })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon' className='absolute bottom-0 left-0'>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[calc(100dvh-10%)] max-w-6xl flex flex-col h-full overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Configuration</DialogTitle>
          <DialogDescription>Describe your self in a detail</DialogDescription>
        </DialogHeader>
        <Form {...gptForm}>
          <form onSubmit={gptForm.handleSubmit(val => localStorage.setItem('gpt-key', val.userGPTKey), console.error)} className='flex items-end gap-2 w-full'>
            <FormField
              control={gptForm.control}
              name='userGPTKey'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Open AI API Key</FormLabel>
                  <FormControl>
                    <Input type='password' autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Save</Button>
          </form>
        </Form>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, console.error)} className='space-y-2'>
            <fieldset className='grid grid-cols-2 gap-2'>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <fieldset className='grid grid-cols-2 gap-2'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='jobTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <fieldset className='border p-2 rounded-md space-y-2'>
              <p className='font-medium pb-2 border-b'>Experience</p>
              {fieldExp.fields.map((field, index) => (
                <fieldset key={field.id} className='p-4 border rounded-md space-y-2'>
                  <div className='flex justify-between items-center pb-2 border-b'>
                    <p className='font-medium'>Experience {index + 1}</p>
                    <Button variant='destructive' size='icon' type='button' className='size-5' onClick={() => fieldExp.remove(index)}>
                      <X className='size-3' />
                    </Button>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <fieldset className='flex items-center gap-2'>
                      <FormField
                        control={form.control}
                        name={`experience.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input {...field} type='date' />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experience.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input {...field} type='date' />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </fieldset>
                    <FormField
                      control={form.control}
                      name={`experience.${index}.description`}
                      render={({ field }) => (
                        <FormItem className='col-span-2'>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </fieldset>
              ))}

              <Button
                variant='secondary'
                className='col-span-2 w-full h-full'
                type='button'
                onClick={() => fieldExp.append({ company: '', location: '', position: '', startDate: '', endDate: '', description: '' })}
              >
                <Plus className='mr-2' />
                Add Experience
              </Button>
            </fieldset>
            <fieldset className='border p-2 rounded-md space-y-2'>
              <p className='font-medium pb-2 border-b'>Education</p>
              {fieldEdu.fields.map((edu, index) => (
                <fieldset key={edu.id} className='p-4 border rounded-md space-y-2'>
                  <div className='flex justify-between items-center pb-2 border-b'>
                    <p className='font-medium'>Education {index + 1}</p>
                    <Button variant='destructive' size='icon' type='button' className='size-5' onClick={() => fieldEdu.remove(index)}>
                      <X className='size-3' />
                    </Button>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name={`education.${index}.school`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School / University</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.major`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Major</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <fieldset className='flex items-center gap-2'>
                      <FormField
                        control={form.control}
                        name={`education.${index}.graduationDate`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>Graduation Date</FormLabel>
                            <FormControl>
                              <Input {...field} type='date' />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`education.${index}.GPA`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>GPA</FormLabel>
                            <FormControl>
                              <Input type='number' step='0.1' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </fieldset>
                    <FormField
                      control={form.control}
                      name={`education.${index}.description`}
                      render={({ field }) => (
                        <FormItem className='col-span-2'>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </fieldset>
              ))}

              <Button
                variant='secondary'
                className='col-span-2 w-full h-full'
                type='button'
                onClick={() => fieldEdu.append({ school: '', location: '', major: '', graduationDate: '', GPA: '', description: '' })}
              >
                <Plus className='mr-2' />
                Add Education
              </Button>
            </fieldset>
            <fieldset className='border p-2 rounded-md space-y-2'>
              <p className='font-medium pb-2 border-b'>Languages</p>
              {fieldLang.fields.map((lang, index) => (
                <fieldset key={lang.id} className='p-4 border rounded-md space-y-2'>
                  <div className='flex justify-between items-center pb-2 border-b'>
                    <p className='font-medium'>Language {index + 1}</p>
                    <Button variant='destructive' size='icon' type='button' className='size-5' onClick={() => fieldLang.remove(index)}>
                      <X className='size-3' />
                    </Button>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name={`languages.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`languages.${index}.proficiency`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proficiency</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </fieldset>
              ))}

              <Button variant='secondary' className='col-span-2 w-full h-full' type='button' onClick={() => fieldLang.append({ name: '', proficiency: '' })}>
                <Plus className='mr-2' />
                Add Language
              </Button>
            </fieldset>
            <fieldset className='border p-2 rounded-md space-y-2'>
              <p className='font-medium pb-2 border-b'>Certifications</p>
              {fieldCert.fields.map((cert, index) => (
                <fieldset key={cert.id} className='p-4 border rounded-md space-y-2'>
                  <div className='flex justify-between items-center pb-2 border-b'>
                    <p className='font-medium'>Certification {index + 1}</p>
                    <Button variant='destructive' size='icon' type='button' className='size-5' onClick={() => fieldCert.remove(index)}>
                      <X className='size-3' />
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </fieldset>
              ))}

              <Button variant='secondary' className='col-span-2 w-full h-full' type='button' onClick={() => fieldCert.append({ name: '', description: '' })}>
                <Plus className='mr-2' />
                Add Certification
              </Button>
            </fieldset>
            <fieldset className='border p-2 rounded-md space-y-2'>
              <p className='font-medium pb-2 border-b'>Skills</p>
              {fieldSkill.fields.map((skill, index) => (
                <fieldset key={skill.id} className='flex items-center gap-2'>
                  <FormField
                    control={form.control}
                    name={`skills.${index}.name`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant='destructive' size='icon' onClick={() => fieldSkill.remove(index)}>
                    <X />
                  </Button>
                </fieldset>
              ))}

              <Button variant='secondary' className='col-span-2 w-full h-full' type='button' onClick={() => fieldSkill.append({ name: '' })}>
                <Plus className='mr-2' />
                Add Skill
              </Button>
            </fieldset>
            <fieldset className='border p-2 rounded-md space-y-2'>
              <p className='font-medium pb-2 border-b'>Interests</p>
              {fieldInt.fields.map((int, index) => (
                <fieldset key={int.id} className='flex items-center gap-2'>
                  <FormField
                    control={form.control}
                    name={`interests.${index}.name`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant='destructive' size='icon' onClick={() => fieldInt.remove(index)}>
                    <X />
                  </Button>
                </fieldset>
              ))}
              <Button variant='secondary' className='col-span-2 w-full h-full' type='button' onClick={() => fieldInt.append({ name: '' })}>
                <Plus className='mr-2' />
                Add Interest
              </Button>
            </fieldset>
            <DialogFooter>
              <Button type='submit' className='w-max ml-auto'>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
