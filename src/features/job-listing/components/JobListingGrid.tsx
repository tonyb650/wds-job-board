import { cn } from "@/utils/shadcnUtils";
import { ComponentProps } from "react";

type Props = ComponentProps<'div'>
/*
  I'm not totally comfortable with the ...props here.
  What is going on?
  First of all, somehow 'children' is handled by this. 
  I guess if we think about how the DOM is rendered, children are just one of the props of
  the DOM element.
  In React, we think about explicitly placing {children} somewhere in our JSX, but if we
  only have one HTML element then anything inside that element will be part of its props.
  Is there anything special about the word 'props'? No, this could be called 'divStuff' 
  if we wanted.
  But why is the Typescript typing working here? Shouldn't it be:
  type Props = {
    className: string,
    props: ??
  }
  Well, let's look at what type that TS infers... props: {}
  I think maybe I've been overlooking a fundamental part of using TS. 
  Yes, when we type an object, we do not have to type EVERY property
  of the object. By using the rest syntax we can have additional properties in the object that are not typed,
  we just won't get type safety and Intellisense.
  In this case, we have a function and we are passing a single argument.
  That argument is an object.
  That object has lots of properties. We are only going to explicitly use ONE of those properties (classname),
  the rest are just being passed along...
  AHA! This doesn't work in the consuming JSX though! We need to pass children and TS doesn't know about it.
  That's where ComponentType<'div'> comes in. It covers ALL the props, INCLUDING className
*/
const JobListingGrid = ({className, ...props}: Props) => {  //<-- Props == ComponentProps<'div'> from 'react'

  /*
    Now let's talk about the grid CSS:
    'flex flex-col gap-4' covers very small screens.

    Above that, we switch to 'grid'
    We keep the 'gap-4'
    But then we dynamically generate the number of columns with this:
    'grid-cols-[repeat(auto-fill, minmax(400px,1fr))]'
    How does this work?
    Repeats automatically.
    Minimum size they can be is 400px
    So, the media query says: "Do we have 800px to work with? If no we have one column of 1fr. If yes, we have 2 repeating columns of 1fr each. 
    Do we have 1200px to work with? If yes, we are making 3 repeating columns of 1fr each"

  */
  return (
    <div {...props} className={cn("flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))] ", className)}>
    </div>
  );
};

export default JobListingGrid;
