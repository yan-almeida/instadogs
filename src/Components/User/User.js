import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserHeader from './UserHeader';
import Feed from '../Feed/Feed';
import UserPhotoPost from './UserPhotoPost';

const User = () => {
  return (
    <section className="container">
      <UserHeader />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="post" element={<UserPhotoPost />} />
        <Route path="stats" element={<UserPhotoPost />} />
      </Routes>
    </section>
  );
};

export default User;
