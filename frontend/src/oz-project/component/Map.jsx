import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useMediaQuery } from 'react-responsive';

const { naver } = window;
const Map = ({ address }) => {
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

        // 네이버 지도 API를 호출하여 주소를 위도와 경도로 변환하는 함수
        function searchAddressToCoordinate(address) {
            naver.maps.Service.geocode(
                {
                    query: address,
                },
                function (status, response) {
                    if (status === naver.maps.Service.Status.ERROR) {
                        return alert('Something Wrong!');
                    }

                    if (response.v2.meta.totalCount === 0) {
                        return alert(
                            'totalCount' + response.v2.meta.totalCount
                        );
                    }

                    var htmlAddresses = [],
                        item = response.v2.addresses[0],
                        point = new naver.maps.Point(item.x, item.y);

                    if (item.roadAddress) {
                        htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
                    }

                    if (item.jibunAddress) {
                        htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
                    }

                    if (item.englishAddress) {
                        htmlAddresses.push(
                            '[영문명 주소] ' + item.englishAddress
                        );
                    }

                    map.setCenter(point);
                }
            );
        }

        //     if (true) {
        //         const formattedNumberX = (parseInt(mapx) / 1000).toFixed(4);
        //         const formattedNumberY = (parseInt(mapy) / 1000).toFixed(4);
        //         console.log(typeof formattedNumberX, formattedNumberX);
        //         const markerPosition = new naver.maps.LatLng(37.5146, 127.0171);

        //         const markerOptions = {
        //             position: markerPosition,
        //             map: map,
        //             // icon: {
        //             //     url: 'https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg',
        //             //     origin: new naver.maps.Point(0, 0),
        //             //     anchor: new naver.maps.Point(25, 26),
        //             // },
        //         };
        //         const marker = new naver.maps.Marker(markerOptions);
        //         marker.setMap(map);
        //     }
    }, [address]);

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
