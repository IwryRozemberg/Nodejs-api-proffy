import { IUserDataInput } from "../interfaces/user";
import db from "../database/connection";
import { createCredentials } from "../services/authorization";

async function create(user: IUserDataInput) {
  return await db('users')
    .select('*')
    .where('users.email', '=', user.email)
    .then(async userFind => {
      if (userFind.length > 0) {
        return false;
      }
      const { hash, salt } = createCredentials(user.password);
      return await db('users').insert({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        hash,
        salt
      });
    });
}

export { create }