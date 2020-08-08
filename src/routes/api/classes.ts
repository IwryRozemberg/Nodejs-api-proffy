import { Router } from "express";
import bodyParser from 'body-parser';
import ClassesController from "../../controllers/ClassesController";


const jsonParser = bodyParser.json();
const classRoutes = Router();
const classController = new ClassesController();
// const urdencodedPerson = bodyParser.urlencoded({extended: false});

classRoutes.get('/', classController.listByParams);
classRoutes.post('/', jsonParser, classController.createClass);

export default classRoutes;