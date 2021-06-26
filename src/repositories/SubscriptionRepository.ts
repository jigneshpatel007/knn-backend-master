import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { InternalServerError } from '../errors/InternalServerError';
import { NotFound } from '../errors/NotFound';
import { IDatabaseService } from '../interfaces/IDatabaseService';
import { ILoggerService } from '../interfaces/ILoggerService';
import { ISubscriptionRepository } from '../interfaces/ISubscriptionRepository';
import { GetSubscription } from '../types/Subscription';

@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {
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

  async getSubscription(subscriptionId: bigint): Promise<GetSubscription> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const subscription = await client.subscription.findFirst({
        where: {
          id: subscriptionId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          noOfBook: true,
          price: true,
          createdAt: false,
          createdBy: false,
          updatedAt: false,
        },
      });

      if (subscription === null) {
        throw new NotFound(`subscription not found with id ${subscriptionId}`);
      }

      return subscription;
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

  async getAllSubscription(): Promise<GetSubscription[]> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const subscription = await client.subscription.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          noOfBook: true,
          price: true,
          createdAt: false,
          createdBy: false,
          updatedAt: false,
        },
      });

      return subscription;
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

}
