import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';

function AddArtifact() {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const params = useParams();
    let userID = params.userID;

    const [artifactName, setArtifactName] = useState('');
    const [artifactDescription, setArtifactDescription] = useState('');
    const [earliestDate, setEarliestDate] = useState('');
    const [latestDate, setLatestDate] = useState('');

    function onClick() {
        event.preventDefault();

        let data = {
            artifact: artifactName,
            artifact_description: artifactDescription,
            earliest_date: earliestDate,
            latest_date: latestDate,
            user_id: user.id
        }

        console.log('The data being sent from the DOM is', data);

        dispatch({
            type: 'SET_ARTIFACT',
            payload: data
        })

        setArtifactName('');
        setArtifactDescription('');
        setEarliestDate('');
        setLatestDate('');
    }

    //if (userID === user.id) {
        return(
            <div className='formspace'>
                <form onSubmit={(event) => onClick()}>
                    <p>Name:</p>
                        <input value={artifactName} onChange={(event) => setArtifactName(event.target.value)} placeholder="Name" />
                    <p>Description:</p>
                        <input value={artifactDescription} onChange={(event) => setArtifactDescription(event.target.value)} placeholder="Description" />
                    <p>Earliest Date:</p>
                        <input value={earliestDate} onChange={(event) => setEarliestDate(event.target.value)} placeholder="YYYY CE / YYYY BCE"/>
                    <p>Latest Date:</p>
                        <input value={latestDate} onChange={(event) => setLatestDate(event.target.value)} placeholder="YYYY CE / YYYY BCE"/>

                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
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

export default AddArtifact;