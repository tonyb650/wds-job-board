import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  JOB_LISTING_EXPERIENCE_LEVELS,
  JOB_LISTING_TYPES
} from "../constants/schemas";
import { JobListing } from "../constants/types";
import jobListingSortFunction from "../helpers/jobListingSortFunction";

export const JOB_LISTING_TYPES_FILTER_OPTIONS = [ "Any", ...JOB_LISTING_TYPES] as const // <-- My naive way (Part 1)
// export const EXPERIENCE_LEVEL_FILTER_OPTIONS = [ "Any", ...JOB_LISTING_EXPERIENCE_LEVELS] as const

const DEFAULT_VALUES: FilterFormValues = {
  title: "",
  location: "",
  minimumSalary: NaN,
  type: "Any",
  experienceLevel: "",
  showHidden: false,
  favoritesOnly: false
};

export const filterFormSchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
  minimumSalary: z.number().or(z.nan()),
  type: z.enum(JOB_LISTING_TYPES_FILTER_OPTIONS).optional(), // <-- My naive way (Part 2)
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS).or(z.literal("")), // <-- The correct way
  showHidden: z.boolean(),
  favoritesOnly: z.boolean().optional()
});

export type FilterFormValues = z.infer<typeof filterFormSchema>;

export function useJobListingFiltersForm() {

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange" // This will validate the form on every change
  });

  const filters = form.watch(); //<-- This causes more re-renders but seems to be needed
  // const filters = form.getValues(); // <-- Kyle used this at first, but it wasn't working for the "minimum salary" field

  function getFilteredListings(jobListings: JobListing[], hiddenJobsIds: string[], favoriteJobsIDs: string[]) {
    const filteredJobListings = jobListings
      .filter((jobListing) => {
        const matchesTitle =
          !filters.title ||
          filters.title?.length === 0 ||
          jobListing.title.toLowerCase().match(filters.title.toLowerCase());
        const matchesLocation = 
          !filters.location || 
          filters.location.length === 0 || 
          jobListing.location.toLowerCase().includes(filters.location.toLowerCase())
        const matchesSalary = jobListing.salary >= (filters.minimumSalary || 0);
        const matchesType = !filters.type || filters.type==="Any" || jobListing.type === filters.type;
        const matchesExperienceLevel = !filters.experienceLevel || jobListing.experienceLevel === filters.experienceLevel;
        const matchesHidden = filters.showHidden || !hiddenJobsIds.includes(jobListing.id);
        const matchesFavorites = !filters.favoritesOnly || favoriteJobsIDs.includes(jobListing.id);

        return matchesTitle && matchesLocation && matchesSalary && matchesType && matchesExperienceLevel && matchesHidden && matchesFavorites
      })
      .sort(jobListingSortFunction);
    return filteredJobListings;
  }

  return { form, getFilteredListings };
}
