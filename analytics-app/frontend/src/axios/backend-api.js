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
    }
  };

  const response = await axios({
    method: 'get',
    url: url,
    headers: {
      Authorization: token,
    },
    responseType: 'arraybuffer',
    maxContentLength: 200000000000000000,
  });
  return response;
};