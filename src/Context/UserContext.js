import React from 'react';
import { TOKEN_POST, USER_GET } from '../api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) getUser(token);
  }, []);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);

    const res = await fetch(url, options);
    const json = await res.json();

    setData(json);
    setLoading(true);
    console.log(json);
  };

  const userLogin = async (username, password) => {
    const { url, options } = TOKEN_POST({ username, password });

    const res = await fetch(url, options);
    const { token } = await res.json();

    window.localStorage.setItem('token', token);

    getUser(token);
  };

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};
