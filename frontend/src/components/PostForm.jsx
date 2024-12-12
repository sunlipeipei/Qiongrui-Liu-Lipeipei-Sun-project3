/**
 * Form for creating or editing posts
 */

import { useContext, useState } from "react";
import axios from "axios"; // Import axios
import '../styles/PostForm.css';
import { AuthContext } from '../context/AuthContext';

export default function PostForm({ onPostAdded }) {
    const [contentState, setContentState] = useState(''); 
    const [imageState, setImageState] = useState(null)
    const [errorMsgState, setErrorMsgState] = useState(null); 

    async function addNewPost(e) {
        e.preventDefault();
    
        if (!contentState.trim() && !imageState) {
            setErrorMsgState("Post needs to include either text or an image.");
            return;
        }
    
        const postFormData = new FormData();
        postFormData.append("content", contentState || ""); 
        if (imageState) {
            postFormData.append("image", imageState);
        }
    
        try {
            const response = await axios.post(`/api/post`, postFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log('New post created:', response.data);
            if (onPostAdded) {
                onPostAdded(response.data);
            }
            setContentState('');
            setImageState(null);
            setErrorMsgState(null);
        } catch (error) {
            setErrorMsgState(error.response?.data || 'Failed to add the post. Please try again.');
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageState(e.target.files[0])}
                    />
                    <button type="submit" className="post-button">Post</button>
                </form>
            </div>
        </div>
    );
}