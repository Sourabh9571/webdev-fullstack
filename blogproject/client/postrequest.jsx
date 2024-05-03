import axios from "axios";

export const makerequest = axios.create({
  baseURL: "http://localhost:8888/api/",
  withCredentials: true,
});
