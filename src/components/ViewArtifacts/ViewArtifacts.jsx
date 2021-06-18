import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

function ViewArtifacts() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const tableList = useSelector(store => store.artifactReducer);
    const user = useSelector((store) => store.user);

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

                        {Number(userID)===user.id &&
                        <th>
                            Delete
                        </th>}

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

                                {Number(userID)===user.id &&
                                <td>
                                    <Button variant="contained">
                                        {/* DELETE (not yet functional) */}
                                        DELETE
                                    </Button>
                                </td>}

                            </tr>
                        )
                    })}


                </tbody>
            </table>
        </div>
    )
}

export default ViewArtifacts;