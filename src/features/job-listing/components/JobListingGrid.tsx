import { Button } from "@/components/ui/button";
import { JobListing } from "../constants/types";
import JobListingCard from "./JobListingCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Banknote, CalendarDaysIcon, GraduationCap, ArrowUpRightSquare } from "lucide-react";
import formatUSD from "@/utils/formatUSD";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

type Props = {
  listing: JobListing;
};

const JobListingGrid = ({ listing }: Props) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <JobListingCard
          listing={listing}
          footer={
            <JobListingCardFooter listing={listing}/>
          }
        />
    </div>
  );
};

export default JobListingGrid;

const JobListingCardFooter = ({listing}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">View More</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="">{listing.title}</div>
        <div>
          <span className="block">{listing.companyName}</span>
          <span className="block">{listing.location}</span>
        </div>
        <div className="flex gap-2">
          <Badge variant={"secondary"} className="flex gap-1 items-center">
            <Banknote size={16} />
            {formatUSD(listing.salary)}
          </Badge>
          <Badge variant={"secondary"} className="flex gap-1 items-center">
            <CalendarDaysIcon size={14} />
            {listing.type}
          </Badge>
          <Badge variant={"secondary"} className="flex gap-1 items-center">
            <GraduationCap size={16} />
            {listing.experienceLevel}
          </Badge>
        </div>
        <div>
          <Button className="flex items-center">
            Apply On Company Site
            <ArrowUpRightSquare/>
          </Button>
        </div>
        {/* DISPLAY MD HERE */}
        <MarkdownRenderer>{listing.description}</MarkdownRenderer>
      </DialogContent>
    </Dialog>
  );
}