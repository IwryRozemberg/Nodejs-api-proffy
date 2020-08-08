import { Router } from 'express';
import classRoutes from './classes';
import connectionsRoutes from './connections';

const apiRoutes = Router();
const endpoints = {
  message: 'Routers from API Proffy',
  endpoints: {
    classes: {
      path: '/classes'
    },
    'connections-numbers': {
      path: '/connections'
    }
  }
};

apiRoutes.get('/', (request, response) => response.json(endpoints));
apiRoutes.use('/classes', classRoutes);
apiRoutes.use('/connections', connectionsRoutes);

export default apiRoutes;