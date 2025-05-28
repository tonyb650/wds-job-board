import { PageHeader } from "@/components/ui/PageHeader"
import { addJobListing, JobListingForm } from "@/features/job-listing"
import { useNavigate } from "react-router"

const NewListingPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader>New Listing</PageHeader>
      <JobListingForm
        onSubmit={ async (newJobListing) => {
          await addJobListing(newJobListing)
          navigate("/jobs/my-listings")
        }}
      />
    </>
  )
}

export default NewListingPage
