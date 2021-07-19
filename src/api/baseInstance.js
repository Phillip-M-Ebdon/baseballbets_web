import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000",
    header: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,HEAD"
      },
    withCredentials: true,
    // use this so we don't need to try/catch on non-200 status codes
    validateStatus: (status) => {
    return true;
  },
});