/**
 * Homepage displaying all posts
 */

import '../styles/HomePage.css';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PostList from '../components/PostList';
import UserProfile from '../components/UserProfile';

const HomePage = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="homepage">
            {/* Render the PostList component */}
            <PostList />
        </div>
    );
};

export default HomePage;


