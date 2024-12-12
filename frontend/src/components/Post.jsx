import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/PostList.css';

export default function Post({ post, activeUser, onEdit, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedContent = e.target.elements.content.value;
        onUpdate({ ...post, content: updatedContent });
        setIsEditing(false);
    };

    const authorized = activeUser && (activeUser.username === post.username);

    return (
        <Link to={`/user/${post.username}`} className="post">
            <div >
                <h3>{post.username}</h3>

                <small className="timeStamp">{new Date(post.timestamp).toLocaleString()}</small>
                
                {isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <textarea name="content" defaultValue={post.content}></textarea>
                        <div>
                            <button type="submit">Update</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <p >{post.content}</p>
                )}

                {authorized && (
                    <div>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(post._id)}>Delete</button>
                    </div>
                )}
            </div>
        </Link>
    );
}