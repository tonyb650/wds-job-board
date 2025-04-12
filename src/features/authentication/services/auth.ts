// This is handled in authProvider ??

import { baseApi } from "@/services/baseApi"; // AxiosInstance
import { User } from "../constants/types";
import { AxiosResponse } from "axios";
import { LoginFormValues } from "../components/LoginForm";

/* 
Not totally sure of the return type here:
  Promise<AxiosResponse<User, any>> ? (this is what is inferred)
  Promise<AxiosResponse<User>> ?
  Promise<AxiosResponse<User, AxiosError>> ?
*/
export function loginService ({email, password}: LoginFormValues): Promise<AxiosResponse<User, any>> {
  return baseApi.post<User>("/users/login", {email, password}) 
}