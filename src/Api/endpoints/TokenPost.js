import React from 'react';

const TokenPost = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://dogapi.test/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const { token } = await res.json();

    setToken(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        placeholder="username"
      />

      <input
        type="text"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="password"
      />
      <button>Enviar</button>

      <p style={{ wordBreak: 'break-all' }}>{token && token}</p>
    </form>
  );
};

export default TokenPost;
