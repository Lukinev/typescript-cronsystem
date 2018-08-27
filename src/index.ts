import cron from 'cron';
import * as fs from 'fs';
import moment from 'moment';
import path from 'path';

let jobs = [];
let tasksArray = JSON.parse(fs.readFileSync('tasksList.json', { encoding: 'utf8' })).tasksList;
for (let index = 0; index < tasksArray.length; index++) {
    jobs.push(new cron.CronJob({
        cronTime: tasksArray[index].taskSchedule,
        onTick: function () {
            require('./tasks/' + tasksArray[index].taskModuleName + '/index.js').run(moment().format('HH:mm:ss') + ' >> ');
            //console.log('job ticked ' + tasksArray[index].taskModuleName + ' >> ' + moment().format('hh:mm:ss'));
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
export function save2log(filePath: string, writeString: string) {
    const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';
    fs.appendFileSync(path.dirname(filePath) + '.log', newLineChar + writeString);
    console.log('');
    console.log(writeString);
}
console.log('Cron system started at ' + moment().format('DD.MM.YYYY HH:mm:ss'));

