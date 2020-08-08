import { NextFunction, Response, Request } from "express";
import { create, index } from '../repositories/connections'

export default class ConnectionsController {
  async count(request: Request, response: Response, next?: NextFunction) {
    return await index()
      .then((connectionsNumbers) => response.status(200).json(connectionsNumbers[0]))
      .catch(err => response.status(400)
        .json({
          success: false,
          message: `Error: (Falha ao buscar número de conexões) ${err}`
        }));
  }
  async createConnection(request: Request, response: Response, next?: NextFunction) {
    const { user_id } = request.body;

    return await create(user_id)
      .then(() => response.status(201).json({ success: true }))
      .catch(err => response.status(400)
        .json({
          success: false,
          message: `Error: (Falha ao cadastrar uma nova conneção) ${err}`
        }));
  }
}