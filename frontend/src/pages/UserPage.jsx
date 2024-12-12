import '../styles/UserPage.css';

import { AuthContext } from '../context/AuthContext';
import React from 'react';
import { useState, useContext } from 'react';
import PostList from '../components/PostList';
import UserProfile from '../components/UserProfile';
import { useParams } from 'react-router-dom';

export default function UserPage(){

  const { activeUser, loading } = useContext(AuthContext);
  const { userName } = useParams(); 
  // test
  console.log('User:', activeUser);
  console.log('Loading:', loading);

  return (
    <div>
      <UserProfile />
      <PostList username={userName} />
    </div>
  );
};
