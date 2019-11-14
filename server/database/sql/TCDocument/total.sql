SELECT count(*)
FROM "TCDocument" as doc
         LEFT JOIN
     "TCDocumentApp" as docApp ON doc.id = docApp."documentId"
         LEFT JOIN "TCApp" as app ON app.id = docApp."appId"
WHERE app.app = ${app}
