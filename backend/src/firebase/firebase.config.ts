import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

// Path to the service account file
const serviceAccountPath = path.join(process.cwd(), 'config', 'firebase-service-account.json');

// Initialize firebaseAdmin as any so we can provide a safe stub if needed
let firebaseAdmin: any;

try {
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Firebase service account file not found at: ${serviceAccountPath}`);
  }

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
  // Instead of exiting the process, provide a development-safe stub
  console.warn('Firebase Admin is not configured properly. Running in degraded mode.');
  console.warn(String(error));

  // Minimal stub that surfaces clear errors when auth is actually used.
  firebaseAdmin = {
    auth: () => ({
      verifyIdToken: async (_token: string) => {
        throw new Error(
          'Firebase Admin not configured. Provide a valid service account at backend/config/firebase-service-account.json to enable auth.'
        );
      },
      // other auth methods can be stubbed here if needed
    }),
    // You can add more stubs (e.g. firestore) if the app uses them during startup
  };
}

export { firebaseAdmin };
