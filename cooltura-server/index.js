const cron = require('node-cron');
const mqtt = require('mqtt');
const client = mqtt.connect('ws://iot.eclipse.org:80/ws');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

let perSecOn = '*/5';
let perSecOff = 2000;
let ledState = false;
let taskStatus = true;
let task;
let setTimeoutVar;

client.on('connect', () => {
  console.log('connected ecplise');
  client.subscribe('outTopic_ismail220a');
});

client.on('message', (topic, message) => {
  console.log('topic: ', topic);
  console.log('message: ', message.toString());
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('fogger', data => {
    console.log('data', data);
    client.publish('inTopic_ismail220a', data.state.toString());
  })
});

createSchedule(perSecOn, perSecOff);

function createSchedule(perSecOn = null, perSecOff = null, edited = false) {
  if(taskStatus) {

    if (edited) {
      console.log('task stop')
      task.stop();
    }

    task = cron.schedule(`${perSecOn} * * * * *`, () => {
      ledState = !ledState;
      console.log(`run every ${perSecOn} second, ledState: ${ledState ? '1' : '0'}`)
      client.publish('inTopic_ismail220a', ledState ? '1' : '0');
      io.sockets.emit('foggerState', {state: Number(ledState)})

      setTimeoutVar = setTimeout(() => {
        ledState = !ledState;
        console.log(`ledState: ${ledState ? '1' : '0'}`)
        client.publish('inTopic_ismail220a', ledState ? '1' : '0');
        io.sockets.emit('foggerState', {state: Number(ledState)})
      }, perSecOff);

    });
    task.start();
  }
}

app.get('/perSecOn/:secSet', (req, res) => {
  console.log(`set to ${req.params.secSet}`);
  perSecOn = `*/${req.params.secSet}`;
  res.send('good')
  createSchedule(perSecOn, perSecOff, true);
})

app.get('/perSecOff/:secSet', (req, res) => {
  console.log(`set off to ${req.params.secSet}`);
  perSecOff = req.params.secSet;
  res.send('good')
  createSchedule(perSecOn, perSecOff, true);
})

app.get('/stop-task', (req, res) => {
  task.stop();
  clearTimeout(setTimeoutVar);
  console.log('task stopped');
  res.send('task stopped');
})

server.listen('8080', () => {
  console.log('server run on port 3000')
})