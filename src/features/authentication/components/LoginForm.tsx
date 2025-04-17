import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import z from 'zod'

// import {loginSchema} from '@backend/constants/schemas/users'
// TODO for some reason, **importing** 'loginSchema' isn't working
// ChatGPT Says it's because 'z' as a named export and 'z' as default export are different,
// Makes sense, but still not working :(
// And actually, Kyle doesn't have consistency here either and it's working for him.

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

const DEFAULT_VALUES: LoginFormValues = {
  email: "",
  password: ""
}

const LoginForm = () => {
  const form = useForm<LoginFormValues>({ 
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES
  })

  const { login } =  useAuth()

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          form.setError("root", {message: error.response.data.message})
        } else {
          form.setError("root", {message: error.message || "Unknown fetching error"})
        }
      } else {
        form.setError("root", {message: "Unknown Error"})
      }
    }
  }
  
  
  return (
    <Form {...form}>
    {/* Form == FormProvider from react-hook-form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className='md:w-1/2 lg:w-1/3'>
        <Card className=''>
          <CardHeader>
            <CardTitle>
              Log in
            </CardTitle>
            {form.formState.errors.root?.message && 
              <CardDescription className="text-red-500 dark:text-red-900">
                {form.formState.errors.root.message}
              </CardDescription>
            }
          </CardHeader>
          <CardContent className='space-y-5'>
            {/* FormField seems to be a context provider that wraps the 'render' component for use with react-hook-form */}
            <FormField
              control={form.control} 
              name="email"
              render={({field}) => (
                <FormItem>
                  {/* FormItem seems to pass through a lot of stuff. Adds 'space-y-2' to everything. */}
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
            <FormField
              control={form.control} 
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
          </CardContent>

          <CardFooter className='flex gap-3 justify-end'>
            <Button type="reset" variant="ghost" asChild>
              <Link to="/">
                Cancel
              </Link>
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link to="/signup">
                Sign Up
              </Link>
            </Button>
            <Button type="submit" variant="secondary" disabled={!form.formState.isValid || form.formState.isSubmitting }>
              {form.formState.isSubmitting ? <LoadingSpinner/> : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export  {LoginForm}