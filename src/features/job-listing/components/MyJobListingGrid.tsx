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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type Props = {
  jobListings: JobListing[];
};

const MyJobListingGrid = ({ jobListings }: Props) => {
  const [deletedListingsIds, setDeletedListingsIds] = useState<string[]>([])
  const {toast} = useToast()
  
  async function handleDelete(jobListing: JobListing) {
    try {
      await deleteJobListing(jobListing.id)
      setDeletedListingsIds([...deletedListingsIds, jobListing.id])
      alert("Listing Deleted")
      
    } catch (error) {
      // We are going to have a toast here if the deletion fails
      toast({
        title: "Deletion Failed",
        description: `Could not delete job listing at this time.`,
        // action: (
        //   <ToastAction
        //     onClick={() =>
        //       setTasks(currentTasks => {
        //         const newArray = [...currentTasks]
        //         newArray.splice(index, 0, task)
        //         return newArray
        //       })
        //     }
        //     altText="Recreate the task"
        //   >
        //     Undo
        //   </ToastAction>
        // ),
        action: (<ToastAction altText="Close Notification">Close</ToastAction>)
      })
      // alert("Deletion failed")
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {jobListings
        .filter(jobListing => !deletedListingsIds.includes(jobListing.id))
        .map((jobListing) => (
        <JobListingCard
          key={jobListing.id}
          listing={jobListing}
          footer={
            <>
              <DeleteJobListingModal jobListing={jobListing} handleDelete={handleDelete}/>
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


type DeleteJobListingModalProps = {
  jobListing: JobListing,
  handleDelete: (jobListing: JobListing) => void,
}

const DeleteJobListingModal = ({ jobListing , handleDelete }: DeleteJobListingModalProps) => {
  

  
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
              <AlertDialogAction asChild onClick={() => handleDelete(jobListing)}>
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
