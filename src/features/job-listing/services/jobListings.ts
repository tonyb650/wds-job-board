import { baseApi } from "@/services/baseApi";
import { JobListing } from "../constants/types";
import { JobListingFormValues, jobListingSchema } from "../constants/schemas";

/*
1. `GET /job-listings/published` - This route will return all the published job listings. This is useful for getting the job listings to display on the job board.
2. `GET /job-listings/my-listings` - This route will return all the job listings for the currently logged in user (even if they are not published).
3. `POST /job-listings` - This route will create a new job listing for the currently logged in user. It will return the new job listing that was created.
4. `PUT /job-listings/:id` - This route will update the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the updated job listing.
5. `DELETE /job-listings/:id` - This route will delete the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the deleted job listing.
6. `POST /job-listings/:id/create-publish-payment-intent` - This route is used as part of our Stripe integration to create a payment intent for the job listing with the given id. This needs to be given a duration for how long to post the job listing for. This will only work if the user is authenticated and the owner of the job listing. It will return the payment intent to be used with Stripe. If you want to learn more checkout the documentation on Stripe for [accepting payments](https://stripe.com/docs/payments/quickstart).
*/

/*
  We have two ways of typing the data in the API response.
  The way that I was familiar with was to pass a generic type <JobListing> or <JobListing> to Axios
  Kyle skips the generic type and instead uses Zod's parseAsync method on the jobListingSchema and passes
  in the response data.
  It seems to achieve the same result.
  
  ChatGPT explains it nicely though!
  Zod validation is more robust in the long term, because:
  * This provides runtime validation of the API response.
  * If the API returns data that doesn’t match the schema, Zod throws a validation error.
  * It ensures the data conforms at runtime, making it much more resilient to backend changes, bugs, or unexpected responses.
*/

export function getMyListings() {
  return baseApi.get<JobListing[]>(`/job-listings/my-listings`).then(res => res.data) 
}

export function getJobListing(id: string) {
  return baseApi.get<JobListing>(`/job-listings/${id}`).then(res => res.data) 
}

export function createJobListing (formData: JobListingFormValues) {
  return baseApi.post("/job-listings/", formData).then(res => jobListingSchema.parseAsync(res.data)) 
}

export function updateJobListing (id: string, formData: JobListingFormValues) { 
  return baseApi.put<JobListing>(`/job-listings/${id}`, formData).then(res => res.data) 
}

export function deleteJobListing (id: string) { 
  return baseApi.delete(`/job-listings/${id}`).then(res => res.data) 
}
