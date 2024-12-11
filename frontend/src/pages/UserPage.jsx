import '../styles/UserPage.css';

import { AuthContext } from '../context/AuthContext';
import React from 'react';
import { useState, useContext } from 'react';
import PostList from '../components/PostList';
import UserProfile from '../components/UserProfile';

export default function UserPage(){
  const { activeUser, loading } = useContext(AuthContext);
  // test
  console.log('User:', activeUser);
  console.log('Loading:', loading);

  return (
    <div>
      <UserProfile />
      {/* <h1>{activeUser.username}</h1> */}
      <PostList />
    </div>
  );
};
