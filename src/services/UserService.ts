import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { ILoggerService } from '../interfaces/ILoggerService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserService } from '../interfaces/IUserService';
import { CreateUser, GetUser } from '../types/User';
import crypto from 'crypto';
import { IRoleRepository } from '../interfaces/IRoleRepository';
import { User } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
  private _loggerService: ILoggerService;

  private _userRepository: IUserRepository;

  private _roleRepository: IRoleRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.UserRepository) userRepository: IUserRepository,
    @inject(TYPES.RoleRepository) roleRepository: IRoleRepository,
  ) {
    this._loggerService = loggerService;
    this._userRepository = userRepository;
    this._roleRepository = roleRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async createUser(newUser: CreateUser): Promise<GetUser> {
    // Create hash of the password
    newUser.salt = crypto.randomBytes(16).toString('hex');
    newUser.password = crypto
      .pbkdf2Sync(newUser.password, newUser.salt, 1000, 64, 'sha512')
      .toString('hex');

    const user = await this._userRepository.createUser(newUser);

    const role = await this._roleRepository.getRoleByName('User');

    await this._roleRepository.assignRoleToUser(role.id, user.id);

    return user;
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    return this._userRepository.getUserByUserName(userName);
  }
}
