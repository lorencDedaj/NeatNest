// scripts/dev.js 
import { exec } from 'child_process';

console.log('🚀 Starting NeatNest development servers...\n');

// Start server
console.log('🔧 Starting server...');
exec('cd server && npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Server error: ${error}`);
    return;
  }
  console.log(`Server: ${stdout}`);
  if (stderr) console.error(`Server stderr: ${stderr}`);
});

// Start client after 2 seconds
setTimeout(() => {
  console.log('🎨 Starting client...');
  exec('cd client && npm run dev', (error, stdout, stderr) => {
    if (error) {
      console.error(`Client error: ${error}`);
      return;
    }
    console.log(`Client: ${stdout}`);
    if (stderr) console.error(`Client stderr: ${stderr}`);
  });
}, 2000);

console.log('📱 Client: http://localhost:3000');
console.log('🔧 Server: http://localhost:8000');
