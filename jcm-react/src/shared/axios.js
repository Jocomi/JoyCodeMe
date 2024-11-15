import axios from "axios";

const instance = axios.create({
  headers: { "Content-Type": "application/json"},
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
    console.log(config);
    if (sessionStorage.getItem('loginUser') === null) {
        window.location.href = "/emptyUser";  // 페이지 리로드
        return Promise.reject("Not logged in");  
      }
    return config;
},
(err) => {
    return Promise.reject(err);
});

export default instance;