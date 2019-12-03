import { db } from '../index';

//NOTE: this script is not being used, as we run the schema/data creation directly in the pods themselves
//@see charts/xui-terms-and-conditions/values.preview.template.yaml

async function createSchema() {
    try {
        return await db.task('create-schema', async task => {
            /*const docsCreate = await task.documents.create();
            const appsCreate = await task.apps.create();
            const docAppsCreate = await task.documentApps.create();
            const userAgreementsCreate = await task.userAgreements.create();
            const appsInit = await task.apps.init();
            const doc = await task.none(`
                insert into "TCDocument" (id, document, "mimeType") values(1, '<h1>Paddy Power - Do you accept?</h1>', 'text/html') ON CONFLICT DO NOTHING;
            `);
            const docApps = await task.manyOrNone(`
                insert into "TCDocumentApp" ("documentId", "appId")
                select 1, "id" from "TCApp" ON CONFLICT DO NOTHING;
            `);

            return db.documents.findByVersion({ app: 'xuiwebapp', version: null });*/
            /*try {
                return await task.documents.add({
                    document: '<h1>Terms & Conditions</h1><p>Do you accept?</p>',
                    mimeType: 'text/plain',
                    apps: ['xuiwebapp', 'xuimowebapp']
                });
            } catch (e) {
                console.log(e);
            }
            return db.documents.findLatest({ app: 'xuiwebapp' });
            return db.documents.findByVersion({ app: 'xuiwebapp', version: 4 });
            return db.documents.total({ app: 'xuimowebapp' });
            return { docsCreate, appsCreate, docAppsCreate, userAgreementsCreate, appsInit, docInsert };*/
        });
    } catch (e) {
        console.log(e);
    }
}

createSchema().then(result => {
    // console.log(result);
    // console.log('done, inserted %d rows', result.appsInit.rowCount);
    db.$pool.end();
});
