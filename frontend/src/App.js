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
const Wrapper = styled.div``;

function App() {
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
