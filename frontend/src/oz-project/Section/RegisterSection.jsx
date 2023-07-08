// import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Header from './Header';
// import PlaceImg01 from '../img/감자탕.png';
// import PlaceImg02 from '../img/라멘.png';
// import PlaceImg03 from '../img/미락카츠.png';
// import PlaceImg04 from '../img/망향비빔.png';
// import PlaceBoxRegister from '../component/PlaceBoxRegister';
import Map from '../component/Map';
import SearchData from '../component/SearchData';
import HeaderLogOut from './HeaderLogOut';

const Wrapper = styled.div`
    position: relative;

    background-color: white;
    width: 320px;
    // padding-right: 10px;
    box-shadow: 1px 1px 2px lightgrey;
`;
const Container = styled.div`
    position: relative;
    padding-top: 50px;
    z-index: 0;
`;
function RegisterSection(props) {
    // const isMobile = useMediaQuery({ query: '(max-width:768px)' });

    return (
        <div>
            <HeaderLogOut registerDisplay="flex" centerDisplay="none" />
            <Container>
                <Map />
                <Wrapper
                    className="searchData_wrapper"
                    style={{ height: 'calc(100vh - 50px)' }}
                >
                    <SearchData />
                </Wrapper>
            </Container>
        </div>
    );
}
export default RegisterSection;
