import { Auth } from 'aws-amplify';
import axios from "axios";

export const getRequest = async (path, payload={}) =>{
    payload["endpoint"] = import.meta.env.VITE_APP_APPSYNC_ENDPOINT

    const url = import.meta.env.VITE_APP_BACKEND_URL + path + "?" + (new URLSearchParams(payload))

    const token = (await Auth.currentSession()).idToken.jwtToken;
    const config = {
        headers:{
          Authorization: token
        }
      };

    return axios.get(url, config)
}