import { Request } from 'express';

export interface FirebaseUser {
  uid: string;
  email: string | null;
  email_verified: boolean;
  name: string;
  picture: string;
}

export interface AuthenticatedRequest extends Request {
  user: FirebaseUser;
}
