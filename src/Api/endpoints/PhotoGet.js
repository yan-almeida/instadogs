/* eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9kb2dhcGkudGVzdCIsImlhdCI6MTYwMDI3NjcxNywibmJmIjoxNjAwMjc2NzE3LCJleHAiOjE2MDAzNjMxMTcsImRhdGEiOnsidXNlciI6eyJpZCI6IjUifX19.LWTL0w314OqTcS4EBW445CJ7JHhDaf86JLp7SVN4JsM */

import React from 'react';

const PhotoGet = () => {
  const [id, setId] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://dogapi.test/json/api/photo/${id}`);
    const json = await res.json();

    console.log(json);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={({ target }) => setId(target.value)}
      />

      <button>Enviar</button>
    </form>
  );
};

export default PhotoGet;
