// import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Header from './Header';
// import PlaceImg01 from '../img/감자탕.png';
// import PlaceImg02 from '../img/라멘.png';
// import PlaceImg03 from '../img/미락카츠.png';
// import PlaceImg04 from '../img/망향비빔.png';
// import PlaceBoxRegister from '../component/PlaceBoxRegister';
import Map from '../component/Map';
import SearchData from '../component/SearchData';

const Wrapper = styled.div`
    position: relative;

    background-color: white;
    width: 320px;
    // padding-right: 10px;
    box-shadow: 1px 1px 2px lightgrey;
`;
const Container = styled.div`
    position: relative;
    padding-top: 50px;
    z-index: 0;
`;
function RegisterSection(props) {
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
    // ];

    // const isMobile = useMediaQuery({ query: '(max-width:768px)' });

    return (
        <div>
            <Header registerDisplay="flex" centerDisplay="none" />
            <Container>
                <Map />
                <Wrapper
                    className="searchData_wrapper"
                    style={{ height: 'calc(100vh - 50px)' }}
                >
                    <SearchData />
                    {/* {!isMobile &&
                        places.map((place) => (
                            <PlaceBoxRegister
                                style={{
                                    flexDirection: 'row',
                                    zIndex: 50,
                                }}
                                brand={place.brand}
                                brandCategory={place.brandCategory}
                                brandRunTime={place.brandRunTime}
                                menuImgSrc={place.menuImgSrc}
                                likeNum={place.likeNum}
                                disLikeNum={place.disLikeNum}
                                placeLink={place.placeLink}
                            />
                        ))} */}
                </Wrapper>
            </Container>
        </div>
    );
}
export default RegisterSection;
