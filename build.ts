import s from 'shelljs';
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.mkdir('-p', `${outDir}/common/swagger`);
s.mkdir('-p', `${outDir}/database/sql`);
s.cp('server/common/api.yml', `${outDir}/common/api.yml`);
s.cp('-R', 'server/database/sql', `${outDir}/database/`);
s.cp('-R', 'server/database/migrations', `${outDir}/database/`);
s.rm('-rf', `${outDir}/database/sql/index.ts`);
