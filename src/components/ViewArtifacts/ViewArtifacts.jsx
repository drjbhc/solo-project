import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

function ViewArtifacts() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const tableList = useSelector(store => store.artifactReducer);

    let userID = params.userID;

    useEffect(() => {
        dispatch({
          type: 'FETCH_ARTIFACT_LIST',
          payload: userID
        })
      }, [])


    return (
        <div>
            {/* <span>
                {headerButtons()}
            </span> */}





            <table>
                <thead>
                    <tr>
                        <th>
                            Artifact Name
                        </th>
                        <th>
                            Artifact Description
                        </th>
                        <th>
                            Date of composition
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>


                {tableList.map((entry, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    {entry.artifact}
                                </td>
                                <td>
                                    {entry.artifact_description}
                                </td>
                                <td>
                                    {entry.earliest_date} - {entry.latest_date}
                                </td>
                                <td>
                                    <button>
                                        DELETE (not yet functional)
                                    </button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>
        </div>
    )
}

export default ViewArtifacts;

/*
    function headerButtons() {


        return (
            <span>
                <button onClick={() => history.push('/')}>
                    Home
                </button>
                <button onClick={() => history.push(`/viewartifacts/${userID}`)}>
                    View by Year
                </button>
                <button onClick={() => history.push(`/viewconnections/${userID}`)}>
                    View by Connection
                </button>
                <button>
                    Add Artifact
                </button>
                <button>
                    Add Connection
                </button>
            </span>
        )
    }
*/