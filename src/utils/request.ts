import axios, { AxiosRequestConfig, Method } from 'axios';

interface PendingType {
    url?: string;
    method?: Method;
    params: any;
    data: any;
    cancel: Function;
}

let pending: Array<PendingType> = [];

const CancelToken: any = axios.CancelToken;

const removePending: any = (config: AxiosRequestConfig) => {
    for (const key in pending) {
        const item: number = +key;
        const list: PendingType = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
            // 执行取消操作
            list.cancel('操作太频繁，请稍后再试');
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    }
};

 /* 创建axios实例 */
 const service = axios.create({
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use((request) => {
    removePending(request);
    request.cancelToken = new CancelToken((c: Function) => {
        pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c });
    });
    return request;
}, error => {
    return Promise.reject(error)
})


//响应拦截器
axios.interceptors.response.use((response) => {
    removePending(response.config);
    return response;
}, error => {
    return Promise.reject(error)
})




export default service;