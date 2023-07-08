import styled from 'styled-components';
import PlaceBox from '../component/PlaceBox';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
const Container = styled.div`
    box-sizing: border-box;
    // background-color: rgb(250, 240, 228);
    background-color: white;
    max-width: 1200px;
    height: 100vh;
    margin: 0 auto;
`;
const Wrapper = styled.div`
    box-sizing: border-box;
    // background-color: rgb(250, 240, 228);
    background-color: white;
    max-width: 1200px;
    margin: 0 auto;
    height: 100vh;
    z-index: 1;
    display: grid;
    //반응형에서 column당 하나만 나오게 하기
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        padding: 80px 70px 30px 70px;
    }

    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 20px;
    column-gap: 20px;
    padding: 80px 110px 30px 110px;
`;

function MainSection(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [likeNum, setLikeNum] = useState(0);
    const [disLikeNum, setDisLikeNum] = useState(0);
    const [list, setList] = useState([]);
    const [Id, setId] = useState('');
    const [isModify, setIsModify] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [modifyClick, setModifyClick] = useState(false);
    const likeClick = async () => {
        setLikeNum(likeNum + 1);
    };
    const disLikeClick = () => {
        setDisLikeNum((prev) => prev + 1);
    };
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.getItem('access_token') === null
            ? alert('로그인 후 이용해주세요')
            : navigate('/create_place', { replace: true }); // true일 경우 뒤로가기 안 됨....이어야 하는데
        //홈에 있는 header에서 create_place로 이동 후 뒤로가기 한번엔 똑같은 create_place페이지,, 두 번 누르면
        //전에 남아있는 기록 창으로 간다. 왜???
    };
    //useNavigate 훅을 이용하여 onclick 이벤트에 navigate 기능 적용
    //해결해야할 문제
    //뒤로 가기 버튼을 누르면 해당 앱내에서 이전 페이지로 이동하는 것이 아니라 그 전에 서핑하던 다른 웹사이트로 이동
    //새로 고침 버튼을 누르면 사용 중이던 컴포넌트가 아닌 무조건 최초에 렌더링되었던 Home 컴포넌트로 이동

    //   const handleRegister = async (e) => {
    //     e.preventDefault();

    //     const response = await fetch('http://localhost:8000/api/v1/places/');
    //     const json = await response.json();

    //     setList(json);
    //     // setIsLoading(false);
    //     console.log(json[0]?.title);
    // };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                'http://localhost:8000/api/v1/places/'
            );
            const json = await response.json();

            setList(json);
            // setIsLoading(false);
        }

        fetchData();
    }, []); //// 데이터 받아오는 코드 .. 보내는거랑 받아오는거 구별 잘하기

    // const decodeJwt = (token) => {
    //     try {
    //         const decoded = jwt.decode(token);
    //         return decoded;
    //     } catch (error) {
    //         console.error('JWT 디코드 에러:', error.message);
    //         return null;
    //     }
    // };

    // // 사용 예시
    // const token = localStorage.getItem('access_token');
    // const decodedToken = decodeJwt(token);
    // console.log(decodedToken); // 디코드된 JWT 페이로드 출력
    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (token) {
            // 토큰이 존재하면 유효성 검사를 수행
            const decodedToken = jwt_decode(token);

            // 토큰의 만료 시간 확인
            const currentTime = Date.now() / 1000; // 현재 시간 (밀리초를 초로 변환)
            if (decodedToken.exp < currentTime) {
                // 토큰이 만료되었으면 로그아웃 처리
                setLoggedIn(false);
                setUser(null);
                // localStorage.removeItem('access_token');
            } else {
                // 토큰이 유효한 경우 로그인 상태로 설정
                setLoggedIn(true);
                setUser(decodedToken);
            }
        } else {
            // 토큰이 없으면 로그아웃 상태로 설정
            setLoggedIn(false);
            setUser(null);
        }
    }, []);
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            const decodedToken = jwt_decode(accessToken);
            const userId = decodedToken.user_id;
            setId(userId);
        } else {
            const userId = '';
            setId(userId);
        }
    }, []);
    const handleModify = () => {
        setIsModify(true);
        setModifyClick(true);
    };
    const handleDelete = () => {
        setIsDelete(true);
    };
    return (
        <div>
            <Header
                registerDisplay="none"
                centerDisplay="flex"
                handleClick={handleClick}
            />
            <Container>
                <Wrapper>
                    {list.map((item) => (
                        <PlaceBox
                            imgDisplay="flex"
                            placeBoxDisplay="grid"
                            boxRadius="10px"
                            imgGridColumns="1fr 1fr"
                            imgWidth="230px"
                            placeBoxHeight="200px"
                            placeBoxMinWidth="500px"
                            brand={item.title}
                            brandCategory={item.category}
                            placeLink={
                                'https://map.naver.com/v5/search/' + item.title
                            }
                            menuImgSrc={item.image}
                            likeNum={likeNum}
                            disLikeNum={disLikeNum}
                            likeClick={likeClick}
                            disLikeClick={disLikeClick}
                            description={
                                isModify && item.user.id === Id ? (
                                    <div></div>
                                ) : (
                                    item.description
                                )
                            }
                            modifyBtn={
                                !modifyClick && item.user.id === Id
                                    ? 'inline-block'
                                    : 'none' //수정버튼 아직 안 눌렀고(!false=true),내 게시물(true) => 보이기//누르면 안보이기
                            }
                            deleteBtn={
                                item.user.id === Id ? 'inline-block' : 'none'
                            }
                            handleModify={handleModify}
                            handleDelete={handleDelete}
                        />
                    ))}
                </Wrapper>
            </Container>
        </div>
    );
}
export default MainSection;
