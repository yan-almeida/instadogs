import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Form/Button';
import Input from '../Form/Input';
import useForm from '../../Hooks/useForm';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      const res = await fetch('http://dogapi.test/json/jwt-auth/v1/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(),
      });
      const json = await res.json();

      console.log(json);
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
