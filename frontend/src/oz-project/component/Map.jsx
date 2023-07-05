import React, { useEffect } from 'react';
// import { useMediaQuery } from 'react-responsive';

const { naver } = window;
const Map = () => {
    useEffect(() => {
        const container = document.getElementById('map'); // 지도를 표시할 div

        // let markerList = [];
        // const HOME_PATH = window.HOME_PATH || '.';
        const position = new naver.maps.LatLng(37.5145, 127.0171);
        const mapOptions = {
            center: position,
            zoom: 17,
            minZoom: 6,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };

        const map = new naver.maps.Map(container, mapOptions);

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

        const marker = new naver.maps.Marker(markerOptions);

        console.log('loading navermap');
    }, []);
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
