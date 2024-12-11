/**
 * Form for creating or editing posts
 */

import { useContext, useState } from "react";
import axios from "axios"; // Import axios
import '../styles/PostForm.css';
import { AuthContext } from '../context/AuthContext';

export default function PostForm({ onPostAdded }) {
    const [contentState, setContentState] = useState(''); 
    const [errorMsgState, setErrorMsgState] = useState(null); 
    const { user } = useContext(AuthContext);

    async function addNewPost(e) {
        e.preventDefault(); 
        if (!contentState.trim()) {
            setErrorMsgState("Post content cannot be empty.");
            return;
        }
        try {
            const response = await axios.post(`/api/post`, { content: contentState }); // API call
            console.log('New post created:', response.data);

            // Callback to for PostList to update post list
            if (onPostAdded) {
                onPostAdded(response.data);
            }

            // Reset the input and error message
            setContentState('');
            setErrorMsgState(null);
        } catch (error) {
            setErrorMsgState('Failed to add the post. Please try again.');
            console.error(error);
        }
    }

    function closeErrorMsg(){
        setErrorMsgState(null);
    }

    return (
        <div className="post-form">
            {/* <h1>{user.username}</h1> */}
            {errorMsgState && (
                <div className="error-message">
                    <p>{errorMsgState}</p>
                    <button onClick={closeErrorMsg}>Close</button>
                </div>
            )}
            <div>
                <form onSubmit={addNewPost}>
                    <textarea
                        placeholder="What is happening?!"
                        value={contentState}
                        onChange={(e) => setContentState(e.target.value)}
                        className="post-textarea"
                    />
                    <button type="submit" className="post-button">Post</button>
                </form>
            </div>
        </div>
    );
}