// import React, { useState, useEffect } from 'react';
// import SearchData from './SearchData';
import styled from 'styled-components';
const Item = styled.div`
    color: white;
    font-size: 20px;
`;
function RegisterBox({
    res_name,
    res_category,
    res_runtime,
    res_link,
    res_img,
}) {
    // const [isLoading, setIsLoading] = useState(true);
    // const [datas, setDatas] = useState([]);
    // const getDatas = async () => {
    //     const response = await fetch(
    //         ''
    //     );
    //     const json = await response.json();

    //     setDatas(json.data.movies);
    //     setIsLoading(false);
    // };
    // useEffect(() => {
    //     getDatas();
    // }, []);
    // console.log(datas);
    return (
        <div
            style={{
                border: '1px solid black',
                backgroundColor: 'black',
                paddingTop: 100,
            }}
        >
            <div>
                {/* <SearchData display="flex" /> */}
                <Item className="restaurant_name">식당 이름 : {res_name}</Item>
                <Item className="restaurant_category">
                    카테고리 : {res_category}
                </Item>
                <Item className="restaurant_runTime">
                    영업 시간 : {res_runtime}
                </Item>
                <Item className="restaurant_goToNaver">4 : {res_link}</Item>
                <Item className="restaurant_img">
                    <img
                        style={{ width: '200px', height: '200px' }}
                        alt=""
                        src={res_img}
                    />
                </Item>
            </div>
        </div>
    );
}
export default RegisterBox;
