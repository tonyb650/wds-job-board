import axios, { AxiosInstance } from "axios";

/* baseApi is an AxiosInstance */
export const baseApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})