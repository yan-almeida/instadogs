import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';
import Head from '../Helpers/Head';

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;

    const infiniteScrolling = () => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;

          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };

    window.addEventListener('wheel', infiniteScrolling);
    window.addEventListener('scroll', infiniteScrolling);

    return () => {
      window.removeEventListener('wheel', infiniteScrolling);
      window.removeEventListener('scroll', infiniteScrolling);
    };
  }, [infinite]);

  return (
    <div style={{ paddingTop: '4rem' }}>
      <Head title="Account" />
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          page={page}
          user={user}
          setInfinite={setInfinite}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.prototype = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
