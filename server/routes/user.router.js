const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});











router.get('/userlist', rejectUnauthenticated, (req, res) => { // Admin page to approve new users
  /*
  Check user's clearance level.
  If user is not admin (clearance 10) then reject request.
  If user is admin do a query to the database to retrieve
      username, application_comments, and is_approved keys from the users table
  */

      console.log(req.user)
  // if (req.user.id !== 10) {
  //     res.sendStatus(403);
  //     return;
  // }

  const queryText = `SELECT "id", "username", "is_approved", "application_comments" FROM "user";`;

  pool.query(queryText).then(response => {
      res.send(response.rows);
  }).catch(error => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
  })
});




router.get('/homepage', (req, res) => { // Homepage to list published tables

  const queryText = `SELECT "id", "username" FROM "user" WHERE "table_published"=true;`;

  pool.query(queryText).then(response => {
      res.send(response.rows);
  }).catch(error => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
  })
})


router.put('/publish', rejectUnauthenticated, (req, res) => {
  
  const queryText = `UPDATE "user" SET "table_published"=true WHERE "id"=$1;`; // change =true so that it will set it to what it isn't

  pool.query(queryText, [req.user.id]).then(response => {
      res.sendStatus(201);
  }).catch(error => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
  })
})


router.put('/approve/:userID', rejectUnauthenticated, (req, res) => {

  const userID = req.params.userID;

  console.log('The user id is', userID);
  
  const queryText = `UPDATE "user" SET "is_approved"=true WHERE "id"=$1;`;

  pool.query(queryText, [userID]).then(response => {
      res.sendStatus(201);
  }).catch(error => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
  })
})


router.put('/ban/:userID', rejectUnauthenticated, (req, res) => {

  const userID = req.params.userID;
  
  const queryText = `UPDATE "user" SET "is_approved"=false, "table_published"=false WHERE "id"=$1;`;

  pool.query(queryText, [userID]).then(response => {
      res.sendStatus(201);
  }).catch(error => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
  })
})




module.exports = router;
