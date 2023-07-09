import React, { useEffect } from 'react';
// import { useMediaQuery } from 'react-responsive';

const { naver } = window;
const Map = ({ mapx, mapy }) => {
    useEffect(() => {
        const container = document.getElementById('map');
        const initialPosition = new naver.maps.LatLng(37.5145, 127.0171);
        const mapOptions = {
            center: initialPosition,
            zoom: 17,
            minZoom: 6,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        }; //지도의 초기 중심 위치 설정
        const map = new naver.maps.Map(container, mapOptions); // 지도에 해당하는 요소 표시

        if (mapx && mapy) {
            const markerPosition = new naver.maps.LatLng(mapy, mapx);

            const markerOptions = {
                position: markerPosition,
                map: map,
                icon: {
                    url: 'https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg',
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(25, 26),
                },
            };
            const marker = new naver.maps.Marker(markerOptions);
            marker.setMap(map);
        }
    }, [mapx, mapy]);

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
