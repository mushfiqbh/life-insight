export default interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  permissions: string[];
}

export interface UserState {
  token: string | null;
  userInfo: User | null;
  userInfoList: User[];
  error: string | null;
}
