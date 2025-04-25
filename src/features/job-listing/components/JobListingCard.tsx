import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import daysLeft from '@/utils/daysLeft'
import formatUSD from '@/utils/formatUSD'
import { Banknote, CalendarDaysIcon, GraduationCap } from 'lucide-react'
import { ReactNode } from 'react'
import { JobListing } from '../constants/types'

type Props = {
  listing: JobListing,
  footer: ReactNode
}

const JobListingCard = ({listing, footer}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {listing.title}
          <PublicationStatusBadge expires={listing.expiresAt}/>
        </CardTitle>
        <CardDescription>
          <span className="block">{listing.companyName}</span>
          <span className="block">{listing.location}</span>
        </CardDescription>
        <div className='flex gap-2'>
          <Badge variant={"secondary"} className='flex gap-1 items-center'>
            <Banknote size={16}/>
            {formatUSD(listing.salary)}
          </Badge>
          <Badge variant={"secondary"} className='flex gap-1 items-center'>
            <CalendarDaysIcon size={14}/>
            {listing.type}
          </Badge>
          <Badge variant={"secondary"} className='flex gap-1 items-center'>
            <GraduationCap size={16}/>
            {listing.experienceLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>{listing.shortDescription}</CardContent>

      <CardFooter className='flex gap-2 justify-end'>
        {footer}
      </CardFooter>
    </Card>
  );
}

export default JobListingCard


const PublicationStatusBadge = ({expires}: {expires: Date | undefined}) => {

  if (!expires) {
    return <Badge variant={"secondary"} className='rounded-md'>Draft</Badge>
  } else if (expires && expires < new Date()) {
    return <Badge variant={"default"} className='rounded-md'>Active - {daysLeft(expires)}</Badge>
  } else {
    return <Badge variant={"outline"} className='rounded-md'>Expired</Badge>
  }
}