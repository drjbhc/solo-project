import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';

function Admin(){

    const userList = useSelector((store) => store.userListReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
          type: 'FETCH_USERLIST'
        })
      }, [])

    function approveMember(userID){
        if (confirm('Approve member?')){
            dispatch({
                type: 'APPROVE_MEMBER',
                payload: userID
              })
        }
    }

    function banMember(userID){
        if (confirm('Ban member?')){
            dispatch({
                type: 'BAN_MEMBER',
                payload: userID
              })
        }
    }

    //if (user.access_level < 10) return <div>Error 403, unauthorized</div>
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Username
                        </th>
                        <th>
                            Request Comment
                        </th>
                        <th>
                            Approval Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    {user.username}
                                </td>
                                <td>
                                    {user.application_comments}
                                </td>
                                <td>
                                    {user.is_approved ? <Button variant="contained" onClick={() => banMember(user.id)}>Ban Member</Button>: <Button variant="contained" onClick={() => approveMember(user.id)}>Approve Member</Button>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
    
}

export default Admin;