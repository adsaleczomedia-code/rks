import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import * as nodemailer from 'nodemailer';
import * as process from 'process';
import { IsPhoneNumber } from 'class-validator';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

@Injectable()
export class AuthService {
    private transporter: nodemailer.Transporter;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async validateUser(email: string, password: string): Promise<Partial<User> | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const result = { ...user } as any;
            delete result.password;
            return result;
        }
        return null;
    }

    async login(user: Partial<User>) {
        const payload = { email: user.email, sub: user.id, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                PhoneNumber: user.PhoneNumber,
                username: user.username,
                role: user.role,
            },
        };
    }

    async register(userData: Partial<User>) {
        if (!userData.email) {
            throw new UnauthorizedException('Email is required');
        }
        const existingUser = await this.usersService.findByEmail(userData.email);
        if (existingUser) {
            throw new UnauthorizedException('Email already exists');
        }

        const user = await this.usersService.create(userData);
        const result = { ...user } as any;
        delete result.password;

        return this.login(result);
    }

    // Forgot password – generate reset link + email
    async sendResetPasswordEmail(email: string): Promise<void> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return;
        }

        const resetToken = this.jwtService.sign(
            { sub: user.id, email: user.email },
            { expiresIn: '1h' },
        );

        const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

        console.log(`Password reset link for ${email}: ${resetUrl}`);

        try {
            await this.transporter.sendMail({
                from: `"RCPF" <${process.env.SMTP_USER}>`,
                to: email,
                subject: 'Reset your RCPF account password',
                html: `
          <p>Hi,</p>
          <p>Click the link below to reset your password (valid for 1 hour):</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>If you did not request this, you can ignore this email.</p>
        `,
            });
        } catch (err) {
            console.error('SMTP error while sending reset email:', err);
            throw new InternalServerErrorException('Failed to send reset email');
        }
    }

    // Reset password – verify token and change password
    async resetPassword(token: string, newPassword: string): Promise<void> {
        try {
            const payload = this.jwtService.verify<{ sub: number; email: string }>(token);

            const user = await this.usersService.findOne(String(payload.sub));
            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }

            const hashed = await bcrypt.hash(newPassword, 10);
            await this.usersService.update(user.id, { password: hashed } as any);
        } catch (err) {
            console.error('resetPassword error', err);
            throw new UnauthorizedException('Invalid or expired reset token');
        }
    }
}
