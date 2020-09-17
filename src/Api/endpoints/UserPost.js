import React from 'react';

const UserPost = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://dogapi.test/json/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const json = await res.json();
    console.log(json);
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
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="password"
      />
      <button>Enviar</button>
    </form>
  );
};

export default UserPost;
