import Axios from "axios";
import { environnement } from "../environnement/env";

export const appAPI = () => {
  const axios = Axios.create(
    {
      baseURL: environnement.baseURL,
      // withCredentials: true
    }
  )

  /**
   * Request interceptors
   */
  axios.interceptors.request.use(request => {
    let _request = {
      ...request, headers: {
        ...request.headers,
        // Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }

    return _request;
  })

  return axios;
}
