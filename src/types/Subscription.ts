import { Prisma, SubscriptionType } from '@prisma/client';

export declare type GetSubscription = {
  id: bigint;
  title: string;
  description: string | null;
  type: SubscriptionType;
  noOfBook: number;
  price: Prisma.Decimal;
};
