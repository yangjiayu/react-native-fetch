/**
 * Created by yang on 16/7/28.
 */

export const postFetch = (url:string) => (textData:string) => {
  return fetch(url, {
    method: 'POST',
    body: textData,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
};

export const getFetch = (path:string) => {
  return fetch(path, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
};

export const convertRespToJson = (resp) => {
  try {
    return resp.json();
  } catch (e) {
    throw e;
  }
};
// 获取请求时间
export function promiseFunCost(promise) {
  const startTime = new Date().getTime();
  return promise.then(result => {
    const costTime = new Date().getTime() - startTime;
    return [result, costTime];
  }).catch(error => {
    const costTime = new Date().getTime() - startTime;
    throw [error, costTime];
  });
}
// 监听超时
export const promiseTimeout = (time)=>(promise) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('请求超时'));
    }, time);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
};

export const loggerFetch = (log) => (prefix, promise) => {
  return promiseFunCost(promise).then(([result, cost]) => {
    log.info(`${prefix} success: ${JSON.stringify(result)} cost: ${cost}`);
    return result;
  }).catch(([error, cost]) => {
    log.warn(`${prefix} fail: ${error} cost: ${cost}`);
    throw error;
  });
};

export function getParam(data:{}):string {
  return Object.entries(data).filter(([key, value])=> {
    return value !== null && value !== undefined;
  }).map(([key, value]) => {
    return `${encodeURI(key)}=${encodeURI(value)}`;
  }).join('&');
}