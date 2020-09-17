/* eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9kb2dhcGkudGVzdCIsImlhdCI6MTYwMDI3NjcxNywibmJmIjoxNjAwMjc2NzE3LCJleHAiOjE2MDAzNjMxMTcsImRhdGEiOnsidXNlciI6eyJpZCI6IjUifX19.LWTL0w314OqTcS4EBW445CJ7JHhDaf86JLp7SVN4JsM */

import React from 'react';

const PhotoPost = () => {
  const [token, setToken] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [img, setImg] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('img', img);
    formData.append('nome', nome);
    formData.append('peso', peso);
    formData.append('idade', idade);

    const res = await fetch('http://dogapi.test/json/api/photo', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const json = await res.json();
    console.log(json);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={token}
        onChange={({ target }) => setToken(target.value)}
        placeholder="token"
      />
      <input
        type="text"
        value={nome}
        onChange={({ target }) => setNome(target.value)}
        placeholder="nome"
      />
      <input
        type="text"
        value={peso}
        onChange={({ target }) => setPeso(target.value)}
        placeholder="peso"
      />
      <input
        type="text"
        value={idade}
        onChange={({ target }) => setIdade(target.value)}
        placeholder="idade"
      />

      <input type="file" onChange={({ target }) => setImg(target.files[0])} />
      <button>Enviar</button>
    </form>
  );
};

export default PhotoPost;
