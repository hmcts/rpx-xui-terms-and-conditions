SELECT
    "userId", "version", "accepted"
FROM
(
    SELECT
        ${user} as "userId",
        d.version as "version",
        true AS "accepted"
    FROM "TCUserAgreement" AS ua
        LEFT JOIN "TCDocumentApp" as da on (ua."documentAppId" = da.id)
        LEFT JOIN "TCDocument" as d on (da."documentId" = d.id)
        LEFT JOIN "TCApp" as app on (da."appId" = app.id)
    WHERE
        app.app = ${app}
        AND ua."userId" = ${user}
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
    UNION
    SELECT
        ${user} as "userId",
        (
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
        ) as "version",
        false as "accepted"
) AS x
ORDER BY "accepted" DESC
LIMIT 1