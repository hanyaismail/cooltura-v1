const cron = require('node-cron');
const moment = require('moment');

let taskArr = [];

function stopAllTask() {
  console.log('stopping task');
  taskArr.forEach(task => {
    task.stop();
  })
  taskArr = [];
  console.log('stop taskArr length', taskArr.length);
}

function createSchedule(timeArr) {
  timeArr.forEach(time => {
    const task = cron.schedule(`${time} * * * * *`, () => {
      console.log(moment());
      console.log(`cron every ${time}`);
    });
    taskArr.push(task);
  })
  console.log('create taskArr length', taskArr.length);
}

module.exports = {stopAllTask, createSchedule};