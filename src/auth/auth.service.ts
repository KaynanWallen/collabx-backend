import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string): Promise<any> {
    const user = await this.accountsService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { userEmail: user.email, twoFactor: user.twoFactor };
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };

    return token;
  }

  async signOut(): Promise<any> {
    
  }
}