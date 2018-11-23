import cron from 'cron';
import * as fs from 'fs';
import moment from 'moment';
import path from 'path';
import { tasksList } from './tasksList';

let jobs = [];
//let tasksList = JSON.parse(fs.readFileSync('tasksList.json', { encoding: 'utf8' })).tasksList;

for (let index = 0; index < tasksList.length; index++) {
    jobs.push(new cron.CronJob({
        cronTime: tasksList[index].taskSchedule,
        onTick: function () {
            require('./tasks/' + tasksList[index].taskModuleName + '/index.js').run(moment().format('HH:mm:ss') + ' >> ');
        },
        onComplete: function () {
            console.log('All done');
        },
        start: false,
        timeZone: 'Europe/Kiev'
    }));
}

for (let index = 0; index < jobs.length; index++) {
    jobs[index].start();
}

export function save2Log(filePath: string, writeString: string) {
    const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';
    let dateTime = moment().format('DD.MM.YYYY HH:mm:ss');
    fs.appendFileSync(path.dirname(filePath) + '.log', newLineChar + dateTime + ' >> ' + writeString);
    console.log(dateTime + ' >> ' + writeString);
}
console.log('Cron system started at ' + moment().format('DD.MM.YYYY HH:mm:ss'));

