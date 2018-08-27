import { FB } from '../../libs/firebird';
import * as zlib from "zlib";
import * as main from '../../index';

const options: any = {
    host: '127.0.0.1',
    port: 3050,
    database: 'D:/Projects/Delphi/ThreadPool/TEST.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys 
    role: null,           // default 
    pageSize: 16384
};

let f = new FB(options);
async function start(args: any) {
    let re = await f.DBselect();
    //console.log(JSON.stringify(re));
    //console.log(re[0].NAME);
    main.save2log(module.filename, args + JSON.stringify(re));
    /*await f.DBexec([{ query: 'execute procedure INS_DATA', params: [] },
    { query: 'execute procedure INS_DATA(?)', params: ['test jobs'] }]);*/


}

export const run = (args: any) => {
    start(args);
};