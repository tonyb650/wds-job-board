import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { PageHeader } from "@/components/ui/PageHeader"
import JobListingForm from "@/features/job-listing/components/JobListingForm"
import { updateJobListing } from "@/features/job-listing/services/jobListings"
import { Suspense } from "react"
import { Await, useLoaderData, useNavigate } from "react-router"

const EditListingPage = () => {
  const {jobListingPromise} = useLoaderData()
  const navigate = useNavigate()

  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      <Suspense fallback={<LoadingSpinner className="h-30 w-30"/>}>
        <Await resolve={jobListingPromise}>
          {
            jobListing => 
            <JobListingForm
              jobListing = {jobListing}
              onSubmit={async (updatedJobListing) => {
                await updateJobListing(jobListing.id, updatedJobListing)
                navigate("/jobs")
              }}
            />
          }
        </Await>
      </Suspense>
    </>
  )
}

export default EditListingPage
