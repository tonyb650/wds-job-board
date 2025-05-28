import { JobListing } from "@/features/job-listing/constants/types"
import { getMyListings } from "@/features/job-listing/services/jobListings"

export const MyListingsLoader = (): {listingsPromise: Promise<JobListing[]>} => {
  return { listingsPromise: getMyListings()}
}