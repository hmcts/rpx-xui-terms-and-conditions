/*
    Finds a document agreement by userId and documentAppId
*/
SELECT *
FROM "TCUserAgreement"
WHERE "userId" = ${userId}
  AND "documentAppId" = ${documentAppId}
