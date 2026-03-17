// src/modules/auth/guards/jwt-auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            console.log('JwtAuthGuard error:', err);
            console.log('JwtAuthGuard info:', info);
            throw new UnauthorizedException(info?.message || 'Invalid or expired token');
        }
        return user;
    }
}
