import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Reset } from 'styled-reset';
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
const Wrapper = styled.div``;

function App() {
    const isTokenExpired = (token) => {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // 현재 시간 (밀리초를 초로 변환)
        return decodedToken.exp < currentTime;
    }; //토큰 만료여부 계산
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        const accessToken = localStorage.getItem('access_token');
        // refreshToken을 서버로 전송하여 새로운 access token을 발급받음
        if (accessToken && isTokenExpired(accessToken)) {
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/refresh-token',
                    {
                        refresh_token: refreshToken,
                    }
                );

                const { access_token } = response.data;

                // 새로운 access token을 localStorage 등에 저장
                localStorage.setItem('access_token', access_token);

                // 발급받은 access token을 이용하여 이후 작업 수행
                // ...
                // return;
            } catch (error) {
                console.error('Refresh token request failed:', error);
                // Refresh token 요청 실패에 대한 처리
                // ...
            }
        }
    };
    return (
        <div>
            <BrowserRouter>
                <Wrapper>
                    <Reset />
                    {/* <Header /> */}
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
