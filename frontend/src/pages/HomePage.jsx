/**
 * Homepage displaying all posts
 */

import '../styles/HomePage.css';

import { useState } from 'react';

import PostList from '../components/PostList';

const HomePage = () => {
    const [message, setMessage] = useState("Welcome!");

    return (
        <div>
            <h1>{message}</h1>
            <PostList />
        </div>
    );
};

export default HomePage;

