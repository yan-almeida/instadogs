import React from 'react';
import { USER_POST } from '../../api';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Button from '../Form/Button';
import Input from '../Form/Input';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { userLogin } = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const res = await fetch(url, options);
    if (res.ok) userLogin(username.value, password.value); // autlogin após o usuário se cadastrar, se for com sucesso
  };

  return (
    <section className={`animeLeft`}>
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginCreate;
