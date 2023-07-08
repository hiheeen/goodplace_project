import React, { useEffect } from 'react';
// import { useMediaQuery } from 'react-responsive';

const { naver } = window;
const Map = ({ searchValue }) => {
    useEffect(() => {
        const searchKeyword = searchValue;
        const container = document.getElementById('map'); // 지도를 표시할 div

        // let markerList = [];
        // const HOME_PATH = window.HOME_PATH || '.';
        //지도의 초기 위치, 옵션(줌 등)
        const position = new naver.maps.LatLng(37.5145, 127.0171);
        const mapOptions = {
            center: position,
            zoom: 17, //지도 확대 배율
            minZoom: 6, //최소 확대 배율
            zoomControl: true, // 확대 가능하게?
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        const map = new naver.maps.Map(container, mapOptions);

        //마커 찍기(초기값)
        const markerOptions = {
            position: position.destinationPoint(90, 15),
            map: map,
            icon: {
                url: 'https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg',
                //size: new naver.maps.Size(50, 52),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(25, 26),
            },
        };
        //검색어에 따른 위치 조정
        const geocoder = new naver.maps.services.Geocoder();
        geocoder.addressSearch(searchKeyword, (status, response) => {
            if (status === naver.maps.Service.Status.ERROR) {
                console.error('검색 오류');
                return;
            }
            if (response.v2.meta.totalCount === 0) {
                console.log('검색 결과 없음');
                return;
            }
            const location = new naver.maps.LatLng(
                response.v2.addresses[0].y,
                response.v2.addresses[0].x
            );
            const marker = new naver.maps.Marker({
                markerOptions,
            });
            map.setCenter(location); //검색어를 입력했을 때 얻어오는 위도와 경도로 지도의 중심을 이동
        });
        // const marker = new naver.maps.Marker(markerOptions);

        console.log('loading navermap');
    }, [searchValue]);
    // const isMobile = useMediaQuery({ query: '(max-width:768px)' });
    return (
        <div>
            <div
                id="map"
                style={{
                    width: '100%',

                    height: 'calc(100vh - 50px)',
                    zIndex: 0,
                    position: 'absolute',
                    right: 0,
                    left: 0,
                }}
            ></div>
        </div>
    );
};

export default Map;
