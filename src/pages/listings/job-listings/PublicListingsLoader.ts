import { JobListing } from "@/features/job-listing/constants/types"
import { getPublishedListings } from "@/features/job-listing/services/jobListings"

export const PublicListingsLoader = (): {listingsPromise: Promise<JobListing[]>} => {
  return { listingsPromise: getPublishedListings()}
}