import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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