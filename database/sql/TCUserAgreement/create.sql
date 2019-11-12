CREATE TABLE IF NOT EXISTS "TCUserAgreement"
(
    id              serial PRIMARY KEY,
    "userId"        UUID      NOT NULL,
    "documentAppId" INTEGER REFERENCES "TCDocumentApp" (id) ON DELETE RESTRICT,
    "agreementDate" TIMESTAMP NOT NULL DEFAULT NOW()
);
