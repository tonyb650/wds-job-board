import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { deleteJobListing as deleteJobListingService } from "../services/jobListings";
import { useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import JobListingGrid from "./JobListingGrid";
import { Badge } from "@/components/ui/badge";
import daysLeft from "@/utils/daysLeft";

type Props = {
  jobListings: JobListing[];
};

const MyJobListingGrid = ({ jobListings }: Props) => {
  const [deletedListingsIds, setDeletedListingsIds] = useState<string[]>([])


  // useMemo here seems like overkill, but nice to see how it is implemented. And maybe it is more important than I think.
  const visibleJobListings = useMemo(() => {
    return jobListings
    .filter(jobListing => !deletedListingsIds.includes(jobListing.id))
    .sort((a, b) => (a.expiresAt?.getTime() || 0 )- (b.expiresAt?.getTime() || 0)) // Kyle extracts into a helper function sortJobListings
  }, [jobListings, deletedListingsIds])
  


  return (
      <JobListingGrid>
        {visibleJobListings
          .map((jobListing) => <MyJobListingCard key={jobListing.id} jobListing={jobListing} setDeletedListingsIds={setDeletedListingsIds}/>)}
      </JobListingGrid>
  );
};

export default MyJobListingGrid;


/* It is notable that Kyle separated MyJobListingCard out to a separate component. My inclination was 100% to keep all of this inside MyJobListingGrid */
const MyJobListingCard = ({jobListing, setDeletedListingsIds}: {jobListing: JobListing, setDeletedListingsIds:  React.Dispatch<React.SetStateAction<string[]>>}) => {
  const {toast} = useToast() // Kyle imports 'toast' directly, doesn't import useToast and instantiate it like he does in the 'TaskTable' component

  // Kyle hoists this function to the parent component, MyJobListingGrid
  async function deleteJobListing() {
    try {
      await deleteJobListingService(jobListing.id)
      setDeletedListingsIds(ids => [...ids, jobListing.id]) // Notice the function form of the setState. **Passing a function is preferred whenever state depends on previous state**
    } catch (error) {
      toast({
        title: "Deletion Failed",
        // Notice that the alt tag is for people who can't see the toast and it tells them what they can do instead of using the button on the toast
        action: (<ToastAction altText="Click the delete button in the job card to retry" onClick={deleteJobListing}>Retry</ToastAction>)
      })
    }
  }

  return (
    <JobListingCard
      key={jobListing.id}
      {...jobListing}
      headerDetails={
        <PublicationStatusBadge expires={jobListing.expiresAt || undefined} />
      }
      footer={
        <>
          <DeleteJobListingModal
            jobListing={jobListing}
            handleDelete={deleteJobListing}
          />
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
  );
}

// ! This is going to need some work
const PublicationStatusBadge = ({expires}: {expires: Date | undefined}) => {

  if (!expires) {
    return <Badge variant={"secondary"} className='rounded-md'>Draft</Badge>
  } else if (expires && expires < new Date()) {
    return <Badge variant={"default"} className='rounded-md'>Active - {daysLeft(expires)}</Badge>
  } else {
    return <Badge variant={"outline"} className='rounded-md'>Expired</Badge>
  }
}



type DeleteJobListingModalProps = {
  jobListing: JobListing,
  handleDelete: () => void,
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
              <AlertDialogTitle>
                Are you sure you want to delete this job listing?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              job listing and any remaining time will not be refunded.
              {jobListing.title}
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel >
                {/* <Button variant={"outline"}>  (not needed, styles are provided already in the AlertDialog component */}
                  Cancel
                {/* </Button> */}
              </AlertDialogCancel>
              <AlertDialogAction  onClick={handleDelete}>
                {/* <Button variant={"default"}> */}
                  Continue
                {/* </Button> */}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
