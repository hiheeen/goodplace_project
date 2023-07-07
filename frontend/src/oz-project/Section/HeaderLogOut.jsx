import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Container = styled.div`
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    // max-width: 1280px;
    height: 50px;
    margin: 0 auto;
    padding: 0 40px;
    background-color: orange;
`;
const Wrapper = styled.div`
    box-sizing: border-box;
    padding: 0 120px;
    margin: 0 auto;
    max-width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Left = styled.div``;
const Right = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Center = styled.div`
    justify-content: center;
`;
const Register = styled.button`
    all: unset;
    border: 1px solid white;
    border-radius: 10px;
    font-size: 15px;
    padding: 5px;
    color: white;
    font-weight: 800;
`;
const LogOut = styled.button`
    all: unset;
    border: 1px solid white;
    border-radius: 10px;
    font-size: 11px;
    padding: 4px;
    color: white;
    font-weight: 800;
    margin-right: 8px;
`;
// const SignUp = styled.button`
//     all: unset;
//     border: 1px solid white;
//     border-radius: 10px;
//     font-size: 1px;
//     padding: 4px;
//     color: white;
//     font-weight: 800;
//     margin-left: 8px;
// `;

function HeaderLogOut({ centerDisplay, handleClick }) {
    const navigate = useNavigate();
    const handleLogOut = async () => {
        const token = {
            refresh_token: localStorage.getItem('refresh_token'),
        };
        const logOut = await axios.post(
            'http://localhost:8000/api/v1/users/logout/',
            token
        );

        navigate('/', { replace: true });
        localStorage.clear();
        // setIsLogOut(true);
    };
    return (
        <div>
            <Container>
                <Wrapper>
                    <Left className="oz_logo header_left">
                        <a
                            href="/"
                            className="oz_logo_link"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontSize: 20,
                                fontWeight: '1000',
                                display: 'inline-block',
                                width: '110px',
                            }}
                        >
                            오늘의 점심
                        </a>
                    </Left>
                    <Center
                        style={{ display: centerDisplay }}
                        className="header_center"
                    >
                        <div className="header_register">
                            <Register
                                className="register_btn"
                                onClick={handleClick}
                            >
                                맛집 등록하기
                            </Register>
                        </div>
                    </Center>

                    <Right className="header_right">
                        <LogOut onClick={handleLogOut} className="oz_logIn">
                            로그아웃
                        </LogOut>
                        {/* <div style={{ color: 'white' }}>|</div>
                        <SignUp onClick={handleSignUp} className="oz_signUp">
                            회원가입
                        </SignUp> */}
                    </Right>
                </Wrapper>
            </Container>
        </div>
    );
}
export default HeaderLogOut;
