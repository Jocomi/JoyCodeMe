import axios from "axios";

const instanceAdmin = axios.create({
  headers: { "Content-Type": "application/json"},
  timeout: 5000,
});

instanceAdmin.interceptors.request.use((config) => {
    console.log(sessionStorage.getItem('loginUser'));
    if (sessionStorage.getItem('loginUser') === null) {
        window.location.href = "/emptyAdmin";  // 페이지 리로드
        return Promise.reject("Not logged in");  
      }
    return config;
},
(err) => {
    return Promise.reject(err);
});

export default instanceAdmin;