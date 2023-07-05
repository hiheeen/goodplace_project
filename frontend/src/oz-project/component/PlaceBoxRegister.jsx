import styled from 'styled-components';
const Container = styled.div`
    box-sizing: border-box;
    background-color: white;
    width: 100%;

    padding: 10px;
`;

function PlaceBoxRegister({
    brand,
    brandCategory,
    brandRunTime,
    menuImgSrc,
    likeNum,
    disLikeNum,
    placeLink,
}) {
    return (
        <Container
            style={{
                display: 'grid',
                borderBottom: '1px solid lightgrey',
                borderRadius: 'none',
                gridTemplateColumns: '30% 70%',
            }}
            className="place_box"
        >
            <div
                style={{
                    overFlow: 'hidden',
                    justifyContent: 'center',
                    position: 'relative',
                    marginRight: 15,
                }}
            >
                <img
                    alt=""
                    src={menuImgSrc}
                    style={{
                        borderRadius: 10,
                        width: '100px',
                        height: '100px',
                    }}
                ></img>
            </div>
            <div style={{ padding: '0 0 0 25px' }}>
                <div style={{ marginBottom: 10 }}>
                    <span
                        style={{
                            margin: 0,
                            fontSize: 20,
                            fontWeight: 800,
                            color: 'rgb(69, 69, 69)',
                        }}
                    >
                        {brand}
                    </span>
                    <span style={{ fontSize: 14, color: 'rgb(69, 69, 69)' }}>
                        {' '}
                        {brandCategory}
                    </span>
                </div>
                <div
                    style={{
                        marginBottom: 10,
                        color: 'rgb(69, 69, 69)',
                        fontSize: '14px',
                    }}
                >
                    {brandRunTime}
                </div>
                <div
                    style={{
                        color: 'green',
                        fontSize: '14px',
                        marginBottom: 10,
                    }}
                >
                    지도로 이동 =&gt;
                    <a href={placeLink}></a>
                </div>
                <div
                    style={{
                        marginBottom: 10,
                        color: 'rgb(69, 69, 69)',
                        fontSize: '12px',
                        display: 'flex',
                    }}
                >
                    <div
                        style={{
                            marginRight: 15,
                            border: '1px solid rgb(69, 69, 69)',
                            padding: '1px 10px',
                            display: 'flex',
                            flexDirection: 'space-between',
                            borderRadius: 10,
                        }}
                    >
                        <span style={{ marginRight: 5 }}>좋아요</span>
                        <span style={{ color: 'blue' }}> {likeNum} </span>
                    </div>
                    <div
                        style={{
                            border: '1px solid rgb(69, 69, 69)',
                            padding: '1px 10px',
                            display: 'flex',
                            flexDirection: 'space-between',
                            borderRadius: 10,
                        }}
                    >
                        <span style={{ marginRight: 5 }}>싫어요</span>
                        <span style={{ color: 'red' }}> {disLikeNum} </span>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default PlaceBoxRegister;
