/*
    Adds a new Document version
*/
INSERT INTO "documentAppId"(userid, documentid)
VALUES (${userId}, ${documentid})
RETURNING *
