import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import formatUSD from '@/utils/formatUSD'
import { cn } from '@/utils/shadcnUtils'
import { Banknote, CalendarDaysIcon, GraduationCap } from 'lucide-react'
import { ReactNode } from 'react'
import { JobListing } from '../constants/types'

// Kyle passes individual 'listing' properties, not the whole listing. I wonder what his thinking is? Prevent unnecessary rerenders?
// It is a very good demonstration of defining specific types from a larger type
// I am going to try to recreate this without cheating :)
// OK, I cheated. The key is to use 'Pick<>'

// type Props = {
//   className?: string;
//   jobListing: JobListing,
//   headerDetails?: ReactNode
//   footer?: ReactNode
// }

type JobListingCardProps = {
  className?: string,
  headerDetails?: ReactNode,
  footer?: ReactNode,
} & Pick<JobListing, "title" | "companyName" | "location" | "salary" | "type" | "experienceLevel" | "shortDescription">

const JobListingCard = ({title, companyName, location, salary, type: jobType, experienceLevel, shortDescription, className, headerDetails, footer}: JobListingCardProps) => {
  return (
    <Card className={cn("h-full flex flex-col",className)}>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          {title}
          {headerDetails}
        </CardTitle>
        <CardDescription>
          <span className="block">{companyName}</span>
          <span className="block">{location}</span>
        </CardDescription>
        <div className='flex gap-1 flex-wrap'>
          <Badge variant={"secondary"} className='flex gap-1 items-center whitespace-nowrap'>
            <Banknote size={16}/>
            {formatUSD(salary)}
          </Badge>
          <Badge variant={"secondary"} className='flex gap-1 items-center whitespace-nowrap'>
            <CalendarDaysIcon size={14}/>
            {jobType}
          </Badge>
          <Badge variant={"secondary"} className='flex gap-1 items-center whitespace-nowrap'>
            <GraduationCap size={16}/>
            {experienceLevel}
          </Badge>
        </div>
      </CardHeader>
      {/* flex-grow here, in combination with the h-full on the whole card, pushes the buttons to the bottom when needed */}
      <CardContent className='flex-grow'>{shortDescription}</CardContent>

      {/* item-stretch here "fills the full height". I'm not totally sure why we need this. Maybe to make sure all the buttons are the same height. Unclear. */}
      <CardFooter className='flex gap-2 justify-end items-stretch'>
        {footer}
      </CardFooter>
    </Card>
  );
}

export default JobListingCard
