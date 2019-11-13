/*
    Adds a new Document App
*/
INSERT INTO "TCDocumentApp"("documentId", app)
VALUES(${documentId}, ${app})
RETURNING *
