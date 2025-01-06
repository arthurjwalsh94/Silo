import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'myJwtSecret', // same secret or process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    // The payload is what we signed in the token (e.g., { sub: user.id, username: user.username })
    // Here you can do a DB lookup if needed
    return { userId: payload.sub, username: payload.username };
    // This becomes req.user in your controllers
  }
}