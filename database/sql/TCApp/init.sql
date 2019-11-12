INSERT INTO "TCApp"("documentId", app)
VALUES(${documentId}, ${app})
RETURNING *
