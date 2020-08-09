import { randomBytes, pbkdf2Sync } from 'crypto';
import { IUserModel } from '../interfaces/user';
const { sign, verify } = require('jsonwebtoken');

const environment = process.env.ENV || 'development';
const { secret } = require('../config/config')[environment];

function createCredentials(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
  return { salt, hash };
}

function credentialsCheck(passwordInput: string, user: IUserModel) {
  return (
    user.hash === pbkdf2Sync(passwordInput, user.salt, 1000, 512, 'sha512').toString('hex')
  );
}

function createJWTToken(id: number, email: string, name: string) {
  const
    meiaNoite = new Date().setHours(23, 59, 59),
    agora = new Date(),
    expirationTime = Math.abs((meiaNoite.valueOf() - agora.valueOf()) / 1000);
  const token = sign({ id, email, name }, secret, { expiresIn: expirationTime });

  return { token };
}

function tokenCheck(token: string, callBack: Function) {
  return verify(token, secret, callBack);
}

export { createCredentials, credentialsCheck, createJWTToken, tokenCheck }