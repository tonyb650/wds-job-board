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