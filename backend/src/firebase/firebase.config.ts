import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

// Path to the service account file
const serviceAccountPath = path.join(process.cwd(), 'config', 'firebase-service-account.json');

// Check if the service account file exists
if (!fs.existsSync(serviceAccountPath)) {
  console.error('Firebase service account file not found at:', serviceAccountPath);
  console.error('Please create a service account file at:', serviceAccountPath);
  process.exit(1);
}

// Initialize Firebase Admin
let firebaseAdmin: admin.app.App;

try {
  const serviceAccount = require(serviceAccountPath);
  
  if (!admin.apps.length) {
    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log('Firebase Admin initialized successfully');
  } else {
    firebaseAdmin = admin.app();
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  process.exit(1);
}

export { firebaseAdmin };
