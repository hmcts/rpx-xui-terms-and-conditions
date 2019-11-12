/*
    Adds a new Document App
*/
INSERT INTO "TCApp"("documentId", app)
VALUES(${documentId}, ${app})
RETURNING *
