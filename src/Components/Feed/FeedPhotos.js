import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ page, user, setInfinite, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const fetchPhotos = async () => {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });

      const { res, json } = await request(url, options);
      if (res && res.ok && json.length < total) setInfinite(false);
    };

    fetchPhotos();
  }, [page, request, setInfinite, user]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <>
        <ul className={`animeLeft ${styles.feed}`}>
          {data &&
            data.map((photo) => (
              <FeedPhotosItem
                key={photo.id}
                photo={photo}
                setModalPhoto={setModalPhoto}
              />
            ))}
        </ul>
      </>
    );
  else return null;
};

export default FeedPhotos;
