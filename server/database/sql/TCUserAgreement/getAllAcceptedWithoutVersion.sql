SELECT
    ua."userId"
FROM
    "TCUserAgreement" as ua
    LEFT JOIN "TCDocumentApp" as da ON (ua."documentAppId" = da.id)
    LEFT JOIN "TCDocument" as d ON (da."documentId" = d.id)
    LEFT JOIN "TCApp" as a ON (da."appId" = a.id)
WHERE
    d.version = (
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
    AND a.app = ${app}