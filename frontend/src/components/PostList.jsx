/**
 * Component for displacing posts
 */

import '../styles/PostList.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PostForm from './PostForm';

export default function PostList() {
    // Mocked post data
    const postDetailStateTest = {
        "posts": [
            {
                "id": 1,
                "username": "Peipei",
                "content": "This is a mocked post",
                "timestamp": "2023-12-10T10:00:00Z"
            },
            {
                "id": 2,
                "username": "Qiongrui",
                "content": "This is a mocked post",
                "timestamp": "2023-11-10T10:00:00Z"
            }
        ]
    };
    const userNameTest = "Peipei"

    const {auth} = useContext(AuthContext); // Current user
    const [postDetailState, setPostDetailState] = useState(postDetailStateTest);
    const [errorMsgState, setErrorMsgState] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [editingPostStatus, setEditingPostStatus] = useState(null);

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        try {
            // Todo: Once everything is good to go, replace sample data with api call below
            // const response = await axios.get('/api/posts'); // Fix endpoint if needed
            // setPostDetailState(response.data);
            // Simulating a successful API call with mocked data
            setPostDetailState(postDetailStateTest);
        } catch (error) {
            setErrorMsgState('Failed to fetch posts. Please try again.');
            console.error(error);
        } finally {
            setLoadingStatus(false);
        }
    }

    async function deletePost(post_id) {
        try {
            await axios.delete(`/api/posts/${post_id}`);
            console.log('Post with id: ',{post_id}, ' has been deleted');
            await getPosts(); // Fetch posts after deletion
        } catch (error) {
            setErrorMsgState('Failed to delete the post. Please try again.');
            console.error(error);
        }
    }

    async function updatePost(updatedPost) {
        try {
            await axios.put(`/api/posts/${updatedPost.id}`, updatedPost);
            getPosts();
            setEditingPostId(null);
        } catch (error) {
            setErrorMsg('Failed to update the post. Please try again.');
            console.error(error);
        }
    };
    
    if (loadingStatus) {
        return <div>Loading posts...</div>
    }

    if (errorMsgState) {
        return <div>{errorMsgState}</div>;
    }

    if (!postDetailState || !postDetailState.posts || postDetailState.posts.length === 0) {
        return <div>Loading posts...</div>;
    }

    return (
        <div className="post-list">

            {/* {auth.username && (
                <div className="post">
                    <h1>{auth.username}</h1>
                    <PostForm />
                </div>
                    )} */}
            <div className="post" >
                <h1>{userNameTest}</h1>
                <PostForm onPostAdded={()=>getPosts()}/>
            </div>
            {postDetailState.posts.map((post) => (
                <div key={post.id} className="post">
                    <h3 >{post.username}</h3>
                    <small className='timeStamp'>
                        {new Date(post.timestamp).toLocaleString()}
                    </small>
                    {editingPostStatus === post.id ? 
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const updatedContent = e.target.elements.content.value;
                            updatePost({ ...post, content: updatedContent });
                        }}>
                            <textarea 
                                name = 'content'
                                defaultValue={post.content}
                                >
                            </textarea>
                            <div>
                                <button type='submit'>Update</button>
                                <button onClick={() => setEditingPostStatus(null)}>Cancel</button>
                            </div>
                        </form>
                        :
                        <p className="post-content">{post.content}</p>
                    }
                    {/* Show Edit and Delete buttons only if the logged-in user matches */}
                    {/* {auth.username === post.username && (
                        <>
                            <button onClick={() => setEditingPostId(post.id)}>Edit</button>
                            <button onClick={() => deletePost(post.id)}>Delete</button>
                            {editingPostStatus === post.id ? <button>Update</button> : <></>}
                        </>
                    )} */}
                    <button onClick={() => setEditingPostStatus(post.id)}>Edit</button>
                    <button onClick={()=>deletePost(post.id)}>Delete</button> 
                    {editingPostStatus === post.id ? 
                        <button>Update</button> :
                        ''
                    }
                </div>
            ))}
        </div>
        
    );
}
