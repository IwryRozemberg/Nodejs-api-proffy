import { Request, Response, NextFunction } from 'express'

import { index, create } from '../repositories/classes';
import IClassesParams from '../interfaces/classes';

export default class ClassesController {

  async listByParams(request: Request, response: Response, next: NextFunction) {
    const { week_day, subject, time } = request.query;

    if (!week_day || !subject || !time) {
      return response.status(400)
        .json({
          success: false,
          message: 'Error: (Dados para busca não foram informados)'
        });
    }

    const params: IClassesParams = {
      "week_day": week_day as string,
      "subject": subject as string,
      "time": time as string
    };

    return index(params)
      .then(classes => response.status(200).json(classes))
      .catch((err) => {
        return response.status(400).json({ success: false, message: `Error: (Falha ao cadastrar dados) ${err}` })
      })
  }

  async createClass(request: Request, response: Response, next: NextFunction) {
    const classes = request.body;

    return create(classes)
      .then(() => response.status(201).json({ success: true }))
      .catch(err => response.status(400).json({ success: false, message: `Error: (Falha ao cadastrar dados) ${err}` }));
  }
}