import { inject, injectable } from 'inversify';

import { IDatabaseService } from '../interfaces/IDatabaseService';
import { ILoggerService } from '../interfaces/ILoggerService';
import { TYPES } from '../config/types';
import { IUserRepository } from '../interfaces/IUserRepository';
import { CreateUser, GetUser } from '../types/User';
import { InternalServerError } from '../errors/InternalServerError';
import moment from 'moment';
import { User } from '@prisma/client';
import { NotFound } from '../errors/NotFound';
import { RefreshToken } from '../types/Authentication';

@injectable()
export class UserRepository implements IUserRepository {
  private _loggerService: ILoggerService;

  private _databaseService: IDatabaseService;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.DatabaseService) databaseService: IDatabaseService,
  ) {
    this._loggerService = loggerService;
    this._databaseService = databaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async createUser(newUser: CreateUser): Promise<GetUser> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const user = await client.user.create({
        data: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          userName: newUser.userName,
          mobileNumber: newUser.mobileNumber,
          password: newUser.password,
          salt: newUser.salt,
          address: newUser.address,
          city: newUser.city,
          street: newUser.street,
          createdAt: moment().format(),
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          userName: true,
          mobileNumber: true,
          address: true,
          city: true,
          street: true,
          isSuspended: true,
          lastLoginAt: true,
          lastLogoutAt: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        'An error occurred while interacting with the database.',
      );
    } finally {
      await this._databaseService.disconnect();
    }
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const user = await client.user.findFirst({
        where: {
          userName,
          deletedAt: null,
        },
      });

      // if (user === null) {
      //   throw new NotFound(`User not found with userName ${userName}`);
      // }

      return user;
    } catch (error) {
      console.log(error);
      this._loggerService.getLogger().error(`Error ${error}`);
      // if (error instanceof NotFound) {
      //   throw error;
      // }
      throw new InternalServerError(
        'An error occurred while interacting with the database.',
      );
    } finally {
      await this._databaseService.disconnect();
    }
  }

  async setLastLogin(userId: bigint): Promise<boolean> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const user = await client.user.update({
        where: {
          id: userId,
        },
        data: {
          lastLoginAt: moment().format(),
        },
      });

      return user !== null;
    } catch (error) {
      console.log(error);
      this._loggerService.getLogger().error(`Error ${error}`);
      if (error instanceof NotFound) {
        throw error;
      }
      throw new InternalServerError(
        'An error occurred while interacting with the database.',
      );
    } finally {
      await this._databaseService.disconnect();
    }
  }

  async storeRefreshToken(userId: bigint, token: string): Promise<boolean> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const storeToken = await client.refreshToken.create({
        data: {
          userId,
          Token: token,
        },
      });

      return storeToken !== null;
    } catch (error) {
      console.log(error);
      this._loggerService.getLogger().error(`Error ${error}`);
      if (error instanceof NotFound) {
        throw error;
      }
      throw new InternalServerError(
        'An error occurred while interacting with the database.',
      );
    } finally {
      await this._databaseService.disconnect();
    }
  }

  async getRereshToken(
    userId: bigint,
    refreshToken: string,
  ): Promise<RefreshToken> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const token = await client.refreshToken.findFirst({
        where: {
          userId,
          Token: refreshToken,
        },
        select: {
          id: false,
          userId: true,
          Token: true,
          createdAt: false,
        },
      });

      if (token === null) {
        throw new NotFound('Rfresh Token not found');
      }

      return token;
    } catch (error) {
      console.log(error);
      this._loggerService.getLogger().error(`Error ${error}`);
      if (error instanceof NotFound) {
        throw error;
      }
      throw new InternalServerError(
        'An error occurred while interacting with the database.',
      );
    } finally {
      await this._databaseService.disconnect();
    }
  }
}
