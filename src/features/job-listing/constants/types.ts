import { User } from "@/features/authentication/constants/types";
import { JobListingExperienceLevel, JobListingType } from "../components/JobListingForm";

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