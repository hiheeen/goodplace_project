import styled from 'styled-components';
const Container = styled.div`
    box-sizing: border-box;
    background-color: white;
    @media screen and (max-width: 768px) {
        height: 220px;
    }
    // border: 1px solid rgb(69, 69, 69);
    width: 100%;
    min-width: 500px;
    padding: 10px;
`;
function PlaceBox({
    brand,
    brandCategory,
    brandRunTime,
    menuImgSrc,
    likeNum,
    disLikeNum,
    placeLink,
    placeBoxDisplay,
    textBoxPadding,
    imgDisplay,
    placeBoxBorder,
    boxRadius,
    imgGridColumns,
    imgWidth,
    imgHeight,
    placeBoxHeight,
    placeBoxMinWidth,
}) {
    return (
        <Container
            style={{
                display: placeBoxDisplay,
                borderBottom: placeBoxBorder,
                borderRadius: boxRadius,
                gridTemplateColumns: imgGridColumns,
                minWidth: placeBoxMinWidth,
            }}
            className="place_box"
        >
            <div
                style={{
                    overFlow: 'hidden',
                    display: imgDisplay,
                    justifyContent: 'center',
                    position: 'relative',
                    marginRight: 15,
                    height: placeBoxHeight,
                }}
            >
                <img
                    alt=""
                    src={menuImgSrc}
                    style={{
                        borderRadius: 10,
                        width: imgWidth,
                        height: imgHeight,
                    }}
                ></img>
            </div>
            <div style={{ padding: textBoxPadding }}>
                <div style={{ marginBottom: 10 }}>
                    <span
                        style={{
                            margin: 0,
                            fontSize: 25,
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

export default PlaceBox;
