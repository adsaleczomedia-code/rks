import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() registerDto: Partial<User>) {
        return this.authService.register(registerDto);
    }

    @Post('forgot-password')
    async forgotPassword(@Body('email') email: string) {
        await this.authService.sendResetPasswordEmail(email);
        return { message: 'If email exists, reset link sent' };
    }

    @Post('reset-password')
    async resetPassword(@Body('token') token: string, @Body('password') password: string) {
        await this.authService.resetPassword(token, password);
        return { message: 'Password reset successful' };
    }
}
