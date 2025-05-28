import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { PageHeader } from "@/components/ui/PageHeader"
import { JobListingForm } from "@/features/job-listing"
import { updateJobListing } from "@/features/job-listing/services/jobListings"
import { Suspense } from "react"
import { Await, useLoaderData, useNavigate } from "react-router"
import { EditListingLoader } from "./EditListingLoader"

const EditListingPage = () => {
  const navigate = useNavigate()
  const { id, jobListingPromise} = useLoaderData<typeof EditListingLoader>()

  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      <Suspense fallback={<LoadingSpinner className="h-30 w-30"/>}>
        <Await resolve={jobListingPromise}>
          {
            jobListing => 
            <JobListingForm
              initialJobListing = {jobListing}
              onSubmit={async (updatedJobListing) => {
                await updateJobListing(id, updatedJobListing)
                navigate("/jobs/my-listings")
              }}
            />
          }
        </Await>
      </Suspense>
    </>
  )
}

export default EditListingPage
