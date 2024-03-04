import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../redux/auth/auth.action.js';

// import './LoginForm.styles.scss'

// CSS-in-JS
const Form = styled.form`

`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch из хука useDispatch
  const loggedInUser = useSelector(state => state.auth); // Получаем данные о входе пользователя из состояния Redux
 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Диспетчеризируем действие login, передавая ему email и password
    dispatch(login(email, password));
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    // Здесь вы можете добавить логику для обработки изменений в loggedInUser,
    // если это необходимо
  }, [loggedInUser]);

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login Form</h1>
      <Label>
        Email:
        <Input
          type="text"
          value={email}
          onChange={handleUsernameChange}
        />
      </Label>
      <br />
      <Label>
        Password:
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Label>
      <br />
      <Button type="submit">Войти</Button>
    </Form>
  );
}

export default LoginForm;