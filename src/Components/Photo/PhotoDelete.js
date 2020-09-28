import React from 'react';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../Hooks/useFetch';
import styles from './PhotoDelete.module.css';

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  const handleClick = async () => {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    const token = window.localStorage.getItem('token');

    if (confirm) {
      const { url, options } = PHOTO_DELETE(id, token);
      const { res } = await request(url, options);

      if (res.ok) window.location.reload();
    }
  };
  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletando
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
