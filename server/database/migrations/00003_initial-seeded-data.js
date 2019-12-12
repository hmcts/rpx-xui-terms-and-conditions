const path = require('path');
const fs = require('fs');

const TERMS_PATH = path.join(__dirname, '../resources', 'terms.html');

const terms = fs.readFileSync(TERMS_PATH, 'utf8');

const appInsert = `insert into "TCApp"("app") values('xuiwebapp'),('xuimowebapp') ON CONFLICT DO NOTHING;`;
const docInsert = `insert into "TCDocument" (id, document, "mimeType") values(1, '${terms}', 'text/html') ON CONFLICT DO NOTHING;`;
const docAppInsert = `insert into "TCDocumentApp" ("documentId", "appId")
select 1, "id" from "TCApp"
ON CONFLICT DO NOTHING;`;

module.exports.generateSql = () => `${appInsert} ${docInsert} ${docAppInsert}`;
