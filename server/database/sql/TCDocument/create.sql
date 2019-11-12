CREATE TABLE IF NOT EXISTS "TCDocument"
(
    id             serial PRIMARY KEY,
    document       TEXT,
    "mimeType"     VARCHAR(80) NOT NULL DEFAULT 'text/html',
    "creationDate" TIMESTAMP   NOT NULL DEFAULT NOW(),
    version        serial      NOT NULL
);
