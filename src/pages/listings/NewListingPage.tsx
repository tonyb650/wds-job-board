import { PageHeader } from "@/components/ui/PageHeader"
import { addJobListing } from "@/features/job-listing"
import JobListingForm from "@/features/job-listing/components/JobListingForm"
import { useNavigate } from "react-router"

const NewListingPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader>New Listing</PageHeader>
      <JobListingForm
        onSubmit={ async (newJobListing) => {
          await addJobListing(newJobListing)
          navigate("/jobs")
        }}
      />
    </>
  )
}

export default NewListingPage
