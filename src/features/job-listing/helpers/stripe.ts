import { env } from "@/constants/config";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
export const stripePromise = loadStripe(env.VITE_STRIPE_PUBLISHABLE_KEY);
