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
const Wrapper = styled.div``;

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    //로그인 버튼 클릭 이벤트
    const navigate = useNavigate;
    const handleClick = () => {
        localStorage.getItem('access_token') === null
            ? alert('로그인 후 이용해주세요')
            : navigate('/create_place', { replace: true }); // true일 경우 뒤로가기 안 됨....이어야 하는데
        //홈에 있는 header에서 create_place로 이동 후 뒤로가기 한번엔 똑같은 create_place페이지,, 두 번 누르면
        //전에 남아있는 기록 창으로 간다. 왜???
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('access_token');
    //     if (token && !(token === ('undefined' || 'null'))) {
    //         // 토큰이 존재하면 유효성 검사를 수행
    //         const decodedToken = jwt_decode(token);

    //         // 토큰의 만료 시간 확인
    //         const currentTime = Date.now() / 1000; // 현재 시간 (밀리초를 초로 변환)
    //         if (decodedToken.exp < currentTime) {
    //             localStorage.clear();
    //             // setLoggedIn(false);
    //             const refreshToken = localStorage.getItem('refresh_token');
    //             axios
    //                 .post(
    //                     'http://localhost:8000/api/v1/token/refresh/',
    //                     { refresh: refreshToken },
    //                     {
    //                         headers: {
    //                             Authorization: `Bearer ${refreshToken}`,
    //                         },
    //                     },
    //                     { widthCredentials: true }
    //                 )
    //                 .then((res) => {
    //                     localStorage.setItem(
    //                         'access_token',
    //                         res.data.access_token
    //                     );
    //                     localStorage.setItem(
    //                         'refresh_token',
    //                         res.data.refresh_token
    //                     );
    //                     setLoggedIn(true);
    //                 })
    //                 .catch((err) => {
    //                     console.error('token refresh failed', err);
    //                     localStorage.removeItem('access_token');
    //                     localStorage.removeItem('refresh_token');
    //                     setLoggedIn(false);
    //                 });
    //         } else {
    //             // 토큰이 유효한 경우 로그인 상태로 설정
    //             setLoggedIn(true);
    //         }
    //     } else {
    //         // 토큰이 없으면 로그아웃 상태로 설정
    //         setLoggedIn(false);
    //     }
    // }, []);
    //토큰의 유효성 검사

    useEffect(() => {
        const isTokenExpired = (token) => {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000; // 현재 시간 (밀리초를 초로 변환)
            return decodedToken.exp < currentTime;
        }; //토큰 만료여부 계산 => 불리언 타입으로 return , true이면 만료된 것

        const refresh = async () => {
            const refreshToken = localStorage.getItem('refresh_token');
            const accessToken = localStorage.getItem('access_token');
            // refreshToken을 서버로 전송하여 새로운 access token을 발급받음
            // access토큰이 있고, access토큰이 만료되었다면 ?
            if (accessToken && isTokenExpired(accessToken)) {
                try {
                    const response = await axios.post(
                        'http://localhost:8000/api/v1/token/refresh/',
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
                    localStorage.setItem(
                        'refresh_token',
                        response.data.refresh
                    );
                    console.log(localStorage.getItem('access_token'));
                } catch (error) {
                    console.error('Refresh token request failed:...', error);
                    // Refresh token 요청 실패에 대한 처리
                }
            }
        };
        refresh();
    }, []);

    // const validRefreshToken = localStorage.getItem('refresh_token');

    // //유효성 검사
    // const isRefreshTokenValid = async (validRefreshToken) => {
    //     try {
    //         // 서버에 Refresh 토큰을 전송하여 유효성 검사 요청
    //         const response = await fetch('http://example.com/api/refresh/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ refresh: validRefreshToken }),
    //         });

    //         // 서버의 응답 결과를 확인하여 유효성 검사 결과 반환
    //         if (response.ok) {
    //             // 유효한 토큰인 경우
    //             return true;
    //         } else {
    //             // 유효하지 않은 토큰인 경우
    //             return false;
    //         }
    //     } catch (error) {
    //         // 오류 발생 시 처리
    //         console.error('Error during token validation:', error);
    //         return false;
    //     }
    // };
    // const isValid = isRefreshTokenValid(validRefreshToken);
    //인터셉트  코드로 대체

    return (
        <div>
            <BrowserRouter>
                <Wrapper>
                    <Reset />
                    <Header
                        registerDisplay="none"
                        centerDisplay="flex"
                        handleClick={handleClick}
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
