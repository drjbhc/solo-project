import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import UserPage from '../UserPage/UserPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';



import Header from '../Header/Header';
import Home from '../Home/Home';
import ViewArtifacts from '../ViewArtifacts/ViewArtifacts';
import ViewConnections from '../ViewConnections/ViewConnections';
import AddArtifact from '../AddArtifact/AddArtifact';
import AddConnection from '../AddConnection/AddConnection';
import Admin from '../Admin/Admin';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>


        {/* Will implement protected routes and uncomment some other page protections once bugs are fixed*/}

      <main>
        <Switch>
          <Redirect exact from="/" to="/home" />

                <Route path='/viewartifacts/:userID'>
                <Header />
                    <ViewArtifacts />
                </Route>
                <Route path='/viewconnections/:userID'>
                <Header />
                    <ViewConnections />
                </Route>
                <Route path='/addartifact/:userID'>
                <Header />
                    <AddArtifact />
                </Route>
                <Route path='/addconnection/:userID'>
                <Header />
                    <AddConnection />
                </Route>
                <Route path='/admin'>
                <Header />
                    <Admin />
                </Route>
                <Route exact path='/home'>
                <Header />
                    <Home />
                </Route>


          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <Header />
            <UserPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/home"
          >
            <Header />
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/home"
          >
            <Header />
            <RegisterPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
          <Header />
            <h1>404</h1>
          </Route>
        </Switch>
      </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
