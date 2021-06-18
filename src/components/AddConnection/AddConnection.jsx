import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function AddConnection(){

    const dispatch = useDispatch();

    const dropDown = useSelector(store => store.artifactReducer);

    const [earlierArtifact, setEarliestArtifact] = useState(0);
    const [latestArtifact, setLatestArtifact] = useState(0);
    const [connectionDescription, setConnectionDescription] = useState('');

    function onClick() {
        event.preventDefault();

        let data = {
            earlier_artifact: earlierArtifact,
            later_artifact: latestArtifact,
            connection_description: connectionDescription
        }

        console.log('the data is', data);

        dispatch({
            type: 'SET_CONNECTION',
            payload: data
        })

        setEarliestArtifact(0);
        setLatestArtifact(0);
        setConnectionDescription('');
    }


    //if (userID === user.id) {
        return (
            <div>
                <form onSubmit={(event) => onClick()}>
                    <p>Earlier Artifact:</p>
                        <select onChange = {(event) => setEarliestArtifact(event.target.value)}>
                                    <option value={0}></option>
                            {dropDown.map(item => {
                                return (
                                    <option value={item.id}>{item.artifact}</option>
                                )
                            })}
                        </select>
                    <p>Later Artifact:</p>
                        <select onChange = {(event) => setLatestArtifact(event.target.value)}>
                                    <option value={0}></option>
                            {dropDown.map(item => {
                                return (
                                    <option value={item.id}>{item.artifact}</option>
                                )
                            })}
                        </select>

                    <p>Describe Connection:</p>
                        <input value={connectionDescription} onChange={(event) => setConnectionDescription(event.target.value)} placeholder="Description" />

                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )}
//     else {
//         return(
//             <div>
//                 You are not supposed to be here
//             </div>
//         )
//     }


// }

export default AddConnection;