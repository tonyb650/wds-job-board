import { OrderCompleteLoader } from "./OrderCompleteLoader";
import OrderCompletePage from "./OrderCompletePage";

export const orderCompleteRoute = {
  loader: OrderCompleteLoader,
  element: <OrderCompletePage/>,
}