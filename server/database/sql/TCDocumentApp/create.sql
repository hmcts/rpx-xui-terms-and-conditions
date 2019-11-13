CREATE TABLE IF NOT EXISTS "TCDocumentApp"
(
    id           serial PRIMARY KEY,
    "documentId" INTEGER REFERENCES "TCDocument" (id) ON DELETE RESTRICT,
    "appId" INTEGER REFERENCES "TCApp" (id) ON DELETE RESTRICT
);
