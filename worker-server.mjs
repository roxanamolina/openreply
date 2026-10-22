import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const port = process.env.PORT || 10000;
createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
}).listen(port, () => console.log('health server listening on', port));

function startWorker() {
  const child = spawn('npx', ['tsx', 'worker/dm-worker.ts'], { stdio: 'inherit', env: process.env });
  child.on('exit', (code) => {
    console.log('worker exited with code', code, '- restarting in 5s');
    setTimeout(startWorker, 5000);
  });
}
startWorker();
