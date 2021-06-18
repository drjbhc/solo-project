import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Header.css';

function Header() {

    const history = useHistory();
    const dispatch = useDispatch();
    const currentURL = history.location.pathname;
    const params = useParams();
    let userID = params.userID;

    const user = useSelector((store) => store.user);

    function headerText() {
        if ( currentURL.includes('viewartifacts') ) return <h1>View by Year</h1>
        if ( currentURL.includes('viewconnections') ) return <h1>View by Connections</h1>
        if ( currentURL.includes('addartifact') ) return <h1>Add new Artifact</h1>
        if ( currentURL.includes('addconnection') ) return <h1>Add new Connection</h1>
        if ( currentURL.includes('login') ) return <h1>Login</h1>
        if ( currentURL.includes('registration') ) return <h1>Register</h1>
        if ( currentURL.includes('admin') ) return <h1>ADMIN PAGE</h1>
        if ( currentURL.includes('home') ) return <h1>Home</h1>

        return <h1>Error 404: Page not Found</h1>
    }

    function publish(){
        if ( user.table_published===false){
            if (confirm('Publish your data?')){
                
                    dispatch({
                      type: 'PUBLISH_TABLE'
                    })

            }
        }
        if (user.table_published===true){
            if (confirm('Unpublish your data?')){
 
                    dispatch({
                      type: 'PUBLISH_TABLE'
                    })

            }
        }
    }
    

    function publishButton(){
        if (Number(userID)===user.id && user.table_published===false){
            return (<button onClick={() => publish()}>Publish</button>)
        }
        else if (Number(userID)===user.id && user.table_published===true){
            return (<button onClick={() => publish()}>Unpublish</button>)
        }
    }



    function headerButtons() {


        return (
            <span>
                <button onClick={() => history.push('/')}>
                    Home
                </button>


                {user.id && <button onClick={() => history.push(`/viewartifacts/${user.id}`)}>User Data</button>}

                    { userID && 
                        <>
                            <button onClick={() => history.push(`/viewartifacts/${userID}`)}>
                                View by Year
                            </button>
                            <button onClick={() => history.push(`/viewconnections/${userID}`)}>
                                View by Connection
                            </button>
                        </>
                    }


                    { Number(userID)===user.id && userID!==undefined && 
                        <>
                            <button onClick={() => history.push(`/addartifact/${userID}`)}>
                                Add Artifact
                            </button>
                            <button onClick={() => history.push(`/addconnection/${userID}`)}>
                                Add Connection
                            </button>
                        </>
                    }
                

                {publishButton()}


                { user.id ? <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button> : <button onClick={() => history.push('/login')}>Login / Register</button>}
            </span>
        )
    }





    return (
        <header>
            <div>
                {headerText()}
                    {user.id && <span>Welcome {user.username}</span>}
            </div>
            <span className='nav-btn'>
                {headerButtons()}
            </span>
        </header>
    )
}

export default Header;