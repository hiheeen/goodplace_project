import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
// import RegisterBox from './RegisterBox';
import CSRFToken from '../etc/CSRFToken';
import PlaceBoxRegister from './PlaceBoxRegister';

const Button = styled.div`
    all: unset;
    border: 1px solid orange;
    border-radius: 10px;
    padding: 5px;
    color: black;
    font-size: 13px;
`;
const Input = styled.input`
    &:focus {
        outline: 2px solid orange;
    }
`;
function SearchData({ display }) {
    const [value, setValue] = useState({
        place: '',
    });
    const [review, setReview] = useState({
        description: '',
    });

    const [datas, setDatas] = useState([]);
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [resName, setResName] = useState(`${value.place}`);
    const [displayButton, setDisplayButton] = useState('inline-block');
    const [displayRegisterForm, setDisplayRegisterForm] = useState('none');
    const handleClick = () => {
        setDisplayButton('none');
        setDisplayRegisterForm('block');
    };
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };
    const handleDescription = (e) => {
        setReview(e.target.value);
    };
    // const handleNameChange = (e) => {
    //     setResName(e.target.value);
    // };

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
    async function getDatas() {
        const response = await fetch('http://localhost:8000/api/v1/places/');
        const json = await response.json();

        setList(json);
        // setIsLoading(false);
        // console.log(json[0]?.title);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        (async () => {
            const response = await fetch(
                'http://localhost:8000/api/v1/places/'
            );
            const json = await response.json();

            setList(json);
            // setIsLoading(false);
            // console.log(json[0]?.title);
        })();
    };
    useEffect(() => {
        (async () => {
            const response = await fetch(
                'http://localhost:8000/api/v1/places/'
            );
            const json = await response.json();

            setList(json);
            // setIsLoading(false);
            // console.log(json[0]?.title);
        })();
    }, []);

    // console.log('datas', datas); // 비동기니까 이 시점엔 데이터가 없다. 이유 정확하게 알기

    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('title', datas.place.items[0].title);
    //     formData.append('category', datas.place.items[0].category);
    //     formData.append(
    //         'link',
    //         'https://map.naver.com/v5/search/' + value.place
    //     );
    //     formData.append('img', datas.image.items[0].link);
    //     formData.append('description', value.description);
    //     formData.append('time', '2');
    //     fetch('http://localhost:8000/api/v1/places/create_place/', {
    //         method: 'POST',
    //         cache: 'no-cache',
    //         body: formData, // body 부분에 폼데이터 변수를 할당
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }; // 비동기니까 제출을 눌러야 실행이 된다!@!!!!!!!!1

    // const blob = new Blob([JSON.stringify(dataObj)], {
    //     type: 'application/json',
    //   });
    //   formData.append('info', blob)

    const createApi = 'http://localhost:8000/api/v1/places/create_place/';

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
                            justifyContent: 'space-between',
                        }}
                    >
                        <Input
                            style={{
                                borderRadius: '10px',
                                border: '1px solid black',
                                height: '20px',
                                width: '100%',
                                maxWidth: '235px',
                                marginRight: 5,
                                top: 10,
                                border: '1px solid orange',
                            }}
                            name="place"
                            onChange={handleChange}
                            value={value.place}
                            type="text"
                        ></Input>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            style={{ pointer: 'cursor' }}
                        >
                            검색
                        </Button>
                    </div>
                </form>
                <div>
                    {isLoading ? (
                        <h1 style={{ marginLeft: 15 }}>
                            나만의 맛집을 검색해주세요!
                        </h1>
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
                            handleClick={handleClick}
                            displayButton={displayButton}
                        />
                    ) : (
                        <h1>검색결과가 없습니다.</h1>
                    )}
                </div>
                <div style={{ display: displayRegisterForm }}>
                    <form
                        method="post"
                        action={createApi}
                        onSubmit={handleRegister}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}
                    >
                        {Object.keys(datas).length && (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Input
                                    type="text"
                                    name="title"
                                    value={datas.place.items[0].title}
                                    hidden
                                    // onChange={handleNameChange}
                                    style={{
                                        width: '290px',
                                        marginBottom: '10px',
                                        marginTop: '10px',
                                        borderRadius: '7px',
                                        height: '20px',
                                        border: '1px solid orange',
                                    }}
                                    // placeholder={`${value.place}`}
                                ></Input>
                                <Input
                                    type="text"
                                    name="description"
                                    value={review.description}
                                    onChange={handleDescription}
                                    placeholder="영업시간 : , 간단 리뷰: "
                                    style={{
                                        width: '290px',
                                        height: '100px',
                                        borderRadius: '8px',
                                        border: '1px solid orange',
                                    }}
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={datas.place.items[0].category}
                                ></input>
                                <input
                                    type="text"
                                    name="img"
                                    value={datas.image.items[0].link}
                                />
                                <input
                                    type="text"
                                    name="link"
                                    value={
                                        'https://map.naver.com/v5/search/' +
                                        value.place
                                    }
                                />

                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginLeft: '253px',
                                        marginTop: '10px',
                                    }}
                                >
                                    <button onClick="">등록</button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default SearchData;
