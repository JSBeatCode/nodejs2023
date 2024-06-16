import debugModule from 'debug'

const schedule = require('node-schedule');
const debug = debugModule('app:types:schedule');

export function setSchedule() {
    var scheduleVar = schedule.scheduleJob('*/60 * * * * *', async () => {
        debug('schedule running')
    })
}