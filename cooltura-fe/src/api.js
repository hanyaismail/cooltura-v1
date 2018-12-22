import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');

export function connectionSocket(cb) {
  socket.on('news', data => cb(null, data))
}

export function subscribeToFogger(cb) {
  socket.on('foggerState', data => cb(null, data));
}

export function emitFogger(checked) {
  socket.emit('fogger', {state: Number(checked)})
}