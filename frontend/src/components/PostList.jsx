/**
 * Component for displacing posts
 */

import '../styles/PostList.css';
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PostForm from './PostForm';

export default function PostList() {
    // Mocked post data
    // const postDetailStateTest = {
    //     "posts": [
    //         {
    //             "id": 1,
    //             "username": "Peipei",
    //             "content": "This is a mocked post",
    //             "timestamp": "2023-12-10T10:00:00Z"
    //         },
    //         {
    //             "id": 2,
    //             "username": "Qiongrui",
    //             "content": "This is a mocked post",
    //             "timestamp": "2023-11-10T10:00:00Z"
    //         }
    //     ]
    // };
    // const userNameTest = "Peipei"

    const {user} = useContext(AuthContext); // Current user
    const [postDetailState, setPostDetailState] = useState(null);
    const [errorMsgState, setErrorMsgState] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [editingPostStatus, setEditingPostStatus] = useState(null);

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        try {
            // Todo: Once everything is good to go, replace sample data with api call below
            const response = await axios.get('/api/post'); 
            setPostDetailState(response.data);
            // Simulating a successful API call with mocked data
            // setPostDetailState(postDetailStateTest);
        } catch (error) {
            setErrorMsgState('Failed to fetch posts. Please try again.');
            console.error(error);
        } finally {
            setLoadingStatus(false);
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
            await axios.put(`/api/post/${updatedPost._id}`, updatedPost);
            getPosts();
            setEditingPostId(null);
        } catch (error) {
            setErrorMsg('Failed to update the post. Please try again.');
            console.error(error);
        }
    };

    function closeErrorMsg(){
        setErrorMsgState(null);
    }
    
    if (loadingStatus) {
        return <div>Loading posts...</div>
    }


    if (!postDetailState || postDetailState.length === 0) {
        return <div>No posts available.</div>;
    }

    return (
        <div className="post-list">

            {errorMsgState && (
                <div className="error-message">
                    <p>{errorMsgState}</p>
                    <button onClick={closeErrorMsg}>Close</button>
                </div>
            )}

            {user && (
                <div className="post">
                    <PostForm onPostAdded={() => getPosts()} />
                </div>
            )}

            {postDetailState.map((post) => (
                <div key={post._id} className="post">
                    <h3>{post.username}</h3>
                    <small className="timeStamp">
                        {new Date(post.timestamp).toLocaleString()}
                    </small>
                    {editingPostStatus === post._id ? (
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
                                <button onClick={() => setEditingPostStatus(null)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <p className="post-content">{post.content}</p>
                    )}
                    {/* Show Edit and Delete buttons only if the logged-in user matches */}
                    {/* {user.username === post.username && (
                        <>
                            <button onClick={() => setEditingPostId(post.id)}>Edit</button>
                            <button onClick={() => deletePost(post.id)}>Delete</button>
                            {editingPostStatus === post.id ? <button>Update</button> : <></>}
                        </>
                    )} */}
                    <button onClick={() => setEditingPostStatus(post._id)}>Edit</button>
                    <button onClick={()=>deletePost(post._id)}>Delete</button> 
                    {editingPostStatus === post.id ? 
                        <button>Update</button> :
                        ''
                    }
                </div>
            ))}
        </div>
        
    );
}
