import { Router } from "express";
import bodyParser from 'body-parser';

import UsersController from "../../controllers/UsersController";

const jsonParser = bodyParser.json();
const usersRoutes = Router();
const usersController = new UsersController();

// usersRoutes.get('/');
usersRoutes.post('/', jsonParser, usersController.createUser);

export default usersRoutes;