import React, { useState, useEffect } from 'react';
import { Axios } from 'axios';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import RegisterBox from './RegisterBox';
import CSRFToken from '../etc/CSRFToken';

const Button = styled.div`
    all: unset;
    border: 1px solid white;
    border-radius: 10px;
    padding: 5px;
    color: white;
    font-size: 13px;
`;

function SearchData({ display }) {
    const [value, setValue] = useState({
        place: '',
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        // e.preventDefault();
        if (value.place === '') return;
        alert(JSON.stringify(value, null, 1));

        const formData = new FormData();
        formData.append('place', value);

        const cookies = new Cookies();

        const setCookie = (name, value, option) => {
            return cookies.set(name, value, { ...option });
        };
        const getCookie = (name) => {
            return cookies.get(name);
        };
        // const csrftoken = getCookie('csrftoken');
        const response = await Axios({
            method: 'post',
            url: 'http://localhost:8000/api/v1/places/search_place',
            data: formData,
            headers: { authorization: `Bearer ${getCookie('place')}` },
        })
            .then((result) => {
                console.log('요청성공');
                console.log(result);
            })
            .catch((error) => {
                console.log('요청실패');
                console.log(error);
            });
        const accessToken = response.data.token;
        setCookie('place', `${accessToken}`);
    };
    // csrftoken을 header에 넣어야 한다는데 아무리 해도 장고에 토큰 전달이 안!!!!됨!!!!!!1

    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const getDatas = async () => {
        const response = await fetch(
            'http://localhost:8000/api/v1/places/search_place'
        );
        const json = await response.json();

        setDatas(json.data.movies);
        setIsLoading(false);
    };
    useEffect(() => {
        getDatas();
    }, []);
    console.log(datas);
    return (
        <div>
            <div style={{ display: display, justifyContent: 'center' }}>
                <div>
                    <form
                        action="http://localhost:8000/api/v1/places/search_place"
                        method="post"
                        onSubmit={handleSubmit}
                        style={{
                            width: '400px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <CSRFToken />
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <input
                                style={{
                                    borderRadius: '5px',
                                    border: '1px solid white',
                                    height: '20px',
                                    width: '100%',
                                    maxWidth: '250px',
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
                </div>
            </div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    {datas.map((data) => (
                        <RegisterBox
                            key={data.id}
                            res_img={data.image.items.link}
                            res_name={data.place.items.title}
                            res_category={data.place.items.category}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default SearchData;
