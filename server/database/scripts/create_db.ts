import { db } from '../index';

async function createSchema() {
    try {
        return await db.task('create-schema', async task => {
            const apps = ['xuiwebapp', 'xuimowebapp'];
            const docsCreate = await task.documents.create();
            const appsCreate = await task.apps.create();
            const docAppsCreate = await task.documentApps.create();
            const userAgreementsCreate = await task.userAgreements.create();
            const appsInit = await task.apps.init();
            let docInsert: any = 'document exists';

            // TODO: make this more efficient, also rather than total for both apps should be at least one for each
            const totalDocs = async () => {
                return Promise.all(apps.map(app => task.documents.total({ app })));
            };
            const totalArray = await totalDocs();

            const total = totalArray.reduce( ((previousValue, currentValue) => previousValue + currentValue ));

            if (total === 0) {
                docInsert = await task.documents.add({
                    document: '<h1>Terms & Conditions</h1><p>Do you accept?</p>',
                    mimeType: 'text/html',
                    apps: apps
                });
            }
            return { docsCreate, appsCreate, docAppsCreate, userAgreementsCreate, appsInit, docInsert };
        });
    } catch (e) {
        console.log(e);
    }
}

createSchema().then(result => {
    console.log(result);
    db.$pool.end();
});
