import fs from 'fs';
import path from 'path';
import https from 'https';

// The host and IndexNow key
const HOST = 'hotelserenepraia.in';
const KEY = 'c4d688fa0cf94e098495a122e2ef0648'; // In production, generate and use a secure 32-char key
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Optional: create the key file in public/ so search engines can verify it
const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
fs.writeFileSync(path.join(publicDir, `${KEY}.txt`), KEY);
console.log(`Created IndexNow verification key at public/${KEY}.txt`);

// In a real automated pipeline, this would extract the recently modified URLs from git or a CMS.
// For demonstration, we'll submit a sample of the new programmatic URLs.
const urlList = [
  `https://${HOST}/nearby/hotel-near-rushikonda-beach`,
  `https://${HOST}/nearby/hotel-near-rk-beach`,
  `https://${HOST}/guide/things-to-do-in-vizag`,
  `https://${HOST}/restaurant`
];

const data = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  console.log(`IndexNow Submission Status: ${res.statusCode} ${res.statusMessage}`);
  
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('Error submitting to IndexNow:', error);
});

req.write(data);
req.end();
