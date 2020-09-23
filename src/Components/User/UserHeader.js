import React from 'react';
import UserHeaderNav from './UserHeaderNav';

import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
  const [title, setTitle] = React.useState('');
  const { pathname } = useLocation();

  React.useEffect(() => {
    switch (pathname) {
      case '/account/post':
        setTitle('Postar');
        break;

      case '/account/stats':
        setTitle('Estatisticas');
        break;

      default:
        setTitle('Minha Conta');
        break;
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title && title}</h1>

      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
