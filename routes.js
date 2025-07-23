import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';
import contatoController from './src/controllers/contatoController.js';
import { loginRequired } from './src/middlewares/middlewareGlobal.js';
const routes = express.Router();

// Rotas da home
routes.get('/', homeController.index);

// Rotas de Login
routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.login);
routes.get('/login/logout', loginController.logout);

// Rotas de contato
routes.get('/contato/index', loginRequired, contatoController.index);
routes.post('/contato/register', loginRequired, contatoController.register);
routes.get('/contato/index/:id', loginRequired, contatoController.editIndex);
routes.post('/contato/edit/:id', loginRequired, contatoController.edit);
routes.get('/contato/delete/:id', loginRequired, contatoController.deletar);


export default routes;