INSERT INTO "TCUserAgreement" ("userId", "documentAppId")
SELECT ${user}, da.id
FROM "TCDocumentApp" as da
    LEFT JOIN "TCApp" as app ON (da."appId" = app.id)
    LEFT JOIN "TCDocument" as d ON (da."documentId" = d.id)
WHERE
    app.app = ${app}
    AND d.version = (
        SELECT doc.version
        FROM "TCDocument" as doc
        WHERE doc.id IN (
            SELECT dax."documentId"
            FROM "TCDocumentApp" as dax
                LEFT JOIN "TCApp" as appx ON (dax."appId" = appx.id)
            WHERE appx.app = ${app}
        )
        ORDER BY doc."creationDate" DESC
        LIMIT 1
    )
RETURNING *