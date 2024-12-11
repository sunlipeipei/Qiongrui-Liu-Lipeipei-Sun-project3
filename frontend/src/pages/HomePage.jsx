/**
 * Homepage displaying all posts
 */

// TODO: Replace the placeholder code below with the actual HomePage implementation.
// This is for testing AuthContext and NavBar functionality only.
import '../styles/HomePage.css';
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';
import { useState } from 'react';
import PostList from '../components/PostList';

const HomePage = () => {
    const { user, loading } = useContext(AuthContext);
    // test
    console.log('User:', user);
    console.log('Loading:', loading);


    if (loading) {
        return <div>Loading...</div>;
    }
    // test: if user not log in, direct to loginPage
    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div>
            <h1>Welcome to the Homepage</h1>
            {user ? (
                <>
                    <h2>Welcome back, {user.username}!</h2>
                    <p>You can create, edit, and delete posts.</p>
                </>
            ) : (
                <>
                    <h2>Welcome, Visitor!</h2>
                    <p>You can view posts but need to log in to interact.</p>
                </>
            )}
            {/* TO DO */}
            {/* Placeholder for posts - replace with our real posts logic */}
            <div>
                <h3>Posts</h3>
                <p>Here would be all the posts, displayed for everyone.</p>
            </div>
            <h1>{message}</h1>
            <PostList />
        </div>
    );
};

export default HomePage;

