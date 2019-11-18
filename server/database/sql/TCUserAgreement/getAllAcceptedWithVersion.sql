SELECT
    ua."userId"
FROM
    "TCUserAgreement" as ua
    LEFT JOIN "TCDocumentApp" as da ON (ua."documentAppId" = da.id)
    LEFT JOIN "TCDocument" as d ON (da."documentId" = d.id)
    LEFT JOIN "TCApp" as a ON (da."appId" = a.id)
WHERE
    d.version = ${version}
    AND a.app = ${app}