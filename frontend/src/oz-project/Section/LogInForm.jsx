import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Header from './Header';
import { Reset } from 'styled-reset';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
    width: 400px;
    height: 200px;
    border: 2px solid orange;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Container = styled.div`
    margin: 0 auto;
    padding-top: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const PTag = styled.div`
    font-size: 5px;
    color: red;
`;
const Input = styled.input`
    &:focus {
        outline: 2px solid orange;
    }
    border: 1px solid orange;
    border-radius: 5px;
`;
function LogInForm(props) {
    const {
        register,
        watch,

        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    // Create the submit method.
    const onSubmit = async () => {
        const userId = watch('userId');
        const password = watch('password');
        const user = {
            userId: userId,
            password: password,
        };

        // Create the POST request
        const { data } = await axios.post(
            'http://localhost:8000/api/v1/users/login/',
            user,
            { headers: { 'Content-Type': 'application/json' } },
            { withCredentials: true }
        );
        console.log(user);
        // Initialize the access & refresh token in localstorage.
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${data['access']}`; // 설명을 다시 듣던지.. 공부를 하던지... 봐도 모르겠다
        // window.location.href = '/';
        navigate('/', { replace: true });
    };

    return (
        <div>
            <Header />
            <Container>
                <Reset />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormWrapper>
                        <div
                            style={{ display: 'flex', flexDirection: 'center' }}
                        >
                            <label htmlFor="userId">아이디 : </label>
                            <Input
                                id="userId"
                                type="text"
                                placeholder="아이디를 입력하세요"
                                // input의 기본 config를 작성
                                {...register('userId', {
                                    required: '아이디는 필수 입력입니다.',
                                    minLength: {
                                        value: 8,
                                        message:
                                            '아이디는 8글자 이상이어야 합니다',
                                    },
                                    pattern: {
                                        // input의 정규식 패턴
                                        value: /^[A-za-z0-9가-힣]{3,10}$/,
                                        message:
                                            '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자', // 에러 메세지
                                    },
                                })}
                            />
                            {errors.id && (
                                <PTag role="alert">{errors?.id?.message}</PTag>
                            )}
                        </div>
                        <div
                            style={{ display: 'flex', flexDirection: 'center' }}
                        >
                            <label htmlFor="password">비밀번호 : </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="****************"
                                {...register('password', {
                                    required: '비밀번호는 필수 입력입니다.',
                                    minLength: {
                                        value: 8,
                                        message:
                                            '비밀번호는 8글자 이상이어야 합니다',
                                    },
                                    pattern: {
                                        // input의 정규식 패턴
                                        value: /^[a-zA-Z][0-9a-zA-Z]{8,16}$/,
                                        message:
                                            '가능한 문자: 8 ~ 10자 영문, 숫자 조합', // 에러 메세지
                                    },
                                })}
                            />
                            {errors.password && (
                                <PTag role="alert">
                                    {errors?.password?.message}
                                </PTag>
                            )}
                        </div>
                    </FormWrapper>
                    <span style={{ display: 'inline-block' }}>
                        <button
                            type="submit"
                            style={{
                                padding: '5px',
                                border: '1px solid lightgrey',
                                borderRadius: 10,
                            }}
                        >
                            로그인
                        </button>
                    </span>
                </Form>
            </Container>
        </div>
    );
}
export default LogInForm;