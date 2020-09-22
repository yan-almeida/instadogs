import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');

    navigate('/login');
  }, [navigate]);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);

    const res = await fetch(url, options);
    const json = await res.json();

    setData(json);
    setLogin(true);
  };

  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });

      const res = await fetch(url, options);

      const { token } = await res.json();
      console.log(res);
      if (!res.ok) throw new Error('Usuário não encontrado/cadastrado.');

      window.localStorage.setItem('token', token);

      await getUser(token);
      navigate('/conta');
    } catch (e) {
      setError(e.message);

      console.log('catch', error);

      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);

          const res = await fetch(url, options);
          if (!res.ok) throw new Error('Token inválido.');

          await getUser(token);
        } catch (e) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else setLogin(false);
    }

    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
