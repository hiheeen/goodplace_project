import styled from 'styled-components';
import PlaceBox from '../component/PlaceBox';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { api } from '../../api';
// import { api,interceptors } from '../../api';
import { refresh } from '../../refresh';
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
    const [isLikeClick, setIsLikeClick] = useState(false);
    const [isDisLikeClick, setIsDisLikeClick] = useState(false);
    const [list, setList] = useState([]);
    const [Id, setId] = useState('');
    const [isModify, setIsModify] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [modifyClick, setModifyClick] = useState(false);
    const [modifyDescription, setModifyDescription] = useState('');
    const [likeList, setLikeList] = useState({});
    const [isModifyMode, setIsModifyMode] = useState();

    // api.interceptors.response.use(
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
    //        ${response.data['access']}`;
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

    const likeClick = async (itemId) => {
        // setIsLikeClick(true);
        // list.map((item) => {
        //     setLikeNum(item.like_user.length);
        // });
        // setLikeNum(likeNum + 1);
        refresh();
        const token = localStorage.getItem('access_token');

        if (token) {
            const response = await api
                .post(
                    `places/like_place/${itemId}/`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log('좋아요 누른 데이터 전송 완료');
                    setIsLikeClick(!isLikeClick);
                })
                .catch((error) => {
                    // 요청 실패 시 이전에 증가시킨 좋아요 수를 다시 감소시킴
                    // setLikeNum((prevLikeNum) => prevLikeNum - 1);
                    console.error('좋아요 클릭 에러:', error);
                });
            // window.location.reload();
        }

        // const likeResponse = await axios
        //     .get(`http://localhost:8000/api/v1/places/`, {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     })
        //     .then((response) => {
        //         setLikeList(response.data.like_user);
        //         console.log('기존 데이터', response.data.like_user);
        //     });
    };

    const disLikeClick = async (itemId) => {
        // setIsDisLikeClick(true);
        refresh();
        const token = localStorage.getItem('access_token');

        if (token) {
            const response = await api
                .post(
                    `places/hate_place/${itemId}/`,
                    {}, // 꼭 빈 객체로 전달할 것.
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log('싫어요 누른 데이터 전송 완료');
                    setIsDisLikeClick(!isDisLikeClick);
                })
                .catch((error) => console.error('싫어요 실패', error));
            // window.location.reload();
        }

        // window.location.reload();
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
    }, [isLikeClick, isDisLikeClick]);
    //// 데이터 받아오는 코드 .. 보내는거랑 받아오는거 구별 잘하기
    //// isLikeClick이랑 isDisLikeClick은 좋아요 싫어요 버튼 누를때마다 바뀌니까 렌더링되게

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken && !(accessToken === ('undefined' || 'null'))) {
            // 토큰이 존재하면 유효성 검사를 수행
            const decodedToken = jwt_decode(accessToken);

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
        if (accessToken && !(accessToken === ('undefined' || 'null'))) {
            const decodedToken = jwt_decode(accessToken);
            const userId = decodedToken.user_id;
            setId(userId);
        } else {
            const userId = '';
            setId(userId);
        }
    }, []); ///중요한 코드, userId 가지고 작업하는 코드니까 함부로 지우지 마라

    // const handleDelete = () => {
    //     setIsDelete(true);
    // };
    const modifyOnChange = (e) => {
        setModifyDescription(e.target.value);
    };

    const keyDownOnChange = (e, itemId) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setModifyDescription(e.target.value);
            handleSave(itemId);
        }
    };

    const handleSave = async (itemId) => {
        refresh();
        const data = {
            description: modifyDescription,
        };
        console.log('리뷰', data);
        const description = api.put(`places/modify_place/${itemId}/`, data);

        setModifyClick(false);
        setIsModify(false);
        window.location.reload();
    };
    const handleDelete = async (itemId) => {
        refresh();
        try {
            const token = localStorage.getItem('access_token');

            const response = await api.delete(
                `places/delete_place/${itemId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // 삭제 요청에 대한 처리
            console.log('삭제 요청 결과:', response);
        } catch (error) {
            // 에러 처리
            console.error('삭제 요청 에러:', error);
        }
        window.location.reload();
    };

    // const handleModify = (item) => {
    //     for (const i = 0; i < list.length; i++) {
    //         if (list[i].id === item) setIsModifyMode(true);
    //     }
    // };
    // const handleModify = () => {
    //
    //     setModifyClick(true);
    // };

    const makeModifyMode = (item) => {
        // for (let i = 0; i < list.length; i++) {
        //     if (list[i].id === item) {
        //         setIsModifyMode(true);
        //         setModifyClick(true);
        //     }
        //     console.log(list[i].id);
        //     console.log(item);
        // }
        setModifyClick(true);
        setIsModifyMode(item);
    };
    //isModifyMode , setIsModifyMode
    return (
        <div>
            {/* <Header
                registerDisplay="none"
                centerDisplay="flex"
                handleClick={handleClick}
            /> */}
            <Container>
                <Wrapper>
                    {list?.map((item) => {
                        // const likeNum = item.like_user.length;
                        return (
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
                                    'https://map.naver.com/v5/search/' +
                                    item.title
                                }
                                key={item.id}
                                menuImgSrc={item.image}
                                likeNum={item.like_user.length}
                                disLikeNum={item.hate_user.length}
                                likeClick={() => likeClick(item.id)}
                                disLikeClick={() => disLikeClick(item.id)}
                                description={item.description}
                                modifyDescription={
                                    !modifyClick &&
                                    isModifyMode === item.id &&
                                    item.user.id === Id
                                        ? ''
                                        : modifyDescription
                                }
                                displayModifyDeleteBtn={
                                    (!isModifyMode && item.user.id === Id) ||
                                    (isModifyMode !== item.id &&
                                        item.user.id === Id)
                                        ? 'inline-block'
                                        : 'none'
                                    //수정버튼 안 눌렸을 때에는 !isModifyMode 값이 true, 내가 쓴 게시글 전부 보임
                                    //버튼 눌리면 || 의 앞이 false, 뒤의 문으로 가서 true, false를 판별하는데
                                    // 수정버튼 누른 게시글이면서(isModifyMode의 값은 딱 한 개의 place.id, item.id는 각각 다르다)
                                    // 내가 쓴 게시글 인 것! 즉 내가 쓴 것들 중에 수정버튼 안 누른 애들만 버튼 보이기
                                }
                                handleModify={() => makeModifyMode(item.id)}
                                modifyDisplay={
                                    modifyClick &&
                                    isModifyMode === item.id &&
                                    item.user.id === Id
                                        ? 'block'
                                        : 'none'
                                }
                                originalDisplay={
                                    modifyClick &&
                                    isModifyMode === item.id &&
                                    item.user.id === Id
                                        ? 'none'
                                        : 'block'
                                }
                                modifyOnChange={(e) => modifyOnChange(e)}
                                keyDownOnChange={(e) =>
                                    keyDownOnChange(e, item.id)
                                }
                                saveDisplay={
                                    modifyClick &&
                                    isModifyMode === item.id &&
                                    item.user.id === Id //item.user.id 는 게시글 작성한 유저, Id는 로그인 유저
                                        ? 'block'
                                        : 'none'
                                }
                                handleSave={() => handleSave(item.id)}
                                handleDelete={() => handleDelete(item.id)}
                            />
                        );
                    })}
                </Wrapper>
            </Container>
        </div>
    );
}
export default MainSection;
