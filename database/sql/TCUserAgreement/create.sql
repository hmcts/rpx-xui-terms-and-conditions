CREATE TABLE IF NOT EXISTS tcuseragreement
(
    id            serial PRIMARY KEY,
    userId        UUID      NOT NULL,
    documentId    INTEGER REFERENCES tcdocument (id),
    agreementDate TIMESTAMP NOT NULL DEFAULT NOW()
);
