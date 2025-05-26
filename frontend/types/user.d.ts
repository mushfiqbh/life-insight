interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  permissions: string[];
}

export default User;
