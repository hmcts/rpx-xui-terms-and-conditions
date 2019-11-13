/*
    Adds a new Document App
*/
INSERT INTO "TCApp"(app)
VALUES(${app})
RETURNING *
