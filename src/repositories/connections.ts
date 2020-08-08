
import db from "../database/connection";

async function index() {
  return await db('connections').count('user_id', { "as": 'connectionsNumbers' });
}

async function create(user_id: number) {
  return await db('connections').insert({ user_id });
}

export { index, create }