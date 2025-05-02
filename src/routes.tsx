import { AuthLayout, LoginForm, SignUpForm } from "@/features/authentication"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { Navigate, RouteObject } from "react-router"
import { EditListingLoader } from "./pages/listings/EditListingLoader"
import EditListingPage from "./pages/listings/EditListingPage"
import { MyListingsLoader } from "./pages/listings/MyListingsLoader"
import MyListingsPage from "./pages/listings/MyListingsPage"
import NewListingPage from "./pages/listings/NewListingPage"
import Private from "./layouts/PrivateLayout"

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
            element: <Private/>,
            children: [
              { path: "new", element: <NewListingPage /> },
              { index: true,
                element: <MyListingsPage />,
                loader: MyListingsLoader
              },
              { path: ":id/edit", 
                element: <EditListingPage />,
                loader: EditListingLoader
              },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
