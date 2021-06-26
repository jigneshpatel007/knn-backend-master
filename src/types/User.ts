export declare type CreateUser = {
  //   id: bigint;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: string;
  password: string;
  salt: string;
  address: string;
  city: string;
  street: string;
  //   isSuspended: boolean;
  //   lastLoginAt: Date | null;
  //   lastLogoutAt: Date | null;
  //   createdAt: Date;
  //   updatedAt: Date | null;
  //   deletedAt: Date | null;
};

export declare type GetUser = {
  id: bigint;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: string;
  address: string;
  city: string;
  street: string;
  isSuspended: boolean;
  lastLoginAt: Date | null;
  lastLogoutAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};
