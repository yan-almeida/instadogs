import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserHeader from './UserHeader';
import Feed from '../Feed/Feed';
import UserPhotoPost from './UserPhotoPost';
import { UserContext } from '../../UserContext';

const User = () => {
  const { data } = React.useContext(UserContext);

  return (
    <section className="container">
      <UserHeader />

      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="post" element={<UserPhotoPost />} />
        <Route path="stats" element={<UserPhotoPost />} />
      </Routes>
    </section>
  );
};

export default User;
