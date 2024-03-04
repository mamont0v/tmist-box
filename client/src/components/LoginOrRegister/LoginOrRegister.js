import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import styled from 'styled-components';

// Импортируйте другие необходимые компоненты и библиотеки

const LoginOrRegister = () => {
    const [isLoginView, setIsLoginView] = useState(true); // true для входа, false для регистрации

    const toggleView = () => setIsLoginView(!isLoginView);

    const Button = styled.button`
    padding: 8px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  
    &:hover {
      background-color: #0056b3;
    }
  `;
    return (
        <div>
            {isLoginView ? (
                <>
                    <LoginForm />


                    <Button onClick={toggleView}>Нет учетной записи?</Button>
                </>
            ) : (
                <>
                    <SignUpForm /> {/* Предполагается, что у вас есть компонент для регистрации */}
                    <Button onClick={toggleView}>Вернуться в форму входа</Button>
                </>
            )}
        </div>
    );
};

export default LoginOrRegister;