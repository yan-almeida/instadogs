import React from 'react';
import Button from '../Form/Button';
import Input from '../Form/Input';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('lost', 'reset'),
      });

      await request(url, options);
    }
  };

  return (
    <section>
      <Head title="Lost" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email/Usuário" type="text" name="email" {...login} />
          {loading ? (
            <Button disabled>Enviando</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
