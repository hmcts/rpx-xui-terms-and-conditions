import {db} from '../index'

async function createSchema() {

    try {
        return await db.task('create-schema', async task => {
            const docsCreate = await task.documents.create();
            const userAgreementsCreate = await task.userAgreements.create();
            /*const arr = [
                {
                    document: '<p>test1</p>',
                    app: 'xui-webapp',
                    mimetype: 'text/html'
                },
                {
                    document: '<p>test2</p>',
                    app: 'xui-ao-webapp',
                    mimetype: 'application/pdf'
                }

            ];
            const docsInsert = await task.documents.insert(arr);
            const docInsert = await task.documents.add({document: '<h1>TEST</h1>', app: 'xui-mo-webapp', mimetype: 'text/plain'});*/
            return { docsCreate, userAgreementsCreate };
        });
    } catch (e) {
        console.log(e)
    }
}

createSchema().then( result => {
    console.log('done');
    db.$pool.end();
});
