import { Auth } from 'aws-amplify';
import axios from "axios";

export const getRequest = async (path, payload = {}) => {
  payload["endpoint"] = import.meta.env.VITE_APP_APPSYNC_ENDPOINT;
  const url = import.meta.env.VITE_APP_BACKEND_URL + path + "?" + new URLSearchParams(payload);

  const token = (await Auth.currentSession()).idToken.jwtToken;
  const config = {
    headers: {
      Authorization: token
    }
  };
  try {
    const response = await axios.get(url, config);
    return response.data.res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRequestFile = async (path, payload={}) => {
  payload["endpoint"] = import.meta.env.VITE_APP_APPSYNC_ENDPOINT;
  const url = import.meta.env.VITE_APP_BACKEND_URL + path + "?" + new URLSearchParams(payload);

  const token = (await Auth.currentSession()).idToken.jwtToken;
  const config = {
    headers: {
      Authorization: token
    },
    responseType: 'blob'
  };

  const response = await axios.get(url, config);
  console.log('got response')
  return response;
};