import { Router } from "express";
import bodyParse from 'body-parser';
import ConnectionsController from "../../controllers/ConnectionsController";

const connectionsRoutes = Router();
const connectionsController = new ConnectionsController();
const jsonParse = bodyParse.json();

connectionsRoutes.get('/', connectionsController.count);
connectionsRoutes.post('/', jsonParse, connectionsController.createConnection);

export default connectionsRoutes;