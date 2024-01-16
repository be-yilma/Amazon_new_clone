import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:4242",
  baseURL: "https://buzu-amazon.cyclic.app/",
});

export default instance;
