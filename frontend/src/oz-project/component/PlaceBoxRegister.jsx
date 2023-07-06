import styled from 'styled-components';
const Container = styled.div`
    box-sizing: border-box;
    background-color: white;
    width: 100%;

    padding: 10px;
`;

function PlaceBoxRegister({
    res_name,
    res_category,
    res_link,
    res_img,

    placeLink,
}) {
    return (
        <Container
            style={{
                display: 'flex',
                borderBottom: '1px solid lightgrey',
                borderRadius: 'none',
                flexDirection: 'column',
            }}
            className="place_box"
        >
            <div
                style={{
                    overFlow: 'hidden',
                    justifyContent: 'center',
                    position: 'relative',

                    width: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 15,
                }}
            >
                <img
                    alt=""
                    src={res_img}
                    style={{
                        borderRadius: 10,
                        width: '290px',
                        height: '290px',
                    }}
                ></img>
            </div>
            <div style={{ padding: '0 0 0 5px' }}>
                <div style={{ marginBottom: 20 }}>
                    <div
                        style={{
                            margin: 0,
                            fontSize: 25,
                            fontWeight: 800,
                            color: 'rgb(69, 69, 69)',
                            marginBottom: 10,
                        }}
                    >
                        {res_name}
                    </div>
                    <span
                        style={{
                            fontSize: 14,
                            color: 'rgb(69, 69, 69)',
                        }}
                    >
                        {' '}
                        {res_category}
                    </span>
                </div>
                {/* <div
                    style={{
                        marginBottom: 10,
                        color: 'rgb(69, 69, 69)',
                        fontSize: '14px',
                    }}
                >
                    {brandRunTime}
                </div> */}
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <span
                        style={{
                            display: 'inline-block',
                            fontSize: '14px',
                        }}
                    >
                        <a href={res_link} target="_blank" rel="noreferrer">
                            {' '}
                            자세히 보기 =&gt;
                        </a>
                    </span>
                    <span
                        style={{
                            display: 'inline-block',
                            color: 'rgb(69, 69, 69)',
                            fontSize: '14px',
                        }}
                    >
                        <button>등록하기</button>
                    </span>
                </div>
            </div>
        </Container>
    );
}

export default PlaceBoxRegister;
