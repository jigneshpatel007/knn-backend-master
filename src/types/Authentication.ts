export declare type Login = {
  accessToken: string;
  refreshToken: string;
};

export declare type UserToken = {
  id: BigInt;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  Role: string;
};

export declare type RefreshToken = {
  userId: BigInt;
  Token: string;
};
