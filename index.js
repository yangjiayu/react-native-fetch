import config from './config';
import {
  loggerFetch,
  convertRespToJson,
  promiseFunCost,
  getParam,
  postFetch,
  getFetch,
  promiseTimeout
} from '../util/httpHelper';

const requestUrl = (path) => config.url + path;
const requestWrap = promiseTimeout(config.time); //设置超时时间

// 账号过期，重新登录
function tokenOutDate(uri, data, request, reRequest) {
  return request.catch(e => {
    if(e.code === 404){
      return postRequest('login')({
        password: config.password,
        userName: config.userName,
      }).then(result => {
        return reRequest(uri)(data);
      });
    }
    throw e;
  });
}

export const postRequest = (uri:string) => (data) => {
  const textData = JSON.stringify(data);
  const url = requestUrl(uri);
  const request = postFetch(url)(textData).then(convertRespToJson);
  return tokenOutDate(
    uri,
    data,
    loggerFetch(config.log)(`POST ${url} ${textData}`, requestWrap(request)),
    postRequest
  );
};

export const getRequest = (uri:string) => (data:{} = {}) => {
  const param = getParam(data);
  const urlWithParam = requestUrl(`${uri}?${param}`);
  const request = getFetch(urlWithParam).then(convertRespToJson);
  return tokenOutDate(
    uri,
    data,
    loggerFetch(config.log)(`GET ${urlWithParam}`, requestWrap(request)),
    getRequest
  );
};
