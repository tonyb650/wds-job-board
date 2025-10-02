import { PublicListingsLoader } from "./PublicListingsLoader";
import PublicListingsPage from "./PublicListingsPage";

export const publicListingsRoute = {
  element: <PublicListingsPage />,
  loader: PublicListingsLoader
};
