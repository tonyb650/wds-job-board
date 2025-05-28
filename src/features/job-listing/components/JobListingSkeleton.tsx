import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import JobListingGrid from './JobListingGrid';


export const JobListingSkeleton = () => {
  return (
    <Card className={"h-full flex flex-col"}>
      <CardHeader className='flex gap-1 flex-col'>
        <Skeleton className='h-6 w-48'/>
        <Skeleton className='h-4 w-12'/>
        <Skeleton className='h-4 w-20'/>
        <div className='flex gap-1 flex-wrap h-5'>
          <Badge variant={"secondary"} className='animate-pulse w-16'/>
          <Badge variant={"secondary"} className='animate-pulse w-16'/>
          <Badge variant={"secondary"} className='animate-pulse w-16'/>
        </div>
      </CardHeader>
      <CardContent className='gap-1 flex-col flex'>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4 w-2/3'/>
      </CardContent>
      <CardFooter className='flex justify-end '>
        <Skeleton className='w-20 h-10 rounded-lg'/>
      </CardFooter>
    </Card>
  );
}

export const JobListingSkeletonGrid = () => {
  return (
    <JobListingGrid>
      {Array(6).fill(0).map((_,i) =>  <JobListingSkeleton key={i}/>)}
    </JobListingGrid>
  )
}

