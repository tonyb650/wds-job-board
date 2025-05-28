import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Control, FieldValues, Path, PathValue, useForm } from 'react-hook-form'
import { type JobListingFormValues, jobListingFormSchema, JOB_LISTING_TYPES, JOB_LISTING_EXPERIENCE_LEVELS } from '../constants/schemas'
import JobListingGrid from './JobListingGrid'
import JobListingCard from './JobListingCard'
import JobListingFullViewDialog from './JobListingFullViewDialog'


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
  initialJobListing?: JobListingFormValues,
  onSubmit: (data: JobListingFormValues) => void
}

export const JobListingForm = ({initialJobListing = DEFAULT_VALUES, onSubmit}: Props) => {
  const [previewIsOpen, setPreviewIsOpen] =useState<boolean>(false)

  const form = useForm<JobListingFormValues>({ 
    resolver: zodResolver(jobListingFormSchema),
    defaultValues: initialJobListing
  })
  
  const formValues: JobListingFormValues = form.watch() // <-- This creates a 'copy' of the form field values that is updated in realtime to populate our 'preview' 

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root?.message && (
            <div className="text-red-500 dark:text-red-900">
              {form.formState.errors.root.message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
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
              name="applyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application URL</FormLabel>
                  <FormControl>
                    <Input type={"url"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={form.control}  name="type"
            render= {({field}) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={val => field.onChange(val as PathValue<typeof JOB_LISTING_TYPES, Path<typeof JOB_LISTING_TYPES>>)} defaultValue='Full Time'>
                  <FormControl>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {JOB_LISTING_TYPES.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )
            }
            />
            {/* 
              <SelectFormField
                label="Type"
                control={form.control}
                name="type"
                options={JOB_LISTING_TYPES}
              /> 

              My goal here is to get a handle on how TS generics can be leveraged to create the reusable component <SelectFormField/> (see below).

              We have an example above of a non-generic implementation of the Select field for the job "Type" (Full-time, part-time, etc.)
              
              Below is how we can very nicely use the reusable component by just passing a few props and everything is abstracted away in the component.

              To understand how this works, I need to be able to explain this <T extends FieldValues>

              
            */}
            <SelectFormField
              label="Experience Level"
              control={form.control}
              name="experienceLevel"
              options={JOB_LISTING_EXPERIENCE_LEVELS}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
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
                            which would otherwise create a warning in the console (plus show an unwanted
                            message in the <FormMessage> for this <FormField>).
                        */}
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      value={isNaN(field.value) ? "" : field.value}
                    />
                  </FormControl>
                  <FormDescription>In USD</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-2">
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>Max 200 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>Supports Full Markdown</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewIsOpen(p => !p)}
            >
              {previewIsOpen ? "Hide" : "Show"} Preview
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Save"}
            </Button>
          </div>
        </form>
      </Form>
      {/* <div className="w-full text-right">
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => console.log(form.getValues())}
        >
          Current FormState
        </Button>
      </div> */}

      {previewIsOpen && (
        <JobListingGrid className='mt-5'>
          <JobListingCard 
            {...formValues}
            footer={<JobListingFullViewDialog {...formValues}/>}
          />
        </JobListingGrid> 
      )}
    </>
  );
}


type SelectFormFieldProps<T extends FieldValues> = { // T in this case is the form
  label: string
  control: Control<T>
  name: Path<T>                               // Path can be 'experienceLevel' or 'type'
  options: readonly PathValue<T, Path<T>>[]   // PathValue can be the values from the Path
}

function SelectFormField<T extends FieldValues>({ // constrains T to FieldValues type which is [x: string]: any;
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