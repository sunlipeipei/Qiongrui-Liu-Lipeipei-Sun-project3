/**
 * Homepage displaying all posts
 */

import '../styles/HomePage.css';

import React, { useState } from 'react';

const HomePage = () => {
    const [message, setMessage] = useState("Welcome!");

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={() => setMessage("Button clicked Test")}>
                Test Button
            </button>
        </div>
    );
};

export default HomePage;

