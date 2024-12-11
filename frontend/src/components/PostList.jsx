/**
 * Component for displacing posts
 */

import '../styles/PostList.css';
import { useState, useEffect } from 'react';

export default function PostList() {
    // Mocked post data
    const postDetailStateTest = {
        "posts": [
            {
                "id": 1,
                "username": "testuser",
                "content": "This is a mocked post",
                "timestamp": "2023-12-10T10:00:00Z"
            },
            {
                "id": 2,
                "username": "testuser",
                "content": "This is a mocked post",
                "timestamp": "2023-11-10T10:00:00Z"
            }
        ]
    };

    const [postDetailState, setPostDetailState] = useState(postDetailStateTest);
    const [errorMsgState, setErrorMsgState] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(true);

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
            {postDetailState.posts.map((post) => (
                <div key={post.id} className="post">
                    <h3 >{post.username}</h3>
                    <small className='timeStamp'>
                        {new Date(post.timestamp).toLocaleString()}
                    </small>
                    <p className="post-content">{post.content}</p>
                    {/* Todo: work on edit */}
                    <button>Edit</button> <button onClick={()=>deletePost(post.id)}>Delete</button> 
                </div>
            ))}
        </div>
    );
}
