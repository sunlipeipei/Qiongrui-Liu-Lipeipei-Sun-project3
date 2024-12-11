/**
 * Form for creating or editing posts
 */

import { useContext, useState } from "react";
import '../styles/PostForm.css';
import { AuthContext } from '../context/AuthContext';

export default function PostForm({onPostAdded}){

    const [contentState, setContentState] = useState('')
    const [errorMsgState, setErrorMsgState] = useState(null)
    const {user} = useContext(AuthContext); // Current user

    async function addNewPost() {
        try {
            await axios.post(`/api/posts/`, {contentState});
            console.log('New post created:', response.data);
            // update post lists after the new post added
            if (onPostAdded) {
                onPostAdded(response.data);
            }
            setContent('');
            setErrorMsg(null);
        } catch (error) {
            setErrorMsgState('Failed to add the post. Please try again.');
            console.error(error);
        }
    }

    return(
        <div>
            {/* <h1>{user.username}</h1> */}
            <div >
            <form onSubmit={addNewPost}>
                <textarea 
                    placeholder={"What is happening?!"}
                    value={contentState}
                    onChange={(e) => setContentState(e.target.value)}
                >
                </textarea>
            </form>
            <button>Post</button>
                {errorMsgState && <p>{errorMsg}</p>}
            </div>
        </div>
    )
}