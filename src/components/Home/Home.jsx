import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

function Home() {

    const history = useHistory();
    const dispatch = useDispatch();

    const tableList = useSelector(store => store.homeReducer);

    useEffect(() => {
        dispatch({
          type: 'FETCH_HOMELIST'
        })
      }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            User
                        </th>
                        <th>
                            Link
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableList.map((entry, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    {entry.username}
                                </td>
                                <td>
                                    <Button variant="contained" onClick={() => history.push(`/viewartifacts/${entry.id}`)}>
                                        View data
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home;