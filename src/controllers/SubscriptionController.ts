import { injectable } from "inversify";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ISubscriptionService } from "../interfaces/ISubscriptionService";
import BaseController from "./BaseController";

@injectable()
export default class SubscriptionController extends BaseController {
  private _loggerService: ILoggerService;

  private _subscriptionService: ISubscriptionService;

  constructor(loggerService: ILoggerService, subscriptionService: ISubscriptionService) {
    super();
    this._loggerService = loggerService;
    this._subscriptionService = subscriptionService;
    this._loggerService.getLogger().info(`Creating : ${this.constructor.name}`);
  }
}
