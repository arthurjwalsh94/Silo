import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule,
      JwtModule.register({
        secret: 'myJwtSecret',   // in dev only; use env var in production
        signOptions: { expiresIn: '1h' }, 
      }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
  })
  export class AuthModule {}