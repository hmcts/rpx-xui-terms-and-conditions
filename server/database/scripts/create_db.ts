import { db } from '../index';

async function createSchema() {
    try {
        return await db.task('create-schema', async task => {
            const docsCreate = await task.documents.create();
            // const appsCreate = await task.apps.create();
            const docAppsCreate = await task.documentApps.create();
            const userAgreementsCreate = await task.userAgreements.create();
            // const appsInit = await task.apps.init();
            /*try {
                return await task.documents.add({
                    document: '<h1>Terms & Conditions</h1><p>Do you accept?</p>',
                    mimeType: 'text/plain',
                    apps: ['xuiwebapp', 'xuimowebapp']
                });
            } catch (e) {
                console.log(e);
            }*/
            // return db.documents.findLatest({ app: 'xuiwebapp' });
            // return db.documents.findByVersion({ app: 'xuiwebapp', version: 4 });
            return db.documents.total({ app: 'xuimowebapp' });
            // return { docsCreate, appsCreate, docAppsCreate, userAgreementsCreate, appsInit, docInsert };
        });
    } catch (e) {
        console.log(e);
    }
}

createSchema().then(result => {
    console.log(result);
    // console.log('done, inserted %d rows', result.appsInit.rowCount);
    db.$pool.end();
});
