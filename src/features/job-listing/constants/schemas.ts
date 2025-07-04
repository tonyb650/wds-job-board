import { z } from "zod"

/**** WITH KYLE, ALL OF THIS SHOULD COME FROM BACK END ****/

// import {jobListingFormSchema} from '@backend/constants/schemas/jobListings'

/*
  AI has the following thoughts about this:
  You're importing a schema from your backend directly into your frontend via a path 
  alias (@backend/constants/schemas/jobListings), but Zod schemas aren't compatible 
  across different instances of Zod.

  Even though both frontend and backend use the same Zod version, they're separate 
  instances at runtime, which causes the type error you're seeing.

  This is a common issue when sharing Zod schemas across separate packages or modules, 
  especially in a monorepo setup. A better long-term solution might be to:

  1. Create a shared types package that both frontend and backend can import from
  2. Define type interfaces in that package (without Zod) that both can use
  3. Define Zod schemas locally in each package using those shared types
*/
/*************************************************/


export const JOB_LISTING_TYPES = [
  "Full Time",
  "Part Time",
  "Internship",
] as const

export type JobListingType = (typeof JOB_LISTING_TYPES)[number]

export const JOB_LISTING_EXPERIENCE_LEVELS = [
  "Junior",
  "Mid-Level",
  "Senior",
] as const

export type JobListingExperienceLevel = (typeof JOB_LISTING_EXPERIENCE_LEVELS)[number]

export const JOB_LISTING_DURATIONS = [30, 60, 90] as const

export type JobListingDuration = (typeof JOB_LISTING_DURATIONS)[number]

/* Schema for the job listing FORM (What goes TO the back end)*/
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

export type JobListingFormValues = z.infer<typeof jobListingFormSchema>

/* Schema for the job listing doc (What is RETURNED rom the back end) */
export const jobListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  companyName: z.string(),
  location: z.string(),
  applyUrl: z.string().url(),
  type: z.enum(JOB_LISTING_TYPES),
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS),
  salary: z.number(),
  shortDescription: z.string(),
  description: z.string(),
  expiresAt: z.nullable(z.coerce.date())
})