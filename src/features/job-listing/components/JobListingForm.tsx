import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Control, FieldValues, Path, PathValue, useForm } from 'react-hook-form'
import z from 'zod'
import JobListingGrid from './JobListingGrid'
// import {jobListingFormSchema} from '@backend/constants/schemas/jobListings'

/**** ALL OF THIS SHOULD COME FROM BACK END ****/
export const JOB_LISTING_TYPES = [
  "Full Time",
  "Part Time",
  "Internship",
] as const

export type JobListingType = (typeof JOB_LISTING_TYPES)[number]

export type JobListingExperienceLevel = (typeof JOB_LISTING_EXPERIENCE_LEVELS)[number]

export const JOB_LISTING_EXPERIENCE_LEVELS = [
  "Junior",
  "Mid-Level",
  "Senior",
] as const

export const JOB_LISTING_DURATIONS = [30, 60, 90] as const

export const jobListingFormSchema = z.object({
  title: z.string().nonempty(),
  companyName: z.string().nonempty(),
  location: z.string().nonempty(),
  applyUrl: z.string().url().nonempty(),
  type: z.enum(JOB_LISTING_TYPES),
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS),
  salary: z.number().int().positive(),
  shortDescription: z.string().max(200).nonempty(),
  description: z.string().nonempty(),
})
/*************************************************/


export type JobListingFormValues = {
  title: string,
  companyName: string,
  location: string,
  applyUrl: string,
  type: JobListingType,
  experienceLevel: JobListingExperienceLevel,
  salary: number,
  shortDescription: string,
  description: string,
}

export const DEFAULT_VALUES: JobListingFormValues = {
  title: "",
  companyName: "",
  location: "",
  applyUrl: "",
  type: "Full Time",
  experienceLevel: "Junior",
  salary: NaN, // <-- This satisfies number type and allows form field to render without a '0' upon mounting
  shortDescription: "",
  description: "",
}

type Props = {
  jobListing?: JobListingFormValues,
  onSubmit: (data: JobListingFormValues) => void
}

const JobListingForm = ({jobListing = DEFAULT_VALUES, onSubmit}: Props) => {
  const [previewIsOpen, setPreviewIsOpen] =useState<boolean>(false)
  const form = useForm<JobListingFormValues>({ 
    resolver: zodResolver(jobListingFormSchema),
    defaultValues: jobListing
  })
  const formValues: JobListingFormValues = form.watch() // <-- This creates a 'copy' of the form field values that is updated in realtime to populate our 'preview' 

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

            {form.formState.errors.root?.message && 
              <div className="text-red-500 dark:text-red-900">
                {form.formState.errors.root.message}
              </div>
            }

            <div className='grid grid-cols-3 gap-4'>

              <FormField
                control={form.control} 
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control} 
                name="companyName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control} 
                name="location"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control} 
                name="applyUrl"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Application URL</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
                <SelectFormField
                  label="Type"
                  control={form.control}
                  name="type"
                  options= {JOB_LISTING_TYPES}
                />
                <SelectFormField
                  label="Experience Level"
                  control={form.control}
                  name="experienceLevel"
                  options= {JOB_LISTING_EXPERIENCE_LEVELS}
                />
              <div className='flex flex-col gap-2'>
                <FormField
                  control={form.control} 
                  name="salary"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        {/* What's going on with this little gem below:
                            field.onChange() is a function provided by React Hook Form's
                            useController() method. When the input field changes,
                            it is triggered to set the RHF's form state to e.target's 'valueAsNumber'.
                            This has the effect of making it impossible to enter anything except for
                            numbers, decimal point and plus or minus sign.
                            Separately, the value is being *controlled* with a ternary inside 'value={}'
                            such that if the field.onChange() sets the field.value to NaN,
                            the field in the DOM is set to an empty string rather than NaN
                            which will create a warning in the console (plus show an unwanted
                            message in the <FormMessage> for this <FormField>).
                        */}
                        <Input type="number" {...field}
                          onChange={e => field.onChange(e.target.valueAsNumber)}
                          value={isNaN(field.value) ? "" : field.value}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                  />
                  <div className='text-xs text-slate-400'>
                    In USD
                  </div>
                </div>
                <div className='col-span-2 flex flex-col gap-2'>
                  <FormField
                    control={form.control} 
                    name="shortDescription"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                  <div className='text-xs text-slate-400'>
                    Max 200 characters
                  </div>
                </div>
                <div className='col-span-3 flex flex-col gap-2'>
                  <FormField
                    control={form.control} 
                    name="description"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Full Description</FormLabel>
                        <FormControl>
                          <Textarea {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                  <div className='text-xs text-slate-400'>
                    Supports Full Markdown
                  </div>
                </div>

              </div>
        <div className='flex justify-end gap-4'>
          <Button type="button" variant="outline" onClick={() => setPreviewIsOpen(!previewIsOpen)}>
              { previewIsOpen ? "Hide" : "Show"} Preview
          </Button>
          <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting }>
            {form.formState.isSubmitting ? <LoadingSpinner/> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
    <div className='w-full text-right'>
      <Button variant={"secondary"} size={"sm"} onClick={() => console.log(form.getValues())}>Current FormState</Button>
    </div>

    { previewIsOpen &&
      <JobListingGrid listing={{...formValues, postedById: "", id: ""}}/>
    }

    </>
  )
}

export default JobListingForm


type SelectFormFieldProps<T extends FieldValues> = {
  label: string
  control: Control<T>
  name: Path<T>
  options: readonly PathValue<T, Path<T>>[]
}

function SelectFormField<T extends FieldValues>({
  label,
  control,
  name,
  options,
}: SelectFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={val => field.onChange(val as PathValue<T, Path<T>>)}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}