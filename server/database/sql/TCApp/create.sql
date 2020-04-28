CREATE TABLE IF NOT EXISTS "TCApp"
(
    id           serial PRIMARY KEY,
    app          varchar(50) NOT NULL UNIQUE
);
