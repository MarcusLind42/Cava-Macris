import fs from 'fs';
import path from 'path';

const cnameSource = path.resolve(import.meta.dirname, 'client', 'CNAME');
const cnameDest = path.resolve(import.meta.dirname, 'dist', 'CNAME');

try {
  fs.copyFileSync(cnameSource, cnameDest);
  console.log('CNAME file copied to dist folder');
} catch (error) {
  console.error('Error copying CNAME file:', error);
} 