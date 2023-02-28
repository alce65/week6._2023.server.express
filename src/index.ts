import http from 'http';
import { app } from './app.js';
import { dbConnect } from './db/db.connetc.js';

const PORT = process.env.PORT || 4500;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    console.log('DB:', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('error', (error) => {
  console.error('Server error:', error.message);
});

server.on('listening', () => {
  console.log('Listening in http://localhost:' + PORT);
});
