import { baseApi } from "@/services/baseApi";
import { JobListingFormValues } from "../components/JobListingForm";
import { JobListing } from "../constants/types";

/*
1. `GET /job-listings/published` - This route will return all the published job listings. This is useful for getting the job listings to display on the job board.
2. `GET /job-listings/my-listings` - This route will return all the job listings for the currently logged in user (even if they are not published).
3. `POST /job-listings` - This route will create a new job listing for the currently logged in user. It will return the new job listing that was created.
4. `PUT /job-listings/:id` - This route will update the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the updated job listing.
5. `DELETE /job-listings/:id` - This route will delete the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the deleted job listing.
6. `POST /job-listings/:id/create-publish-payment-intent` - This route is used as part of our Stripe integration to create a payment intent for the job listing with the given id. This needs to be given a duration for how long to post the job listing for. This will only work if the user is authenticated and the owner of the job listing. It will return the payment intent to be used with Stripe. If you want to learn more checkout the documentation on Stripe for [accepting payments](https://stripe.com/docs/payments/quickstart).
*/


export function getMyListings() {
  return baseApi.get<JobListing[]>(`/job-listings/my-listings`).then(res => res.data) 
}

export function getJobListing(id: string) {
  return baseApi.get<JobListing>(`/job-listings/${id}`).then(res => res.data) 
}

export function createJobListing (formData: JobListingFormValues) {
  return baseApi.post<JobListing>("/job-listings/", formData).then(res => res.data) 
}

export function updateJobListing (id: string, formData: JobListingFormValues) { 
  return baseApi.put<JobListing>(`/job-listings/${id}`, formData).then(res => res.data) 
}

export function deleteJobListing (id: string) { 
  return baseApi.delete(`/job-listings/${id}`).then(res => res.data) 
}
