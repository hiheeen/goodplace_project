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
    likeClick,
    disLikeClick,
    displayModifyDeleteBtn,
    handleModify,
    handleDelete,
    description,
    modifyDisplay,
    originalDisplay,
    modifyOnChange,
    modifyDescription,
    saveDisplay,
    handleSave,
    likeColor,
}) {
    const onSave = () => {
        handleSave();
    };
    const onDelete = () => {
        handleDelete();
    };
    const onLike = () => {
        likeClick();
    };
    const onDisLike = () => {
        disLikeClick();
    };
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
                    <a
                        href={placeLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        지도로 이동 =&gt;
                    </a>
                </div>
                <div
                    style={{
                        marginBottom: 10,
                        color: 'rgb(69, 69, 69)',
                        fontSize: '12px',
                        display: 'flex',
                    }}
                >
                    <button
                        style={{
                            all: 'unset',
                            marginRight: 15,
                            border: '1px solid rgb(69, 69, 69)',
                            padding: '1px 10px',
                            display: 'flex',
                            flexDirection: 'space-between',
                            borderRadius: 10,
                            zIndex: 999,
                            backgroundColor: likeColor,
                        }}
                        onClick={onLike}
                    >
                        <span style={{ marginRight: 5 }}>좋아요</span>

                        <span style={{ color: 'blue' }}> {likeNum} </span>
                    </button>
                    <button
                        style={{
                            all: 'unset',
                            border: '1px solid rgb(69, 69, 69)',
                            padding: '1px 10px',
                            display: 'flex',
                            flexDirection: 'space-between',
                            borderRadius: 10,
                            zIndex: 999,
                        }}
                        onClick={onDisLike}
                    >
                        <span style={{ marginRight: 5 }}>싫어요</span>
                        <span style={{ color: 'red' }}> {disLikeNum} </span>
                    </button>
                </div>

                <div
                    className="original_description"
                    style={{
                        border: '1px solid black',
                        height: '50px',
                        display: originalDisplay,
                        borderRadius: '5px',
                        border: '1px solid white',
                        boxShadow: '0 3px 6px 0 rgba(0,0,0,.2)',
                        fontSize: '13px',
                        marginBottom: '10px',
                    }}
                >
                    {description}
                </div>
                <input
                    className="modify_description"
                    onChange={modifyOnChange}
                    value={modifyDescription}
                    style={{
                        border: '1px solid black',
                        height: '50px',
                        display: modifyDisplay,
                        border: '1px solid white',
                        boxShadow: '0 3px 6px 0 rgba(0,0,0,.2)',
                        marginBottom: '5px',
                        fontSize: '13px',
                    }}
                ></input>
                <div>
                    <button
                        onClick={handleModify}
                        style={{
                            display: displayModifyDeleteBtn,
                            marginRight: '5px',
                            fontSize: '5px',
                        }}
                    >
                        수정하기
                    </button>
                    <button
                        onClick={onDelete}
                        style={{
                            display: displayModifyDeleteBtn,
                            fontSize: '5px',
                        }}
                    >
                        삭제하기
                    </button>
                </div>
                <div>
                    <button
                        onClick={onSave}
                        style={{ display: saveDisplay, fontSize: '5px' }}
                    >
                        저장
                    </button>
                </div>
            </div>
        </Container>
    );
}

export default PlaceBox;
