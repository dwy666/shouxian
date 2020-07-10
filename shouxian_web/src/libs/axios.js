import axios from 'axios'

const $axios = axios.create({
    baseURL: "",  // api的base_url
    timeout: 5000  // 请求超时时间
});

$axios.interceptors.request.use(
    config => {
        if (config.method === 'post') {
        } else {
            config.params = { ...config.params };
        }
        return config;
    },
    error => {
        //请求错误处理
        Promise.reject(error)
    }
);

$axios.interceptors.response.use(
    response => {
            return response.data;
    },
    error => {
        //响应错误处理
        console.log('axois error');
        return Promise.reject(error);
    }
);

export default $axios;
