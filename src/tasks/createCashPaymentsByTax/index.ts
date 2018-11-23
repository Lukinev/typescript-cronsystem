import { FB } from '../../libs/firebird';
import { sendMail } from '../../libs/mailer';

import { save2Log } from '../../index';
import { firebirdOptions } from './config';

import moment from 'moment';

let f = new FB(firebirdOptions);

async function start(args: any) {
    /*
     let re = await f.DBselect([{ query: 'select first 10 * from STOVAR', params: [] }]);
     save2Log(module.filename, args + JSON.stringify(re));
     console.log();
      */
    /*await f.DBexec([{ query: 'execute procedure INS_DATA', params: [] },
                    { query: 'execute procedure INS_DATA(?)', params: ['test jobs'] }]);*/
    //await f.DBselect([{ query: 'SELECT msg FROM P_PAYMENT_DELAY_IMPORT(?,?)    ', params: [,76] }]);
    let dateTime = moment().add(-1, 'day').format('DD.MM.YYYY');
    //let dateTime = moment().format('DD.MM.YYYY');
    let result = await f.dBselect([{ query: 'SELECT msg FROM P_PAYMENT_DELAY_IMPORT(?,?)', params: [dateTime, 76] }]);
    for (let index = 0; index < result.length; index++) {
        save2Log(module.filename, result[index].MSG);
    }
    sendMail({ subject: 'Delay payment', to: 'e.lukin@fortuna.odessa.ua', text: 'All done for delay payment' });
}

export const run = (args: any) => {
    start(args);
};