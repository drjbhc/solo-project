import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function viewConnections() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const tableList = useSelector(store => store.connectionReducer);
    const dropDown = useSelector(store => store.artifactReducer);

    let userID = params.userID;

    const [connectionID, setConnectionID] = useState(0);

    useEffect(() => {
        dispatch({
          type: 'FETCH_CONNECTION_LIST',
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
                    <td>
                        <button>DELETE (not working yet)</button>
                    </td>
                </tr>
            )
          }
      }

    return (
        <div>
            <select onChange = {(event) => setConnectionID(event.target.value)}>
                {dropDown.map(item => {
                    return (
                        <option value={item.id}>{item.artifact}</option>
                    )
                })}
            </select>



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
                        <th>
                            Delete
                        </th>
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