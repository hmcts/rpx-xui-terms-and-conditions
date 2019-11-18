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
        d.version = ${version}
        AND app.app = ${app}
        AND ua."userId" = ${user}
    UNION
    SELECT
        ${user} as "userId",
        ${version} as "version",
        false as "accepted"
) AS x
ORDER BY "accepted" DESC
LIMIT 1