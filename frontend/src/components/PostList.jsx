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
        }
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
                    <small >
                        {new Date(post.timestamp).toLocaleString()}
                    </small>
                    <p className="post-content">{post.content}</p>
                    {/* Todo: work on edit and delete */}
                    <button>Edit</button> <button>Delete</button> 
                </div>
            ))}
        </div>
    );
}