import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Header() {

    const history = useHistory();
    const dispatch = useDispatch();
    const currentURL = history.location.pathname;
    // const params = useParams();
    // let userID = params.userID;

    const { userID } = useParams();

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
        if (userID===user.id && user.table_published===false){
            return (<button onClick={() => publish()}>Publish</button>)
        }
        else if (userID===user.id && user.table_published===true){
            return (<button onClick={() => publish()}>Unpublish</button>)
        }
    }



    function headerButtons() {


        return (
            <span>
                <button onClick={() => history.push('/')}>
                    Home
                </button>

                    { userID===undefined ? <></> : 

                        <>
                            <button onClick={() => history.push(`/viewartifacts/${userID}`)}>
                                View by Year
                            </button>
                            <button onClick={() => history.push(`/viewconnections/${userID}`)}>
                                View by Connection
                            </button>
                        </>

                    }


                    { userID===user.id && userID!==undefined ? 
                        <>
                            <button>
                                Add Artifact
                            </button>
                            <button>
                                Add Connection
                            </button>
                        </>
                    : <></>}
                

                {publishButton}


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
            <span>
                {headerButtons()}
            </span>

            <button onClick={()=>alert(userID)}>
                Params Tester
            </button>
            <button onClick={() => console.log(user)}>
                Log user
            </button>

            
        </header>
    )
}

export default Header;