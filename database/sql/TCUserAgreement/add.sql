/*
    Adds a new Document version
*/
INSERT INTO tcuseragreement(userid, documentid)
VALUES(${userId}, ${documentid})
RETURNING *
