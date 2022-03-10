//Auth API's

import * as APIS from "../config/Development/API";
import axios from "axios";

const API = APIS.DEV_API;
const VERSION = APIS.DEV_VERSION;

export const login = async (info) => {
  try {
    return await axios
      .post(`${API}${VERSION}/user/login`, { info })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((err) => {
        console.log("ERRRR", err.response);
        let { status, data } = err.response;
        if (status === 400) {
          return data;
        }
        if (status === 401) {
          return data;
        }
      });
  } catch (error) {
    return error;
  }
};

export const forgetUserPassword = async (info) => {};
