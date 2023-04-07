import axios from "axios";

 class Http {
  constructor() {
    axios.defaults.baseURL="http://localhost:3002"
    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    return axios.get(url, config);
  }
  post(url, data, config) {
    return axios.post(url, data, config);
  }
  put(url, data, config) {
    return axios.put(url, data, config);
  }
  patch(url, data, config) {
    return axios.patch(url, data, config);
  }
  delete(url, config) {
    return axios.delete(url, config);
  }
}
export default new Http()
