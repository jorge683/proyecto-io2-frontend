import { message } from "antd";
import axios from "axios";

export function loginUser(username, password) {
  return axios
    .post(`http://localhost:8080/login/${username}/${password}`)
    .then(({ data }) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}
