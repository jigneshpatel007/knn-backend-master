import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { ILoggerService } from '../interfaces/ILoggerService';
import { ISubscriptionRepository } from '../interfaces/ISubscriptionRepository';
import ISubscriptionService from '../interfaces/ISubscriptionService';
import { GetSubscription } from '../types/Subscription';

@injectable()
export class SubscriptionService implements ISubscriptionService {
  private _loggerService: ILoggerService;

  private _subscriptionRepository: ISubscriptionRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.SubscriptionRepository)
    subscriptionRepository: ISubscriptionRepository,
  ) {
    this._loggerService = loggerService;
    this._subscriptionRepository = subscriptionRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async getSubscription(subscriptionId: bigint): Promise<GetSubscription> {
    return this._subscriptionRepository.getSubscription(subscriptionId);
  }

  async getAllSubscription(): Promise<GetSubscription[]> {
    return this._subscriptionRepository.getAllSubscription()
  }
}
