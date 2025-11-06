import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from '../firebase/firebase.config';
import { AuthenticatedRequest } from './auth.types';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('認証トークンが提供されていません');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        email_verified: decodedToken.email_verified,
        name: decodedToken.name || '',
        picture: decodedToken.picture || '',
      };
      return true;
    } catch (error) {
      console.error('Firebase 認証エラー:', error);
      throw new UnauthorizedException('無効または期限切れのトークンです');
    }
  }
}
