import debugModule from 'debug'

const schedule = require('node-schedule');
const debug = debugModule('app:types:schedule');

export function setSchedule() {
    var scheduleVar = schedule.scheduleJob('*/5 * * * * *', async () => {
        debug('schedule running')
    })
}