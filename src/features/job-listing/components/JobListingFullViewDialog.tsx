import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Banknote, CalendarDaysIcon, GraduationCap, ExternalLink } from "lucide-react"
import formatUSD from "@/utils/formatUSD"
import { Badge } from "@/components/ui/badge"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"
import { Button } from "@/components/ui/button"
import { JobListing } from "../constants/types"

type Props = Pick<JobListing, "title" | "companyName" | "location" | "salary" | "type" | "experienceLevel" | "description" |"applyUrl">

const JobListingFullViewDialog = ({title, companyName, location, salary, type: jobType, experienceLevel, description, applyUrl}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">View More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-5rem)] flex flex-col max-w-3xl w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>
            <span className="block">{companyName}</span>
            <span className="block">{location}</span>
          </DialogDescription>
          <div className="flex gap-2">
            <Badge variant={"secondary"} className="flex gap-1 items-center">
              <Banknote size={16} />
              {formatUSD(salary)}
            </Badge>
            <Badge variant={"secondary"} className="flex gap-1 items-center">
              <CalendarDaysIcon size={14} />
              {jobType}
            </Badge>
            <Badge variant={"secondary"} className="flex gap-1 items-center">
              <GraduationCap size={16} />
              {experienceLevel}
            </Badge>
          </div>
        </DialogHeader>
        <div>
          <Button className="flex items-center" asChild>
            <a href={applyUrl} target="_blank">
              Apply On Company Site
              <ExternalLink className="w-4- h-4 ml-2"/>
            </a>
          </Button>
        </div>
        <MarkdownRenderer className="overflow-y-auto pr-6">{description}</MarkdownRenderer>
      </DialogContent>
    </Dialog>
  )
}

export default JobListingFullViewDialog