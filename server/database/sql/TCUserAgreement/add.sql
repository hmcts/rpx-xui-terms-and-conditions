INSERT INTO "TCUserAgreement" ("userId", "documentAppId")
SELECT ${user}, da.id
FROM "TCDocumentApp" as da
    LEFT JOIN "TCApp" as app ON (da."appId" = app.id)
    LEFT JOIN "TCDocument" as d ON (da."documentId" = d.id)
WHERE
    app.app = ${app}
    AND d.version = ${version}
RETURNING *