import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type Props = {
  isLoggingOut: boolean,
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const LogoutDialog = ({isLoggingOut, onOpenChange}: Props ) => {
  return (
    <Dialog open={isLoggingOut} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="space-y-4 gap-4 ">
            Logging Out
            <LoadingSpinner className="w-10 h-10 mt-3"/>
          </DialogTitle>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  );
};


export default LogoutDialog