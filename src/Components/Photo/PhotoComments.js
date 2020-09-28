import React from 'react';
import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';

const PhotoComments = ({ comment, id }) => {
  const [comments, setComments] = React.useState(() => comment);
  const { login } = React.useContext(UserContext);
  const commentsSection = React.useRef(null);

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul className={styles.comments} ref={commentsSection}>
        {comments &&
          comments.map(({ comment_ID, comment_author, comment_content }) => (
            <li key={comment_ID}>
              <b>{comment_author}: </b>
              <span>{comment_content}</span>
            </li>
          ))}
      </ul>
      {login && <PhotoCommentsForm id={id} setComments={setComments} />}
    </>
  );
};

export default PhotoComments;
