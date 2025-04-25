import { Button } from "@/components/ui/button";
import { JobListing } from "../constants/types";
import JobListingCard from "./JobListingCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type Props = {
  listing: JobListing;
};

const JobListingGrid = ({ listing }: Props) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <JobListingCard
          listing={listing}
          footer={
            <Button type="button" disabled={false}>
              {false ? <LoadingSpinner /> : "View More"}
            </Button>
          }
        />
    </div>
  );
};

export default JobListingGrid;
