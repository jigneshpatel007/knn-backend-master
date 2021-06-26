import { GetSubscription } from "../types/Subscription";

export interface ISubscriptionRepository {
    getSubscription(subscriptionId:bigint): Promise<GetSubscription>

    getAllSubscription(): Promise<GetSubscription[]>
}
