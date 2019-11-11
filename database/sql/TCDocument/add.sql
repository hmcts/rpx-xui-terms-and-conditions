/*
    Adds a new Document version
*/
INSERT INTO tcdocument(document, app, mimetype)
VALUES(${document}, ${app}, ${mimetype})
RETURNING *
