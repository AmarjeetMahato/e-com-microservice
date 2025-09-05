import cluster from 'cluster';
import os from 'os';
import { log } from 'console';
import * as dotenv from "dotenv"
import { app } from './app';

dotenv.config()


const PORT = process.env.PORT || 5001;
const numCPUs = os.cpus().length;

const startWorker = async () => {

  const server = app.listen(PORT, () => {
    log(`Worker ${process.pid} - Server running on port ${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      log(`Worker ${process.pid} - Gracefully shutting down`);
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

if (cluster.isPrimary) {
  log(`Master ${process.pid} is running`);
  log(`Starting ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    log(`Worker ${worker.process.pid} died. Starting a new one...`);
    cluster.fork(); // ensure continued operation
  });
} else {
  startWorker();
}
