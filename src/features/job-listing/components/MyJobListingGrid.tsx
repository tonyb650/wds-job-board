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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialogOverlay,
  AlertDialogPortal,
} from "@radix-ui/react-alert-dialog";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { getJobListingPriceInCents } from "../../../../../api/src/utils/getJobListingPriceInCents";
import { JOB_LISTING_DURATIONS, JobListingDuration } from "../constants/schemas";
import { JobListing } from "../constants/types";
import publishedStatus from "../helpers/publishedStatus";
import { createListingPublishPaymentIntent, deleteJobListing as deleteJobListingService } from "../services/jobListings";
import JobListingCard from "./JobListingCard";
import JobListingGrid from "./JobListingGrid";
import PublicationStatusBadge from "./PublicationStatusBadge";
import StripeForm from "./StripeForm";
import jobListingSortFunction from "../helpers/jobListingSortFunction";


type Props = {
  jobListings: JobListing[];
};

const MyJobListingGrid = ({ jobListings }: Props) => {
  const [deletedListingsIds, setDeletedListingsIds] = useState<string[]>([])


  // useMemo here seems like overkill, but nice to see how it is implemented. And maybe it is more important than I think.
  const visibleJobListings = useMemo(() => {
    return jobListings
    .filter(jobListing => !deletedListingsIds.includes(jobListing.id))
    .sort(jobListingSortFunction)
    // .sort((a: JobListing, b: JobListing) => ((a.expiresAt?.getTime() || 0) - (b.expiresAt?.getTime() || 0))) // Kyle extracts into a helper function sortJobListings
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
        <PublicationStatusBadge expiresAt={jobListing.expiresAt ?? undefined} />
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
          <PaymentModal jobListing={jobListing}/>
        </>
      }
    />
  );
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
                  Cancel
              </AlertDialogCancel>
              <AlertDialogAction  onClick={handleDelete}>
                  Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

const PaymentModal = ({ jobListing }: { jobListing: JobListing }) => {
  const [duration, setDuration] = useState<JobListingDuration>()
  const [clientSecret, setClientSecret] = useState<string>()

  return (
    <Dialog>
      <DialogTrigger>
        <PublishDropDownOptions jobListing={jobListing} setDuration={setDuration} setClientSecret={setClientSecret}/>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-5rem)] flex flex-col max-w-3xl w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle>          {
            { expired: "Republish", active: "Extend", unpublished: "Publish" }[
              publishedStatus(jobListing.expiresAt)
            ]
          } {jobListing.title} for {duration} days</DialogTitle>
          <DialogDescription>
            This is a non-refundable purchase.
          </DialogDescription>
          
          {clientSecret && duration && <StripeForm duration={duration} clientSecret={clientSecret}/>}
          
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

type PublishDropDownOptionsProps = { 
  jobListing: JobListing, 
  setDuration: React.Dispatch<React.SetStateAction<JobListingDuration | undefined>> 
  setClientSecret: React.Dispatch<React.SetStateAction<string | undefined>> 
}

const PublishDropDownOptions = ({ jobListing, setDuration, setClientSecret }: PublishDropDownOptionsProps) => {

  // The DropdownMenuTrigger Button is currently a descendant of another button and that is a problem 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
        >
          {
            { expired: "Republish", active: "Extend", unpublished: "Publish" }[
              publishedStatus(jobListing.expiresAt)
            ]
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {JOB_LISTING_DURATIONS.map((duration, i) => (
          <DropdownMenuItem key={i} onClick={ async ()=> {
            setDuration(duration)
            const { clientSecret } = await createListingPublishPaymentIntent(jobListing.id, duration)
            setClientSecret(clientSecret)
          }}>
            <>{duration} Days - ${Math.round(getJobListingPriceInCents(duration)/100)}</>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};