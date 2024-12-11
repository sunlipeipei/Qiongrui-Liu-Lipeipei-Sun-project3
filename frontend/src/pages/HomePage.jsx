/**
 * Homepage displaying all posts
 */

import '../styles/HomePage.css';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PostList from '../components/PostList';

const HomePage = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="homepage">
            <h1>Welcome to the Homepage.</h1>
            {user ? (
                <h2>Welcome back, {user.username}!</h2>
            ) : (
                <h2>Hello, Visitor!</h2>
            )}

            <p>
                {user
                    ? 'You can create, edit, and delete posts.'
                    : 'Log in to interact with posts. You can still view all posts below.'}
            </p>

            {/* Render the PostList component */}
            <PostList />
        </div>
    );
};

export default HomePage;


