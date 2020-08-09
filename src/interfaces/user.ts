interface IUserDataInput {
  name: string;
  email: string;
  avatar: string;
  password: string;
}

interface IUserModel {
  id: number;
  name: string;
  email: string;
  salt: string;
  hash: string;
}

export { IUserModel, IUserDataInput }