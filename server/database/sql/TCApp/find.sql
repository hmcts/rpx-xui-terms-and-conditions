/*
    Finds a App by the app name
*/
SELECT * FROM "TCApp"
WHERE app IN (${apps:csv})
