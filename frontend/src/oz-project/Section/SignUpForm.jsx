import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Header from './Header';
import { Reset } from 'styled-reset';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
const Button = styled.div`
    display: inline-block;
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
function SignUpForm(props) {
    const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태값

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        if (data.password !== data.passwordCheck) {
            // 비밀번호와 비밀번호 확인이 일치하지 않을 경우
            setPasswordMatch(false);
            alert('비밀번호가 일치하지 않습니다');
            return;
        }
        const signUp = axios.post(
            'http://localhost:8000/api/v1/users/create_user/',
            data
        );
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
                            <label htmlFor="username">이름 : </label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="이름을 입력하세요"
                                // input의 기본 config를 작성
                                {...register('username', {
                                    required: {
                                        value: true,
                                        message: '이름은 필수 입력입니다.',
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            '이름은 3글자 이상이어야 합니다',
                                    },
                                    pattern: {
                                        // input의 정규식 패턴
                                        value: /^[A-za-z가-힣]/,
                                        message:
                                            '가능한 문자: 영문 대소문자, 글자 단위 한글', // 에러 메세지
                                    },
                                })}
                            />
                        </div>
                        {errors.username && (
                            <PTag role="alert">
                                {errors?.username?.message}
                            </PTag>
                        )}

                        <div>
                            <label htmlFor="userId">아이디 : </label>
                            <Input
                                id="userId"
                                type="text"
                                placeholder="아이디를 입력하세요"
                                // input의 기본 config를 작성
                                {...register('userId', {
                                    required: {
                                        value: true,
                                        message: '아이디는 필수 입력입니다.',
                                    },
                                    minLength: {
                                        value: 6,
                                        message:
                                            '아이디는 6글자 이상이어야 합니다',
                                    },
                                    pattern: {
                                        // input의 정규식 패턴
                                        value: /^[a-zA-Z][0-9a-zA-Z]{6,20}$/,
                                        message:
                                            '가능한 문자: 영문 대소문자, 숫자', // 에러 메세지
                                    },
                                })}
                            />
                            {errors.userId && (
                                <PTag role="alert">
                                    {errors?.userId?.message}
                                </PTag>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password">비밀번호 : </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="****************"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: '비밀번호는 필수 입력입니다.',
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            '비밀번호는 8글자 이상이어야 합니다',
                                    },
                                    pattern: {
                                        // input의 정규식 패턴
                                        value: /^[a-zA-Z][0-9a-zA-Z]{8,20}$/,
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
                        <div>
                            <label htmlFor="password">비밀번호 확인 : </label>
                            <Input
                                id="passwordCheck"
                                type="password"
                                placeholder="****************"
                                {...register('passwordCheck', {
                                    required: {
                                        value: true,
                                        message: '비밀번호 확인은 필수입니다.',
                                    },
                                    // validate: (value, data) => {
                                    //     value === data.password ||
                                    //         '비밀번호가 일치하지 않습니다';
                                    // },
                                    pattern: {
                                        // input의 정규식 패턴
                                        value: /^[a-zA-Z][0-9a-zA-Z]{8,16}$/,
                                        message:
                                            '가능한 문자: 8 ~ 10자 영문, 숫자 조합', // 에러 메세지
                                    },
                                })}
                            />
                            {errors.passwordCheck && (
                                <PTag role="alert">
                                    {errors?.passwordCheck?.message}
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
                            회원가입
                        </button>
                    </span>
                </Form>
            </Container>
        </div>
    );
}
export default SignUpForm;
