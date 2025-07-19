import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';
const routes = express.Router();

// Rotas da home
routes.get('/', homeController.index);

// Rotas de Login
routes.get('/login/index', loginController.index);


export default routes;