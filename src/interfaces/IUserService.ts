import { User } from '@prisma/client';
import { CreateUser, GetUser } from '../types/User';

export interface IUserService {
  createUser(newUser: CreateUser): Promise<GetUser>;

  getUserByUserName(userName: string): Promise<User | null>;
}
