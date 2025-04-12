import { Navigate, RouteObject } from "react-router"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import LoginForm from "./features/authentication/components/LoginForm"
import SignUpForm from "./features/authentication/components/SignUpForm"
import AuthLayout from "./features/authentication/layouts/AuthLayout"

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
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
