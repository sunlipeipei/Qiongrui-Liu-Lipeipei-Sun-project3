/**
 * Display user profile details
 */
import '../styles/UserProfile.css';
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

export default function UserProfile(){
    const {userName} = useParams();
    const [userState, setUserState] = useState(null)
    const [loadingState, setLoadingState] = useState(true);
    const [errorMsgState, setErrorMsgState] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, [userName]);

    async function fetchUserData() {
        try {
            setLoadingState(true)
            const response = await axios.get(`/api/user/${userName}`);
            // console.log('userName from URL:', userName);
            console.log(response.data)
            setUserState(response.data);
        } catch (err) {
            setErrorMsgState("Error loading user data.");
        } finally {
            setLoadingState(false);
        }
    }

    if (loadingState) {
        return <div>Loading posts...</div>
    }

    function closeErrorMsg(){
        setErrorMsgState(null);
    }

    return (
        <div className='user-profile'>
            <div className="profile">
                {errorMsgState && (
                    <div className="error-message">
                        <p>{errorMsgState}</p>
                        <button onClick={closeErrorMsg}>Close</button>
                    </div>
                )}

                {/* Check if userState is defined before accessing its properties */}
                {userState ? (
                    <>
                        <h1 >{userState.username}</h1>
                        <p>{userState.description || 'No description available'}</p>
                        <small className="timeStamp">
                        Joined since {new Date(userState.timestamp).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                        </small>
                    </>
                ) : (
                    <p>User data is not available.</p>
                )}
            </div>
        </div>

    )
}