import Private from "@/components/routing/PrivatePage";
import { EditListingLoader } from "./EditListingLoader";
import EditListingPage from "./EditListingPage";

export const editListingRoute = {
  loader: EditListingLoader,
  element: <Private><EditListingPage/></Private>,
}

/*
It looks like the <PrivatePage> wrapper goes inside the element here.
Maybe this makes the session load before firing the loader ??

export const editJobListingRoute = {
  loader,
  element: (
    <PrivatePage>
      <EditJobListingPage />
    </PrivatePage>
  ),
}

*/