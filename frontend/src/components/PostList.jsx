/**
 * Component for displacing posts
 */

import '../styles/PostList.css';
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";
import PostForm from './PostForm';

export default function PostList({username}) {

    const { user: activeUser } = useContext(AuthContext); // Logged-in user
    const [postDetailState, setPostDetailState] = useState(null);
    const [errorMsgState, setErrorMsgState] = useState(null);
    const [loadingState, setLoadingState] = useState(true);
    const [editingPostState, setEditingPostState] = useState(null);

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        try {
            const response = await axios.get('/api/post'); 
            // Filter posts only if `username` is provided
            const allPosts = response.data;
            const filteredPosts = username
                ? allPosts.filter((post) => post.username === username)
                : allPosts;
            const sortedPosts = filteredPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setPostDetailState(sortedPosts);
        } catch (error) {
            setErrorMsgState('Failed to fetch posts. Please try again.');
            console.error(error);
        } finally {
            setLoadingState(false);
        }
    }

    async function deletePost(post_id) {
        try {
            await axios.delete(`/api/post/${post_id}`);
            console.log('Post with id: ',{post_id}, ' has been deleted');
            await getPosts(); // Fetch posts after deletion
        } catch (error) {
            setErrorMsgState('Failed to delete the post. Please try again.');
            console.error(error);
        }
    }

    async function updatePost(updatedPost) {
        try {
            const token = localStorage.getItem('userToken');
        if (!token) {
            setErrorMsgState('You must be logged in to update a post.');
            return;
        }
        
            await axios.put(`/api/post/${updatedPost._id}`, updatedPost);
            getPosts();
            setEditingPostState(null);
        } catch (error) {
            setErrorMsgState('Failed to update the post. Please try again.');
            console.error(error);
        }
    };

    function closeErrorMsg(){
        setErrorMsgState(null);
    }
    
    if (loadingState) {
        return <div>Loading posts...</div>
    }

    if (!postDetailState || postDetailState.length === 0) {
        return (
            <div className='post-list'>
                <div className='post'>Sorry, there is no posts available.</div>
            </div>
        );
    }

    return (
        <div className="post-list">

            {errorMsgState && (
                <div className="error-message">
                    <p>{errorMsgState}</p>
                    <button onClick={closeErrorMsg}>Close</button>
                </div>
            )}

            {((activeUser &&!username) || (activeUser && activeUser.username === username)) && (
                <div className="post">
                    <PostForm onPostAdded={() => getPosts()} />
                </div>
            )}

            {postDetailState.map((post) => (
                <div key={post._id} className="post">
                    <Link to={`/user/${post.username}`} className="post-link">
                        <h3>{post.username}</h3>
                    </Link>
                    <small className="timeStamp">
                        {new Date(post.timestamp).toLocaleString()}
                    </small>
                    {editingPostState === post._id ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const updatedContent = e.target.elements.content.value;
                                updatePost({ ...post, content: updatedContent });
                            }}
                        >
                            <textarea name="content" defaultValue={post.content}></textarea>
                            <div>
                                <button type="submit">Update</button>
                                <button onClick={() => setEditingPostState(null)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <p className="post-content">{post.content}</p>
                    )}
                    <button onClick={() => setEditingPostState(post._id)}>Edit</button>
                    <button onClick={()=>deletePost(post._id)}>Delete</button> 
                    {editingPostState === post.id ? 
                        <button>Update</button> :
                        ''
                    }
                </div>
            ))}
        </div>
        
    );
}
