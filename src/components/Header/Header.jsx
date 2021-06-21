import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Header.css';

import Button from '@material-ui/core/Button';

function Header() {

    const history = useHistory();
    const dispatch = useDispatch();
    const currentURL = history.location.pathname;
    const params = useParams();
    let userID = params.userID;

    const user = useSelector((store) => store.user);

    function headerText() {
        if ( currentURL.includes('viewartifacts') ) return <h1>View Documents/Events</h1> /* View by Year if slider is implemented*/
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
            return (<Button variant="contained" onClick={() => publish()}>Publish</Button>)
        }
        else if (Number(userID)===user.id && user.table_published===true){
            return (<Button variant="contained" onClick={() => publish()}>Unpublish</Button>)
        }
    }



    function headerButtons() {


        return (
            <span>
                <Button variant="contained" onClick={() => history.push('/')}>
                    Home
                </Button>


                {user.id && <Button variant="contained" onClick={() => history.push(`/viewartifacts/${user.id}`)}>{user.username}'s page</Button>}

                {user.access_level === 10 && <Button variant="contained" onClick={() => history.push('/admin')}>Admin Page</Button>}

                    { userID && 
                        <>
                            <Button variant="contained" onClick={() => history.push(`/viewartifacts/${userID}`)}> {/* View by Year */}
                                View Documents/Events
                            </Button>
                            <Button variant="contained" onClick={() => history.push(`/viewconnections/${userID}`)}>
                                View by Connection
                            </Button>
                        </>
                    }


                    { Number(userID)===user.id && userID!==undefined && 
                        <>
                            <Button variant="contained" onClick={() => history.push(`/addartifact/${userID}`)}>
                                Add Artifact
                            </Button>
                            <Button variant="contained" onClick={() => history.push(`/addconnection/${userID}`)}>
                                Add Connection
                            </Button>
                        </>
                    }
                

                {publishButton()}


                { user.id ? <Button variant="contained" onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</Button> : <Button variant="contained" onClick={() => history.push('/login')}>Login / Register</Button>}
            </span>
        )
    }





    return (
        <header>
            <div>
                {headerText()}
                    {user.id && <span className='welcome'>Welcome {user.username}</span>}
            </div>
            <span className='nav-btn'>
                {headerButtons()}
            </span>
        </header>
    )
}

export default Header;