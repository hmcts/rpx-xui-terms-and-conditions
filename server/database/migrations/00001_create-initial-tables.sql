CREATE TABLE IF NOT EXISTS "TCDocument"
(
    id             serial PRIMARY KEY,
    document       TEXT,
    "mimeType"     VARCHAR(80) NOT NULL DEFAULT 'text/html',
    "creationDate" TIMESTAMP   NOT NULL DEFAULT NOW(),
    version        serial      NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "TCApp"
(
    id           serial PRIMARY KEY,
    app          varchar(50) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "TCDocumentApp"
(
    id           serial PRIMARY KEY,
    "documentId" INTEGER REFERENCES "TCDocument" (id) ON DELETE RESTRICT,
    "appId" INTEGER REFERENCES "TCApp" (id) ON DELETE RESTRICT,
    unique ("documentId", "appId")
);
CREATE TABLE IF NOT EXISTS "TCUserAgreement"
(
    id              serial PRIMARY KEY,
    "userId"        UUID      NOT NULL,
    "documentAppId" INTEGER REFERENCES "TCDocumentApp" (id) ON DELETE RESTRICT,
    "agreementDate" TIMESTAMP NOT NULL DEFAULT NOW()
);
