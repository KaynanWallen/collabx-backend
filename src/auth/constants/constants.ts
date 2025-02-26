import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config(); 


export const jwtConstants = {
  secret: process.env.JTW_TOKEN || "secret_token",
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);