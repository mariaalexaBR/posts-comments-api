// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    // Usuario mock simple
    if (username === 'admin' && password === '123456') {
      return { userId: 1, username: 'admin' };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}