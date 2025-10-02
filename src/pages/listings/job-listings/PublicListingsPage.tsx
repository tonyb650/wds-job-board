import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import JobListingCard from "@/features/job-listing/components/JobListingCard"
import JobListingFilterForm from "@/features/job-listing/components/JobListingFilterForm"
import JobListingFullViewDialog from "@/features/job-listing/components/JobListingFullViewDialog"
import JobListingGrid from "@/features/job-listing/components/JobListingGrid"
import { JobListingSkeletonGrid } from "@/features/job-listing/components/JobListingSkeleton"
import { useJobListingFiltersForm } from "@/features/job-listing/hooks/useJobListingFiltersForm"
import { Suspense } from "react"
import { Await, Link, useLoaderData } from "react-router"
import { PublicListingsLoader } from "./PublicListingsLoader"
import { Eye, EyeOff, Heart } from "lucide-react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { cn } from "@/utils/shadcnUtils"


const PublicListingsPage = () => {
  const {listingsPromise} = useLoaderData<typeof PublicListingsLoader>()
  const {form, getFilteredListings} = useJobListingFiltersForm()
  const [hiddenJobsIDs, setHiddenJobsIDs] = useLocalStorage<string[]>("hidden", [])
  const [favoriteJobsIDs, setFavoriteJobsIDs] = useLocalStorage<string[]>("favorites", [])

  const {toast} = useToast()
  
  const toggleFavorite = (listingId: string) => {
    if (favoriteJobsIDs.includes(listingId)) {
      setFavoriteJobsIDs(prev => [...prev.filter(id => id !== listingId)])
    } else {
      setFavoriteJobsIDs(prev => [...prev, listingId])
    }
  }

  const toggleHidden = (listingId: string, title: string) => {
    if (hiddenJobsIDs.includes(listingId)) {
      setHiddenJobsIDs(prev => [...prev.filter(id => id !== listingId)])
    } else {
      toast({
        title: "Job Hidden",
        description: `${title} will no longer be shown`,
        action: (<ToastAction altText={`Click show hidden in the filter section to show hidden jobs and then click the show button in the card to show this job again.`} onClick={() => {setHiddenJobsIDs(prev => [...prev.filter(id => id !== listingId)])}}>Undo</ToastAction>)
      })
      setHiddenJobsIDs(prev => [...prev, listingId])
    }
  }

  return (
    <div>
      <PageHeader btnSection={
        <Button variant="outline" asChild>
          <Link to="/jobs/new">
            Create Listing
          </Link>
        </Button>
      }>
        Job Listings
      </PageHeader>

      <JobListingFilterForm form={form} className="mb-8"/>

      <Suspense fallback={<JobListingSkeletonGrid/>}>
        <Await resolve={listingsPromise}>
          { jobListings => (
            <JobListingGrid>
              {getFilteredListings(jobListings, hiddenJobsIDs, favoriteJobsIDs)
                .map((jobListing) => {
                  const isHidden = hiddenJobsIDs.includes(jobListing.id)
                  const isFavorite = favoriteJobsIDs.includes(jobListing.id)
                  const HideIcon = isHidden ? EyeOff : Eye

                  return(
                  <JobListingCard
                    key={jobListing.id}
                    {...jobListing}
                    className={cn({"opacity-50" : isHidden})}
                    headerDetails={
                      <div className="-mr-3 -mt-3 ">
                        <Button size="icon" variant="ghost" className="rounded-full" onClick={() => {toggleHidden(jobListing.id, jobListing.title)}}>
                          <HideIcon width={20}/>
                          <div className="sr-only">{ isHidden ? "Show": "Hide"}</div>
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-full" onClick={() => {toggleFavorite(jobListing.id)}}>
                          <Heart width={20} className={cn({"fill-red-500 stroke-red-500": isFavorite})}/>
                          <div className="sr-only">{ isFavorite ? "Un-favorite": "Favorite"}</div>
                        </Button>
                      </div>
                    }
                    footer={<JobListingFullViewDialog {...jobListing}/>}
                  />)
                }
                )
              }
            </JobListingGrid>
          )}
        </Await>
      </Suspense>
    </div>
  )
}

export default PublicListingsPage;