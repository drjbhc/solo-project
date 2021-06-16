const express = require('express');
const pool = require('../modules/pool');

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');



const router = express.Router();

router.get('/list/:userID', (req, res) => {
    let userID = req.params.userID;

    const queryText = `SELECT * FROM "artifacts" WHERE "user_id"=$1;`; // Join to search for username?

    pool.query(queryText, [userID]).then(response => {
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
})

router.post('/add', rejectUnauthenticated, (req, res) => {
  
    let newArtifact = req.body;

            console.log(newArtifact); // Coming in as empty object


    const queryText = `INSERT INTO "artifacts" ("artifact", "artifact_description", "earliest_date", "latest_date", "user_id")
                       VALUES ($1, $2, $3, $4, $5);`;

    pool.query(queryText, [newArtifact.artifact, newArtifact.artifact_description, newArtifact.earliest_date, newArtifact.latest_date, req.user]) // req.user
        .then(response => {
            res.sendStatus(201);
        }).catch(error => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })


})

router.delete('/delete/:deleteID', rejectUnauthenticated, (req,res) => {
    let deleteID = req.params.deleteID;

    const queryText = `DELETE FROM "artifacts" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(queryText, [deleteID, req.user]).then(response => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
})


module.exports = router;