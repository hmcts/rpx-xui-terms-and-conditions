/*
    Finds a document agreement by userId and documentId
*/
SELECT * FROM tcuseragreement
WHERE userId = ${userId} AND documentid = ${documentid}
