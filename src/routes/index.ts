import { Router } from "express";
import apiRoutes from './api/index';

const routes = Router();

routes.use('/api', apiRoutes);

export default routes;