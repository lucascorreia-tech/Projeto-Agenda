import express from 'express';
import homeController from './src/controllers/homeController.js';
const routes = express.Router();

// Rotas da home
routes.get('/', homeController.paginaInicial);


export default routes;