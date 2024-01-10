
import axios from "axios";
const root2 = process.env.VUE_APP_BASE_API;
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    //字符串，对象，数组
    if (typeof o[key] === "string") {
      o[key] = o[key].trim();
    } else if (typeof (o[key] == "object")) {
      // alert(o[key]);
      o[key] = filterNull(o[key]);
    } else if (typeof o[key] == "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}
function apiAxios(method, url, params, success) {
  //整理参数
  if (params) {
    params = filterNull(params);
    console.log(params);
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: method === "post" || method === "put" ? params : null,
      params: method === "get" || method === "delete" ? params : null,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      baseURL: root2,
      withCredentials: false,
    })
      .then(function (res) {
        resolve(res.data);
      })
      .catch(function (error) {
        reject(error.response.data);
      });
  });
}
export default apiAxios;