import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './oz-project/Section/Header';
import MainSection from './oz-project/Section/MainSection';
import styled from 'styled-components';
import RegisterSection from './oz-project/Section/RegisterSection';
import SearchData from './oz-project/component/SearchData';
import RegisterBox from './oz-project/component/RegisterBox';

import SignUpForm from './oz-project/Section/SignUpForm';
import LogInForm from './oz-project/Section/LogInForm';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useEffect } from 'react';
import { api } from './api';
const Wrapper = styled.div``;

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    //로그인 버튼 클릭 이벤트
    // const navigate = useNavigate();
    // const handleClick = () => {
    //     localStorage.getItem('access_token') === null
    //         ? alert('로그인 후 이용해주세요')
    //         : navigate('/create_place/'); // true일 경우 뒤로가기 안 됨....이어야 하는데
    //     //홈에 있는 header에서 create_place로 이동 후 뒤로가기 한번엔 똑같은 create_place페이지,, 두 번 누르면
    //     //전에 남아있는 기록 창으로 간다. 왜???
    // };

    //토큰의 유효성 검사
    // const isTokenExpired = (token) => {
    //     const decodedToken = jwt_decode(token);
    //     const currentTime = Date.now() / 1000; // 현재 시간 (밀리초를 초로 변환)
    //     return decodedToken.exp < currentTime;
    // }; //토큰 만료여부 계산 => 불리언 타입으로 return , true이면 만료된 것
    // const refresh = async () => {
    //     const refreshToken = localStorage.getItem('refresh_token');
    //     const accessToken = localStorage.getItem('access_token');
    //     // refreshToken을 서버로 전송하여 새로운 access token을 발급받음
    //     // access토큰이 있고, access토큰이 만료되었다면 ?
    //     if (accessToken && isTokenExpired(accessToken)) {
    //         try {
    //             const response = await api.post(
    //                 'token/refresh/',
    //                 {
    //                     refresh: refreshToken,
    //                 },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${accessToken}`,
    //                     },
    //                 }
    //             );

    //             // const { access_token, refresh_token } = response.data;
    //             console.log(response.data);
    //             localStorage.clear();
    //             // 새로운 access token을 localStorage 등에 저장
    //             localStorage.setItem('access_token', response.data.access);
    //             localStorage.setItem('refresh_token', response.data.refresh);
    //             const newAccess = localStorage.getItem('access_token');
    //             await api.post('users/login/', newAccess);

    //             // console.log(localStorage.getItem('access_token'));
    //         } catch (error) {
    //             console.error('Refresh token request failed:...', error);
    //             // Refresh token 요청 실패에 대한 처리
    //         }
    //     }
    // };
    // useEffect(() => {
    //     refresh();
    // }, [isTokenExpired]);
    // const interceptRequest = async (config) => {
    //     const accessToken = localStorage.getItem('access_token');
    //     if (accessToken && isTokenExpired(accessToken)) {
    //         await refresh();
    //         // const newAccessToken = localStorage.getItem('access_token');
    //         // config.headers.Authorization = `Bearer ${newAccessToken}`;

    //         window.location.reload();
    //     } else {
    //         return config;
    //     }
    // };
    // useEffect(() => {
    //     interceptRequest();
    //     console.log('useEffect 실행');
    // }, []);
    // useEffect(() => {
    //     //     // api.interceptors.request.use(
    //     //     //     interceptRequest,

    //     //     //     (error) => {
    //     //     //         return Promise.reject(error);
    //     //     //     }
    //     //     // );
    //     api.interceptors.response.use(
    //         function (response) {
    //             return response;
    //         },
    //         async function (error) {
    //             const originalConfig = error.config;
    //             const status = error.response.status;
    //             const accessToken = localStorage.getItem('access_token');
    //             const refreshToken = localStorage.getItem('refresh_token');
    //             if (status === 401 || status === 400) {
    //                 await api
    //                     .post('token/refresh/', {
    //                         refresh: refreshToken,
    //                     })
    //                     .then((res) => {
    //                         localStorage.setItem(
    //                             'access_token',
    //                             res.data.access
    //                         );
    //                         originalConfig.headers['Authorization'] =
    //                             'Bearer ' + res.data.access;
    //                         return api(originalConfig);
    //                     })
    //                     .then((res) => window.location.reload());
    //             }
    //         }
    //     );
    // }, []);

    // axios.interceptors.response.use(
    //     (resp) => console.log(),
    //     async (error) => {
    //         if (
    //             error.response.status === 401 ||
    //             error.response.status === 400
    //         ) {
    //             console.log('itititti');
    //             const refreshToken = localStorage.getItem('refresh_token');
    //             const response = await api.post(
    //                 'token/refresh/',
    //                 { refresh: refreshToken }

    //                 // { withCredentials: true }
    //             );
    //             if (response.status === 200) {
    //                 axios.defaults.headers.common['Authorization'] = `Bearer
    //    ${response.data['access']}`;
    //                 localStorage.setItem('access_token', response.data.access);
    //                 localStorage.setItem(
    //                     'refresh_token',
    //                     response.data.refresh
    //                 );
    //                 return axios(error.config);
    //             }
    //         }

    //         return error;
    //     }
    // );
    return (
        <div>
            <BrowserRouter>
                <Wrapper>
                    <Reset />
                    <Header
                        registerDisplay="none"
                        centerDisplay="flex"
                        // handleClick={handleClick}
                        loggedIn={loggedIn}
                    />
                    <Routes>
                        <Route index={true} element={<MainSection />} />
                        <Route path="/signUp" element={<SignUpForm />} />
                        {/* <Route path="/form" element={<SearchData />} /> */}
                        <Route path="/logIn" element={<LogInForm />} />
                        <Route
                            path="/create_place"
                            element={<RegisterSection />}
                        />
                        <Route path="/modify_place" element="" />
                    </Routes>
                </Wrapper>
            </BrowserRouter>
        </div>
    );
}

export default App;
