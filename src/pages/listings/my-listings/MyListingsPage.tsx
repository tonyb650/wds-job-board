import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/PageHeader'
import MyJobListingGrid from '@/features/job-listing/components/MyJobListingGrid'
import { Suspense } from 'react'
import { Await, Link, useLoaderData } from 'react-router'
import { MyListingsLoader } from './MyListingsLoader'
import { JobListingSkeletonGrid } from '@/features/job-listing/components/JobListingSkeleton'

const MyListingsPage = () => {
  const {listingsPromise} = useLoaderData<typeof MyListingsLoader>()

  return (
    <>
      <PageHeader btnSection={
          <Button variant="outline" asChild>
            <Link to="/jobs/new">
              Create Listing
            </Link>
          </Button>
      }>
        My Job Listings
      </PageHeader>
      <Suspense fallback={<JobListingSkeletonGrid/>}>
        <Await resolve={listingsPromise}>
          { listings => 
            <MyJobListingGrid jobListings={listings}/>
          }
        </Await>
      </Suspense>
    </>
  )
}

export default MyListingsPage