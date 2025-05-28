import { getJobListing } from "@/features/job-listing/services/jobListings";
import { LoaderFunctionArgs } from "react-router";

export const EditListingLoader = ({ params: { id } }: LoaderFunctionArgs) => { 
  if (typeof id !== "string") throw new Response("Not Found - No ID in Params", { status: 404 })
  return { jobListingPromise: getJobListing(id), id: id }
}

