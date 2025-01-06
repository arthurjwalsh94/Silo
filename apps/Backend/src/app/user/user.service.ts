import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string) {
    // Create a user object in memory
    const user = this.userRepository.create({ username });
    // Save to DB
    return this.userRepository.save(user);
  }

  async findAll() {
    // Return all users from DB
    return this.userRepository.find();
  }
}