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

