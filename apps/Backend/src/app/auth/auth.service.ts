import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    // Check if username is taken
    const existing = await this.userRepo.findOne({ where: { username } });
    if (existing) {
      throw new Error('Username already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = this.userRepo.create({
      username,
      passwordHash,
    });

    return this.userRepo.save(newUser);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;

    return user; // If valid, return user object
  }

  // Add this login method:
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      return null; // or throw an UnauthorizedException
    }

    // The payload typically includes user info you want to sign
    const payload = { sub: user.id, username: user.username };
    // Sign a JWT using JwtService
    const token = await this.jwtService.signAsync(payload);

    // Return the token (or wrap it in an object)
    return { access_token: token };
  }
}