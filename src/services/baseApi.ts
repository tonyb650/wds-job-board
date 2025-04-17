import { env } from "@/constants/config";
import axios, { AxiosInstance } from "axios";

/* baseApi is an AxiosInstance */
export const baseApi: AxiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true
})

/*
  If turned on, an interceptor is placed on the axios request.
  The interceptor is passed the request object and then returns a
  Promise that calls the resolve method after a 1000ms delay
*/
if (env.VITE_TEST_SLOW_API) {
  console.log("Slowing")
  baseApi.interceptors.request.use((req) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(req)
      }, 1000)              
    })
  })
}
