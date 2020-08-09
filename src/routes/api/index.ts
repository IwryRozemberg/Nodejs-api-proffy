import { Router } from 'express';

import classRoutes from './classes';
import connectionsRoutes from './connections';
import usersRoutes from './users';

const apiRoutes = Router();
const endpoints = {
  message: 'Routes from API Proffy',
  endpoints: {
    classes: {
      path: '/classes'
    },
    'connections-numbers': {
      path: '/connections'
    },
    users: {
      path: '/users'
    },
  }
};

apiRoutes.get('/', (request, response) => response.json(endpoints));
apiRoutes.use('/classes', classRoutes);
apiRoutes.use('/connections', connectionsRoutes);
apiRoutes.use('/users', usersRoutes);

export default apiRoutes;