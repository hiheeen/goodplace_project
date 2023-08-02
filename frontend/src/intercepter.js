import axios from 'axios';

axios.interceptors.response.use(
    (resp) => console.log(resp),
    async (error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 400) {
            console.log('itititti');
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await api.post(
                'token/refresh/',
                { refresh: refreshToken }

                // { withCredentials: true }
            );
            if (response.status === 200) {
                axios.defaults.headers.common['Authorization'] = `Bearer
${response.data['access']}`;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                return axios(error.config);
            }
        }

        return error;
    }
);
