// This is handled in authProvider ??

import { baseApi } from "@/services/baseApi"; // AxiosInstance
import { Session, User } from "../constants/types";
import { AxiosResponse } from "axios";
import { LoginFormValues } from "../components/LoginForm";
import { SignupFormValues } from "../components/SignUpForm";

/* 
Not totally sure of the return type here:
  Promise<AxiosResponse<User, any>> ? (this is what is inferred)
  Promise<AxiosResponse<User>> ?
  Promise<AxiosResponse<User, AxiosError>> ?
*/
export function loginService (formData: LoginFormValues): Promise<AxiosResponse<User, any>> {
  return baseApi.post<User>("/users/login", formData) 
}

export function signupService (formData: SignupFormValues): Promise<AxiosResponse<User, any>> {
  return baseApi.post<User>("/users/signup", formData) 
}

export function logoutService (): Promise<void> {
  return baseApi.delete("/users/logout") 
}

export function getLoggedInUserService (): Promise<Session | undefined> {
  return baseApi.get<Session | undefined>('/users/session').then(res => res.data)
}
