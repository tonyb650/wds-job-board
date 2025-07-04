# Forbid Cross-Feature Imports using ESLint

snippet from `eslintrc.cjs`
```json
rules: {
  "react-refresh/only-export-components": "warn",
  "import/no-restricted-paths": [
    "error",
    {
      basePath: "./src",
      zones: [
        {
          target: ["./!(features)/**/*", "./!(features)*"],
          from: ["./features/*/!(index.*)", "./features/*/!(index.*)/**/*"],
          message:
            "Cannot import anything except the index file within a feature folder",
        },
      ],
    },
  ],
},
```

# Radix UI 
### Radix UI Dialog
Styling a Radix Dialog with Tailwind CSS (Sam Selikoff)\
https://www.youtube.com/watch?v=KvZoBV_1yYE

Dismissing a Radix Dialog after a form submission (Programmatically)\
https://www.youtube.com/watch?v=3ijyZllWBwU

### Slot & 'asChild'
About RadixUI 'Slot' & 'asChild': https://www.youtube.com/watch?v=r0I-pzcE8dg

# Handling conditional styling
### clsx
About 'clsx': A tiny library that conditionally adds styles. In the following example, if `isPrimary === true` then `text-3xl` will be added to the classes.
```javascript
<h1 className = {clsx("text-center text-grey-800", {"text-3xl": isPrimary})}>
  TITLE
</h1>
```

### twMerge
About 'twMerge': In the following example, if we add 'twMerge', we will not get both `text-grey-800` and `text-blue-500` when `isPrimary === true`. It is smart enough to remove conflict default TW classes.
```javascript
<h1 className = {twMerge(clsx("text-center text-grey-800", {"text-3xl text-blue-500": isPrimary}))}>
  TITLE
</h1>
```

### cn
About 'cn' from ShadCN: "It is a tiny (239B) utility for constructing className strings conditionally. Also serves as a faster & smaller drop-in replacement for the classnames module."
What 'cn' does in practice, is essentially combine twMerge and clsx. See example:
```javascript
<h1 className = {cn("text-center text-grey-800", {"text-3xl text-blue-500": isPrimary})}>
  TITLE
</h1>
```
Here's the function: 
```javascript
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

### To make variants and add extra classes (How ShadCN components works)
```javascript
const FancyHeading = ({variant, className}) => {

  const getVariantStyle = (variant) => {
    switch (variant) {
      case 'primary':
        return "text-center text-3xl text-blue-500"
      case 'secondary':
        return "text-center text-xl text-green-500"
      default:
        return "text-center text-grey-800"
    } 
  }
  return (
    <h1 className = {cn(getVariantStyle(variant), className)}>
      TITLE
    </h1>
  )
}
```
Source: https://www.youtube.com/watch?v=9Km4oFSmXY8

### cva
About 'cva' (class-variance-authority):
'cva' let's us manage us create attributes like 'intent' and 'size' and manage the styling for those variations of a component very cleanly.
https://www.youtube.com/watch?v=qGQRdCg6JRQ (Brooks Lybrand)

# Icon Components:
lucide-react


# Implementation of API services / Axios on the front end

1) `BaseAPI` creates an AxiosInstance that provide base URL and 'credentials: true'
2) `loginService` takes the `email` & `password` and returns a `Promise<AxiosResponse<User, any >>`
3) `login` method is provided by `authContext`. When it is called, it takes the `email` & `password` and returns a `Promise<User>>`. It does this by calling `loginService` and then calling .then(res => res.data) on the promise returned by `loginService`
4) `useAuth` is the hook that makes the `authContext` available in our components. It basically 'passes through' everything from `authContext` untouched
5) In our form handler, we call the `login` method from our `authContext`. If an error is thrown at any point, we can catch it here with try/catch or .catch(). The error should be of type `AxiosError`

# New techniques or ideas
* Use Axios interceptor to inject a delay on calls to the back end (when turned on in .env)
* Limit ability to import/export so that good file structure is maintained. Explicitly exporting needed items in an 'index.ts' file specifically for this purpose.
* with react-hook-form, use form.formState.isValid to disable submit button until signUp form is filled in correctly
* Passing in entire sub-components in as props is OK. e.g.: {headerDetails} {footerBtns} in JobListingCard - maybe the term 'named slot' is appropriate here
* Component name can be thought of as a string variable:
  ```javascript
    import { User } from "lucide-react"
    let Icon: LucideIcon = User
    <Icon/>
    is the same as 
    <User/>
  ```
* For components that display a list (array) of records (MyJobListingGrid), we are using a loader (useLoaderData hook) to fetch the initial arra of records. Then, when we DELETE a record, we are mantaining a arra of deleted records (with useState) and we filter out the deleted records from the original arra or records each time the component re-renders. This means that the loader never runs again if we are merely deleting records. 
* Kyle makes a practice of passing the bare minimum of what is needed to functions. For example, when deleting a job listing, he only passes the `id` string instead of the whole `jobListing` object
* 

# Stripe
Conceptually, how does Stripe work?
## Stripe Account
When you set up your Stripe account, you get a "Publishable Key" and a "Secret Key". The secret key is used in the back end to instatiate Stripe, the publishable key is used to instantiate Strip on the front end.

Somewhere in your app, you will have a page with the Stripe form, perhaps a modal. You should have a state variable that holds the 'clientSecret' in that component. Upon mounting of that page/component, fire a useEffect to 'create a payment intent'. This is a call to your backend that sends information like what item the user is buying and the quantity (BUT NOT THE PRICE - that is safely calculated in the back end). This API call returns the 'clientSecret' that you store in state and use later.

There is more than one way to render the Stripe form, but in this case we use `<PaymentElement/>` wrapped by a `<form>` and then wrapped by `<Elements>` which are both components provided by 'react-stripe-js'. Together, these components handle the rendering of payment form. On the same page as the `<form>` we bring in the 'useStripe()' hook and the 'useElements()' hook.

Set up a 'handleSubmit' function for the `<form>`. The stripe object returned from the 'useStripe' hook has a `confirmPayment` method on it. When the form is submitted, we call that 'confirmPayment' method and pass the 'elements' (from useElements) as well as 'return_url' to send the user to after the payment attempt is processed. When the 'confirmPayment' is called, that is reaching out to Stripe and validating the attempted payment. If the payment is successful, then Stripe sends a POST request to our back end (in this case at '/job-listing-order-complete'). The back end processes the POST requests and decodes an 'event'. If the 'event.type' == "payment_intent.succeeded", then we should process the customers order and give them what they paid for!

Meanwhile, if there was no immediate error when running the 'confirmPayment' method, that function will automatically redirect the user to the 'return_url' specified. Note that search params are added to the 'return_url': "payment_intent", "payment_intent_client_secret", and "redirect_status". 

At the 'return_url' page (in this case "OrderCompletePage.tsx"), we use the 'loadStripe' function from '@stripe/stripe-js' to get and await an instance of Stripe. On this instance, we call `.retrievePaymentIntent()` and pass it the clientSecret that was included in the redirect_url. Presumably, this method reaches out to Stripe servers and gives us a 'status' property that is a pre-defined string that we can switch on to render a status message to our user.

### Stripe Links/Resources
dashboard.stripe.com/settings/payment_methods

The stripe-js libary provides the <Elements> component
https://docs.stripe.com/payments/elements

The Elements component wraps the PaymentElement component
https://docs.stripe.com/payments/payment-element

Here is the actual sample code that Stripe offers for Node server and React client:
https://docs.stripe.com/payments/quickstart?client=react