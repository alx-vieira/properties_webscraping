import { Router } from 'express';

import * as HomeController from '../controllers/homeController';

const route = Router();

route.get('/', HomeController.home);

export default route;