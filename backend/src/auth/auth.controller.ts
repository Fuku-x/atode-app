import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { AuthenticatedRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  @Get('profile')
  @UseGuards(FirebaseAuthGuard)
  getProfile(@Request() req: AuthenticatedRequest) {
    return {
      message: 'Authentication successful!',
      user: req.user,
    };
  }
}
