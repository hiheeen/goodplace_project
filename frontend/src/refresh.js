import jwt_decode from 'jwt-decode';
import { api } from './api';

const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // 현재 시간 (밀리초를 초로 변환)
    return decodedToken.exp < currentTime;
}; //토큰 만료여부 계산 => 불리언 타입으로 return , true이면 만료된 것
export const refresh = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const accessToken = localStorage.getItem('access_token');
    // refreshToken을 서버로 전송하여 새로운 access token을 발급받음
    // access토큰이 있고, access토큰이 만료되었다면 ?
    if (accessToken && isTokenExpired(accessToken)) {
        try {
            const response = await api.post(
                'token/refresh/',
                {
                    refresh: refreshToken,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // const { access_token, refresh_token } = response.data;
            console.log(response.data);
            localStorage.clear();
            // 새로운 access token을 localStorage 등에 저장
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            // const newAccess = localStorage.getItem('access_token');
            // await api.post('users/login/', newAccess);

            // console.log(localStorage.getItem('access_token'));
        } catch (error) {
            console.error('Refresh token request failed:...', error);
            // Refresh token 요청 실패에 대한 처리
        }
    }
};
