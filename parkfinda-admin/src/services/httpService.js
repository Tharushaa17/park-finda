import axios from "axios";
import { auth } from "../helpers/Firebase";
import { servicePath } from "../constants/defaultValues";

const instance = axios.create({
  baseURL: 'https://staging-parkfinda-api.eu-west-2.elasticbeanstalk.com/api/v1/' ,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(async function (config) {
  let currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken()
    config.headers.Authorization = token;
  } else {
    await Promise.all([
      new Promise(function (resolve, reject) {
        auth.onIdTokenChanged(function (user) {
          if (user) {
            // User is signed in.
            resolve();
          } else {
            // No user is signed in.
            reject();
          }
        });
      }),
    ]);
    currentUser = auth.currentUser;
    const token1 = await currentUser.getIdToken();
    config.headers.Authorization = token1;
  }
  return config;
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
