import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import React, { useState } from "react";



export default function StripePaymentElement({paymentAmount}: {paymentAmount: string}) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/jobs/order-complete`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs", // 'tabs | 'accordion' | 'auto'
  }

  return (
    <form id="payment-form" onSubmit={onSubmit}>

      {errorMessage != null && <p id="payment-message" className="text-red-500 dark:text-red-900 text-sm mb-4">{errorMessage}</p>}
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button type="submit" disabled={isLoading || stripe == null || elements == null} id="submit" className="w-full mt-5">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : `Pay ${paymentAmount}`}
        </span>
      </Button>

    </form>
  );
}