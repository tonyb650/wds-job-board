import { env } from "@/constants/config";
import { loadStripe } from "@stripe/stripe-js";



import { LoaderFunctionArgs } from "react-router";

const responseMessages = ["Something went wrong" , "Payment succeeded" , "Your payment is processing" , "Your payment was not successful, please try again"] as const
type ResponseMessage = (typeof responseMessages)[number]

export function OrderCompleteLoader({ request: { url } }: LoaderFunctionArgs): {
    messagePromise: Promise<ResponseMessage>;
} {
  // get searchParams from URL
  const searchParams = new URL(url).searchParams

  // get ClientSecret from searchParams
  const clientSecret = searchParams.get("payment_intent_client_secret")
  
  // get Stripe instance using public key
  const stripePromise = loadStripe(env.VITE_STRIPE_PUBLISHABLE_KEY);

  // await Stripe instance and return message string based on return value of {paymentIntent.status}
  return {
    messagePromise: stripePromise.then(stripe => {
      if (stripe == null || clientSecret == null) {
        return "Something went wrong"
      }

      return stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case "succeeded":
              return "Payment succeeded"
            case "processing":
              return "Your payment is processing"
            case "requires_payment_method":
              return "Your payment was not successful, please try again"
            default:
              return "Something went wrong"
          }
        })
    }),
  }
}


/*
More closely matches Stripe documentation

// import { stripePromise } from "@/lib/stripe"
type Responses = {
  status: PaymentIntent.Status;
  intentId: string;
};

export const OrderCompleteLoader = async (): Promise<Responses> => {

  // should get this through LoaderFunctionArgs
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  const stripePromise = loadStripe(env.VITE_STRIPE_PUBLISHABLE_KEY);

  const stripeConst = await stripePromise;
  const res = await stripeConst?.retrievePaymentIntent(clientSecret || "");

  const status = res?.paymentIntent?.status || "canceled";
  const intentId = res?.paymentIntent?.id || "";

  return { status, intentId };
};
*/

