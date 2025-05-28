import { z } from "zod";
import { jobListingSchema } from "./schemas";


export type JobListing = z.infer<typeof jobListingSchema>

/*
export type JobListing = {
  id : string,
  title: string,
  companyName: string,
  location: string,
  salary: number,
  type: JobListingType,
  experienceLevel: JobListingExperienceLevel,
  shortDescription: string,
  description: string,
  applyUrl: string,
  createdAt?: Date,
  updatedAt?: Date,
  expiresAt?: Date,
  postedAt?: Date,
  postedBy?: User,
  postedById?: string,
}
  */