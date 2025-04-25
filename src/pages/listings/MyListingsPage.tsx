import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { PageHeader } from '@/components/ui/PageHeader'
import MyJobListingGrid from '@/features/job-listing/components/MyJobListingGrid'
import { Suspense } from 'react'
import { Await, Link, useLoaderData } from 'react-router'
import { MyListingsLoader } from './MyListingsLoader'

const MyListingsPage = () => {
  const {listingsPromise} = useLoaderData<typeof MyListingsLoader>()

  return (
    <>
      <PageHeader>
        <div className='flex justify-between items-start w-full'>
          <header className='block'>
            My Job Listings
          </header>
          <Button variant={"outline"} asChild>
            <Link to="/jobs/new">
              Create Listing
            </Link>
          </Button>
        </div>
      </PageHeader>
      <Suspense fallback={<LoadingSpinner className='w-30 h-30'/>}>
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