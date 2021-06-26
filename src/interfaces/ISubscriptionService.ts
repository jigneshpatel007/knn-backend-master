import { GetSubscription } from "../types/Subscription";

export default interface ISubscriptionService {
    getSubscription(subscriptionId:bigint): Promise<GetSubscription>

    getAllSubscription(): Promise<GetSubscription[]>
}