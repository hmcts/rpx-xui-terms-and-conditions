/*
    Adds a new Document version
*/
INSERT INTO "TCDocument"(document, "mimeType")
VALUES (${document}, ${mimeType})
RETURNING *
