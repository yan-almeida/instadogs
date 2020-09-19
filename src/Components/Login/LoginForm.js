import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Form/Button';
import Input from '../Form/Input';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) getUser(token);
  }, []);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);

    const res = await fetch(url, options);
    const json = await res.json();

    console.log(json);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });

      const res = await fetch(url, options);
      const { token } = await res.json();

      window.localStorage.setItem('token', token);
      getUser(token);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />

        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
