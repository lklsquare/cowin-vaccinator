const args = require('minimist')(process.argv.slice(2))
const states = require('./util/states')
const districts = require('./util/districts')
const slots = require('./util/slots')
const cron = require('node-cron');


if (args._[0] === 'states') {
    states()
} else if (args._[0] === 'districts' && typeof (args.state) === 'number') {
    districts(args.state)
} else if (args._[0] == 'slots-task' && args.districts) {
        let districts = (typeof(args.districts)) === 'number'? String(args.districts): args.districts
    const task = cron.schedule('*/1 * * * *', () => {
        slots(districts, (args.dose && args.dose !== 'boolean')? args.dose: 0 , (args.age && typeof (args.age) !== 'boolean') ? args.age : 0)
    });
    task.start();
}else if (args._[0] == 'slots' && args.districts) {
    let districts = (typeof(args.districts)) === 'number'? String(args.districts): args.districts
    slots(districts, (args.dose && args.dose !== 'boolean')? args.dose: 0 , (args.age && typeof (args.age) !== 'boolean') ? args.age : 0)
}else{
    console.log('Unknown command')
}



