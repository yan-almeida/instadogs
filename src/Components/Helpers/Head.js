import React from 'react';

const Head = ({ title }) => {
  React.useEffect(() => {
    document.title = `${title} | Dogs`;
  }, [title]);

  return <></>;
};

export default Head;
