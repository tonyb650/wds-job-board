import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { getJobListingPriceInCents } from "@backend/utils/getJobListingPriceInCents";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance } from "@stripe/stripe-js";
import { JobListingDuration } from "../constants/schemas";
import { stripePromise } from "../helpers/stripe";
import StripePaymentElement from "./StripePaymentElement";
import useTheme from "@/hooks/useTheme";


type StripeFormProps = {
  duration: JobListingDuration,
  clientSecret: string,
}

function StripeForm({clientSecret, duration }: StripeFormProps) {
  const { isDark } = useTheme()

  const appearance: Appearance = {
    theme: isDark ?  'night' : 'stripe', // 'stripe' | 'night' | 'flat'
  }

  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto'// 'auto' | 'always' | 'never' 

  // TODO: if duration is undefined, how to handle? Maybe no duration will mean no clientSecret and perpetual spinner?

  return (
    <div>
      {clientSecret && duration ? (
        <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
          {/* <Routes>
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/complete" element={<CompletePage />} />
          </Routes> */}
          <StripePaymentElement paymentAmount={`$${Math.round(getJobListingPriceInCents(duration)/100)}`}/>
        </Elements>
      ): 
        <LoadingSpinner/>
      }
    </div>
  );
}

export default StripeForm