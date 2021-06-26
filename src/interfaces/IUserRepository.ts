import { User } from '@prisma/client';
import { RefreshToken } from '../types/Authentication';
import { CreateUser, GetUser } from '../types/User';

export interface IUserRepository {  
  createUser(newUser: CreateUser): Promise<GetUser>;

  getUserByUserName(userName: string): Promise<User | null>;

  setLastLogin(userId: bigint): Promise<boolean>;

  storeRefreshToken(userId: bigint, token: string): Promise<boolean>;

  getRereshToken(userId: bigint, refreshToken: string): Promise<RefreshToken>;
}
