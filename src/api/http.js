/* eslint-disable */
import axios from 'axios';
/* eslint-disable */
import {
  Message
} from 'element-ui';
import router from "../router";

// console.log('router ===>>>', router);

const baseURL = process.env.API_HOST;

const timeout = 30000; // 超时时间
axios.interceptors.request.use(config => {
  // 这里的config包含每次请求的内容
  // config.headers['Access-Control-Allow-Headers'] = '*';
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.token = `${token}`;
  }
  // config.withCredentials = true;
  return config;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.resolve(error.response);
});

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  // console.log('response', response);
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    if (response.data.code === 1) {
      // code = 1时 登录超时
      return {
        status: 300,
        msg: response.data.msg
      };
    } else if (response.data.code === -1) {
      // code = -1时 请求失败
      // Message.error(response.data.msg);
      return {
        status: 404,
        msg: response.data.msg
      };
    } else if (response.data.code === 0 || response.data.code === 2) {
      // code = 0时 请求正常，正常返回
      return response;
    }
  } else {
    // 异常状态下，把错误信息返回去
    Message.error('网络异常');
    return {
      status: 500,
      msg: '网络异常'
    };
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === 404) {
    Message.error(res.msg);
  }
  if (res.status === 300) {
    Message.warning(res.msg);
    setTimeout(() => {
      router.push('/login')
      // window.location.href = '#/login';
      sessionStorage.clear();
    }, 1200);
  }
  return res;
}
// 请求方式的配置
export default {
  post(url, data) { //  post
    return axios({
      method: 'post',
      baseURL: baseURL,
      url,
      data: JSON.stringify(data),
      timeout: timeout,
      headers: {
        'Content-Type': "application/json"
      }
    }).then((response) => {
      return checkStatus(response);
    }).then((res) => {
      return checkCode(res);
    });
  },
  get(url, params) { // get
    return axios({
      method: 'get',
      baseURL: baseURL,
      url,
      params, // get 请求时带的参数
      timeout: timeout,
    }).then((response) => {
      return checkStatus(response);
    }).then((res) => {
      return checkCode(res);
    });
  },
  put(url, params) {
    return axios.put(`${baseURL}/${url}`, params, {
      headers: {
        "Content-type": "application/json",
      }
    }).then(response => {
      return checkStatus(response);
    }).then(res => {
      return checkCode(res);
    });
  },
  delete(url, params) { // delete
    return axios({
      method: 'delete',
      baseURL: baseURL,
      url,
      params, // delete 请求时带的参数
      timeout: timeout,
      headers: {
        'Content-Type': "application/json"
      }
    }).then(response => {
      return checkStatus(response);
    }).then(res => {
      return checkCode(res);
    });
  }
};
