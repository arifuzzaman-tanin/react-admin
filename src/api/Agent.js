import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "https://jsonplaceholder.typicode.com";

const responseBody = (response) => response.data;
const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, param) => axios.post(url, param).then(responseBody),
};
const auth = {
  login: (param = {}) => request.get("users", param),
};
const user = {
  list: () => request.get("users"),
  getById: (id) => request.get("users/" + id),
};

export default {
  user,
  auth,
};
