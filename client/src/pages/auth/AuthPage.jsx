import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout, signup } from '../../redux/auth/auth.action.js';

import { Button } from '../../components/Button/Button';

import { BsFillLockFill } from 'react-icons/bs';
import AuthField from '../../components/AuthField/AuthField';
import { FiMail } from 'react-icons/fi';


export const AuthPage = ({ toggleTheme }) => {
  const dispatch = useDispatch();

  const [mail, setMail] = useState < string > ('');
  const [password, setPassword] = useState < string > ('');

  return (
    <div>
      <div>
        <div>
          <div
            style={{
              width: '25px',
              height: '25px',
              backgroundColor: 'yellow',
              borderRadius: '12px',
            }}
            onClick={toggleTheme}
          ></div>
          <div>
            <div>
              <div>
                <form>
                  <Button
                    id='email'
                    name='email'
                    value={mail}
                    type='text'
                    autoComplete='email'
                    placeholder='Введите email'
                    onChange={(e) => setMail(e.target.value)}
                    svg={<FiMail />}
                  />

                  <Button
                    id='password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    autoComplete='password'
                    placeholder='Введите пароль'
                    svg={<BsFillLockFill />}
                  />
                  <button onClick={() => dispatch(login(mail, password))}>
                    Войти
                  </button>

                  <button onClick={() => dispatch(signup(mail, password))}>
                    Зарегистироваться
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <div>
              <h1 style={{ textAlign: 'center' }}>
                SGRC система для выполнения требований ФЗ-187
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
