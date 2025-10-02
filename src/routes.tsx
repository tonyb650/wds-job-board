import { AuthLayout, LoginForm, SignUpForm } from "@/features/authentication"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { Navigate, RouteObject } from "react-router"
import Private from "./components/routing/PrivatePage"
import { editListingRoute } from "./pages/listings/edit-listing"
import { publicListingsRoute } from "./pages/listings/job-listings"
import { MyListingsLoader } from "./pages/listings/my-listings/MyListingsLoader"
import MyListingsPage from "./pages/listings/my-listings/MyListingsPage"
import NewListingPage from "./pages/listings/new-listing/NewListingPage"
import { orderCompleteRoute } from "./pages/listings/oder-complete"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <AuthLayout/>,
            children: [
              { index: true, element:  <Navigate to="/login" replace /> },
              { path: "login", element: <LoginForm /> },
              { path: "signup", element: <SignUpForm /> },
            ],
          },
          {
            path: "tasks",
            children: [
              { index: true, element: <TaskListPage /> },
              { path: "new", element: <NewTaskPage /> },
            ],
          },
          {
            path: "jobs",
            children: [
              { index: true, ...publicListingsRoute},
              // The following is an example of not having an 'index' page for a route & loader
              { path: "my-listings",
                element: <Private><MyListingsPage /></Private>,
                loader: MyListingsLoader
              },
              { path: "new", element: <Private><NewListingPage /></Private> },
              { path: ":id/edit", ...editListingRoute},
              { path: "order-complete", ...orderCompleteRoute},
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
