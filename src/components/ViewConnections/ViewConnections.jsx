import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

function viewConnections() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const tableList = useSelector(store => store.connectionReducer);

    const dropDown = useSelector(store => store.artifactReducer);
    
    const user = useSelector((store) => store.user);

    let userID = params.userID;

    const [connectionID, setConnectionID] = useState(1);

    useEffect(() => {
        dispatch({
          type: 'FETCH_CONNECTION_LIST',
          payload: userID
        })
        dispatch({
            type: 'FETCH_ARTIFACT_LIST',
            payload: userID
          })
      }, [])

      function connectionDisplay(connection, i){
          if (connection.first_artifact_id === connectionID || connection.second_artifact_id === connectionID) {
            return (
                <tr key={i}>
                    <td>
                        {connection.first_artifact_name}
                    </td>
                    <td>
                        {connection.second_artifact_name}
                    </td>
                    <td>
                        {connection.connection_description}
                    </td>

                    {Number(userID)===user.id &&
                    <td>
                        <Button variant="contained">
                            {/* DELETE (not working yet) */}
                            DELETE
                        </Button>
                    </td>}

                </tr>
            )
          }
      }

    return (
        <div>
            <div className="backgroundtext">
                <span>View connections related to: </span>
                <select onChange = {(event) => setConnectionID(Number(event.target.value))}>
                            <option value={0}></option>
                    {dropDown.map(item => {
                        return (
                            <option value={item.id}>{item.artifact}</option>
                        )
                    })}
                </select>
            </div>

            



            <table>
                <thead>
                    <tr>
                        <th>
                            Earlier
                        </th>
                        <th>
                            Later
                        </th>
                        <th>
                            Connection Description
                        </th>

                        {Number(userID)===user.id &&
                        <th>
                            Delete
                        </th>}

                    </tr>
                </thead>
                <tbody>
                    {tableList.map((connection, i) => {
                        return connectionDisplay(connection, i);
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default viewConnections;