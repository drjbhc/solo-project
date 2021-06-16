const express = require('express');
const pool = require('../modules/pool');

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');



const router = express.Router();

router.post('/add', rejectUnauthenticated, (req, res) => {

    const newConnection = (req.body);

    const queryText = `INSERT INTO "connections" ("earlier_artifact", "later_artifact", "connection_description", "user_id")
                        VALUES ($1, $2, $3, $4);`;

    pool.query(queryText, [newConnection.earlier, newConnection.later, newConnection.description, user.id]).then(response => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
})

router.get('/list/:userID', (req, res) => {

    let userID = req.params.userID;

    console.log(userID);

    const queryText = `SELECT "first_artifact"."id" AS "first_artifact_id", "first_artifact"."artifact" AS "first_artifact_name", "first_artifact"."earliest_date" AS "new_earliest_date", "second_artifact"."id" AS "second_artifact_id", "second_artifact"."artifact" AS "second_artifact_name", "second_artifact"."latest_date" AS "new_latest_date", "connections"."connection_description"
                        FROM "artifacts" AS "first_artifact"
                        JOIN "connections" ON "connections"."earlier_artifact"="first_artifact"."id"
                        JOIN "artifacts" AS "second_artifact" ON "second_artifact"."id"="connections"."later_artifact"
                        WHERE "connections"."user_id"=$1;`;

    pool.query(queryText, [userID]).then(response => {
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
})

router.delete('/delete/:deleteID', rejectUnauthenticated, (req, res) => {
    let deleteID = req.params.deleteID;

    const queryText = `DELETE FROM "connections" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(queryText, [deleteID, req.user]).then(response => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
})


module.exports = router;