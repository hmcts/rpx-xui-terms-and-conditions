/*
    Finds a documentApp by the document and app
*/
SELECT * FROM "TCDocumentApp"
WHERE "documentId" = ${documentId} AND app = ${app}
