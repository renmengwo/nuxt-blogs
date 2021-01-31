import axios from 'axios';
import { Message } from 'iview'
import { getToken } from '../assets/utils/Cookies'
const service = axios.create({
  // baseURL: '/rcsapi',
  timeout: 3000
});
function AlertMsg (type, content) {
  Message[type]({
    content,
    duration: 5
  })
}

let num = 0;
function statusHandle (status) {
  switch (status) {
    /* case 401:
      // delCookie('erpSession');
      // delCookie('u_uuid');
      router.replace({
        path: '/login'
      });
      break;
    case 403:
      router.replace({
        path: '403'
      });
      break; */
    case 500:
      if (num < 1) {
        AlertMsg('error', '服务正在启动中，请稍后。( ꒪Д꒪)ノ')
      }
      num++;
      break;
    case 404:
      AlertMsg('error', '你所访问的地址不存在');
      break;
    case 405:
      AlertMsg('error', '你访问的资源被禁止');
      break;
    case 406:
      AlertMsg('error', '客户端无法接受你的要求');
      break;
    case 407:
      AlertMsg('error', '需要你的身份验证');
      break;
    case 501:
      AlertMsg('error', '服务器方法未实现');
      break;
    case 502:
      AlertMsg('error', '网关错误');
      break;
    case 503:
      AlertMsg('error', '服务器被攻击，无法处理请求');
      break;
    case 504:
      AlertMsg('error', '网关超时');
      break;
    default:
      AlertMsg('error', '其他问题，请联系管理员');
      break;
  }
}

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    /* if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token
    } */
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8' // 设置跨域头部
    };
    if (getToken()) {
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      statusHandle(response.status);
    } else if (response.data.status !== 1) {
      AlertMsg('error', response.data.msg);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      statusHandle(error.response.status);
    }
    return Promise.reject(error);
  }
);

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch (url, params = {}) {
  return service({
    url: `${url}`,
    method: 'get',
    params
  });
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return service({
    url: `${url}`,
    method: 'post',
    data
  });
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
  return service({
    url: `${url}`,
    method: 'put',
    data
  });
}

/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del (url, data = {}) {
  return service({
    url: `${url}`,
    method: 'delete',
    data
  });
}
