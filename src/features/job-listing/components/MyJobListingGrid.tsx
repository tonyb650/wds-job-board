import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialogOverlay,
  AlertDialogPortal,
} from "@radix-ui/react-alert-dialog";
import { Link } from "react-router";
import { JobListing } from "../constants/types";
import JobListingCard from "./JobListingCard";
import { deleteJobListing } from "../services/jobListings";

type Props = {
  jobListings: JobListing[];
};

const MyJobListingGrid = ({ jobListings }: Props) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {jobListings.map((jobListing) => (
        <JobListingCard
          key={jobListing.id}
          listing={jobListing}
          footer={
            <>
              <DeleteJobListingModal jobListing={jobListing} />
              <Button type="button" variant="outline" asChild>
                <Link to={`/jobs/${jobListing.id}/edit`}>Edit</Link>
              </Button>
              {jobListing.expiresAt ? (
                <Button type="submit" disabled={false}>
                  {false ? <LoadingSpinner /> : "Extend"}
                </Button>
              ) : (
                <Button type="submit" disabled={false}>
                  {false ? <LoadingSpinner /> : "Publish "}
                </Button>
              )}
            </>
          }
        />
      ))}
    </div>
  );
};

export default MyJobListingGrid;




const DeleteJobListingModal = ({ jobListing }: { jobListing: JobListing }) => {
  async function handleDelete() {
    const deletedListing = await deleteJobListing(jobListing.id)
    console.log("Listing Deleted")
    console.log(deletedListing)
  }

  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="ghost">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogPortal>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              Are you sure you want to delete this job listing?
            </AlertDialogHeader>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              job listing and any remaining time will not be refunded.
              {jobListing.title}
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant={"outline"}>Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild onClick={handleDelete}>
                <Button variant={"default"}>
                  Continue
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
