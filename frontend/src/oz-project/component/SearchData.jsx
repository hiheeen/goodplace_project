import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
// import RegisterBox from './RegisterBox';
import CSRFToken from '../etc/CSRFToken';
import PlaceBoxRegister from './PlaceBoxRegister';

const Button = styled.div`
    all: unset;
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    color: black;
    font-size: 13px;
`;

function SearchData({ display }) {
    const [value, setValue] = useState({
        place: '',
    });

    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const fetchData = async () => {
        if (value.place === '') return;
        // alert(JSON.stringify(value, null, 1));

        const formData = new FormData();
        formData.append('place', value.place);

        const cookies = new Cookies();

        // const setCookie = (name, value, option) => {
        //     return cookies.set(name, value, { ...option });
        // };
        const getCookie = (name) => {
            return cookies.get(name);
        };
        // const csrftoken = getCookie('csrftoken');
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/api/v1/places/search_place/',
            data: formData,
            headers: { authorization: `Bearer ${getCookie('place')}` },
        })
            // .then((result) => {
            //     console.log('요청성공');
            //     console.log('result', result);
            // })
            .then((response) => {
                console.log('response.data', response.data);
                setDatas(response.data);
                console.log(datas);
                setIsLoading(false);
                // const accessToken = response.data.token;
                // setCookie('place', accessToken);
            })
            .catch((error) => {
                console.log('요청실패');
                console.log(error);
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    // csrftoken을 header에 넣어야 한다는데 아무리 해도 장고에 토큰 전달이 안!!!!됨!!!!!!1

    // const getDatas = async () => {
    //     const response = await fetch(
    //         'http://localhost:8000/api/v1/places/search_place'
    //     );
    //     const json = await response.json();

    //     setDatas(json.data.datas);
    //     setIsLoading(false);
    // };

    // console.log('datas', datas); // 비동기니까 이 시점엔 데이터가 없다. 이유 정확하게 알기

    return (
        <div>
            <div
                className="container"
                style={{
                    display: display,
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                }}
            >
                <form
                    method="post"
                    style={{
                        width: '320px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        backgroundColor: 'white',
                        height: '50px',
                    }}
                    onSubmit={handleSubmit}
                >
                    <CSRFToken />
                    <div
                        style={{
                            position: 'absolute',
                            width: '290px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <input
                            style={{
                                borderRadius: '5px',
                                border: '1px solid black',
                                height: '20px',
                                width: '100%',
                                maxWidth: '240px',
                                marginRight: 5,
                                top: 10,
                            }}
                            name="place"
                            onChange={handleChange}
                            value={value.place}
                            type="text"
                        ></input>
                        <Button type="submit">검색</Button>
                    </div>
                </form>
                {/* 
                    <form>
                        <div></div>
                    </form> */}
                <div>
                    {isLoading ? (
                        <h1>loading...</h1>
                    ) : Object.keys(datas).length ? (
                        <PlaceBoxRegister
                            brandRunTime="24시간"
                            likeNum="6"
                            disLikeNum="2"
                            placeLink=""
                            res_name={datas.place.items[0].title}
                            res_img={datas.image.items[0].link}
                            res_category={datas.place.items[0].category}
                            res_link={
                                'https://map.naver.com/v5/search/' + value.place
                            }
                        />
                    ) : (
                        <h1>loading...</h1>
                    )}
                </div>
                <div>
                    <form></form>
                </div>
            </div>

            {/* <div>
                {isLoading ? (
                    <h1>loading...</h1>
                ) : Object.keys(datas).length ? (
                    <PlaceBoxRegister
                        brandRunTime="24시간"
                        likeNum="6"
                        disLikeNum="2"
                        placeLink=""
                        res_name={datas.place.items[0].title}
                        res_img={datas.image.items[0].link}
                        res_category={datas.place.items[0].category}
                    />
                ) : (
                    <h1>loading...</h1>
                )}
            </div> */}
        </div>
    );
}
export default SearchData;
