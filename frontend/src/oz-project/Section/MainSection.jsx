import styled from 'styled-components';
import PlaceImg01 from '../img/감자탕.png';
import PlaceImg02 from '../img/라멘.png';
import PlaceImg03 from '../img/미락카츠.png';
import PlaceImg04 from '../img/망향비빔.png';
import PlaceBox from '../component/PlaceBox';
import Header from './Header';
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
    const places = [
        {
            brand: '신사골',
            brandCategory: ' | 감자탕',
            brandRunTime: '24시간 영업 * 연중무휴',
            menuImgSrc: `${PlaceImg01}`,
            likeNum: 6,
            disLikeNum: 1,
            placeLink:
                'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
        },
        {
            brand: '멘쇼쿠',
            brandCategory: ' | 라멘, 일식',
            brandRunTime: '11:00 ~ 21:00 * 연중무휴',
            menuImgSrc: `${PlaceImg02}`,
            likeNum: 4,
            disLikeNum: 2,
            placeLink:
                'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
        },
        {
            brand: '미락카츠',
            brandCategory: ' | 일식당',
            brandRunTime: '11:00 ~ 20:30 * 연중무휴',
            menuImgSrc: `${PlaceImg03}`,
            likeNum: 5,
            disLikeNum: 1,
            placeLink:
                'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
        },
        {
            brand: '망향비빔국수',
            brandCategory: ' | 국수',
            brandRunTime: '11:00 ~ 20:30 * 연중무휴',
            menuImgSrc: `${PlaceImg04}`,
            likeNum: 10,
            disLikeNum: 2,
            placeLink:
                'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
        },
        {
            brand: '신사골',
            brandCategory: ' | 감자탕',
            brandRunTime: '24시간 영업 * 연중무휴',
            menuImgSrc: `${PlaceImg01}`,
            likeNum: 6,
            disLikeNum: 1,
            placeLink:
                'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
        },
        {
            brand: '멘쇼쿠',
            brandCategory: ' | 라멘, 일식',
            brandRunTime: '11:00 ~ 21:00 * 연중무휴',
            menuImgSrc: `${PlaceImg02}`,
            likeNum: 4,
            disLikeNum: 2,
            placeLink:
                'https://map.naver.com/v5/entry/place/1124461473?c=15,0,0,0,dh',
        },
    ];
    return (
        <div>
            <Header registerDisplay="none" centerDisplay="flex" />
            <Container>
                <Wrapper>
                    {places.map((place) => (
                        <PlaceBox
                            imgDisplay="flex"
                            placeBoxDisplay="grid"
                            boxRadius="10px"
                            imgGridColumns="1fr 1fr"
                            imgWidth="230px"
                            placeBoxHeight="200px"
                            placeBoxMinWidth="500px"
                            brand={place.brand}
                            brandCategory={place.brandCategory}
                            brandRunTime={place.brandRunTime}
                            menuImgSrc={place.menuImgSrc}
                            likeNum={place.likeNum}
                            disLikeNum={place.disLikeNum}
                            placeLink={place.placeLink}
                        />
                    ))}
                </Wrapper>
            </Container>
        </div>
    );
}
export default MainSection;
