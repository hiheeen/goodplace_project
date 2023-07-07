import styled from 'styled-components';
import PlaceImg01 from '../img/감자탕.png';
import PlaceImg02 from '../img/라멘.png';
import PlaceImg03 from '../img/미락카츠.png';
import PlaceImg04 from '../img/망향비빔.png';
import PlaceBox from '../component/PlaceBox';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
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
    // const places = [
    //     {
    //         brand: '신사골',
    //         brandCategory: ' | 감자탕',
    //         brandRunTime: '24시간 영업 * 연중무휴',
    //         menuImgSrc: `${PlaceImg01}`,
    //         likeNum: 6,
    //         disLikeNum: 1,
    //         placeLink:
    //             'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
    //     },
    //     {
    //         brand: '멘쇼쿠',
    //         brandCategory: ' | 라멘, 일식',
    //         brandRunTime: '11:00 ~ 21:00 * 연중무휴',
    //         menuImgSrc: `${PlaceImg02}`,
    //         likeNum: 4,
    //         disLikeNum: 2,
    //         placeLink:
    //             'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
    //     },
    //     {
    //         brand: '미락카츠',
    //         brandCategory: ' | 일식당',
    //         brandRunTime: '11:00 ~ 20:30 * 연중무휴',
    //         menuImgSrc: `${PlaceImg03}`,
    //         likeNum: 5,
    //         disLikeNum: 1,
    //         placeLink:
    //             'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
    //     },
    //     {
    //         brand: '망향비빔국수',
    //         brandCategory: ' | 국수',
    //         brandRunTime: '11:00 ~ 20:30 * 연중무휴',
    //         menuImgSrc: `${PlaceImg04}`,
    //         likeNum: 10,
    //         disLikeNum: 2,
    //         placeLink:
    //             'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
    //     },
    //     {
    //         brand: '신사골',
    //         brandCategory: ' | 감자탕',
    //         brandRunTime: '24시간 영업 * 연중무휴',
    //         menuImgSrc: `${PlaceImg01}`,
    //         likeNum: 6,
    //         disLikeNum: 1,
    //         placeLink:
    //             'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
    //     },
    //     {
    //         brand: '멘쇼쿠',
    //         brandCategory: ' | 라멘, 일식',
    //         brandRunTime: '11:00 ~ 21:00 * 연중무휴',
    //         menuImgSrc: `${PlaceImg02}`,
    //         likeNum: 4,
    //         disLikeNum: 2,
    //         placeLink:
    //             'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
    //     },
    // ];
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/create_place', { replace: true }); // true일 경우 뒤로가기 안 됨....이어야 하는데
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
            console.log(json?.title);
        }

        fetchData();
    }, []); //// 데이터 받아오는 코드 .. 보내는거랑 받아오는거 구별 잘하기
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
                            // brandRunTime={item[0].category}
                            menuImgSrc={item.image}
                            likeNum="6"
                            disLikeNum="1"
                            placeLink={item.link}
                        />
                    ))}
                </Wrapper>
            </Container>
        </div>
    );
}
export default MainSection;
