import { message } from "antd";
import axios from "axios";

export function loginUser(username, password) {
  return axios
    .post(`http://localhost:8080/login/${username}/${password}`)
    .then((data) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}

export function getUsers() {
  return axios
    .get(`http://localhost:8080/usuarios`)
    .then(({ data }) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}

export function createUser(newUser) {
  return axios
    .post(`http://localhost:8080/usuarios`, newUser)
    .then(({ data }) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}

export function updateUser(updatedUser) {
  return axios
    .put(`http://localhost:8080/usuario/${updatedUser.userId}`, updatedUser)
    .then(({ data }) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}

export function getRoles() {
  return axios
    .get(`http://localhost:8080/roles`)
    .then(({ data }) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}

export function createRole(newRole) {
  return axios
    .post(`http://localhost:8080/roles`, newRole)
    .then(({ data }) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}

export function updateRole(updatedRole) {
  return axios
    .put(`http://localhost:8080/roles/${updatedRole.id}`, updatedRole)
    .then(({ data }) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}

export function getPermits() {
  return axios
    .get(`http://localhost:8080/permisos`)
    .then(({ data }) => data)
    .catch((error) => {
      message.error("Ha ocurrido un error");
      return Promise.reject(error.response);
    });
}
