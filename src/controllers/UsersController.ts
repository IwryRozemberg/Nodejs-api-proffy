import { NextFunction, Request, Response } from "express";
import { create } from "../repositories/users";

export default class UsersController {

  async createUser(request: Request, response: Response, next: NextFunction) {
    const user = request.body;

    return await create(user)
      .then(userCreated => {
        if (!userCreated) {
          return response.status(409)
            .json({
              success: false,
              message: 'Usuário já existe no banco de dados'
            });
        }

        return response.status(201).json({ success: true, user_id: userCreated[0] });
      })
      .catch(err => next(err));
  }
}