import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { signup } from '../../redux/auth/auth.action.js';

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

const SignUpForm = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch из хука useDispatch
  const signUser = useSelector(state => state.auth); // Получаем данные о входе пользователя из состояния Redux
 

  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signup(email, password)); // Отправляем данные на сервер через Redux action

    // setUsername('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    // Здесь вы можете добавить логику для обработки изменений в loggedInUser,
    // если это необходимо
  }, [signUser]);

  return (
    <Form onSubmit={handleSubmit}>
    <h1>Регистрация</h1>
      {/* <Label>
        Username:
        <Input
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </Label> */}
      <br />
      <Label>
        Email:
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
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
      <Button type="submit">Создать учетную запись</Button>
    </Form>
  );
}

export default SignUpForm;