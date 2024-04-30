export interface IUserData {
  bio: string;
  email: string;
  image?: string;
  token: string;
  username: string;
}

export interface IUserRO {
  data: IUserData;
}
