import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import { csrfSync } from 'csrf-sync';


dotenv.config();

import routes from './routes.js';
import {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
  loginRequired
} from './src/middlewares/middlewareGlobal.js';

// Constantes
const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  try{
    // Conexão com MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Conectado !!!');

    // Middlewares de parsing
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());

    // Arquivos estáticos
    app.use(express.static(path.join(__dirname, 'public')));

    // Sessão
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dia
    }));

    // Flash
    app.use(flash());

    // CSRF - csrf-sync
    const { csrfSynchronisedProtection } = csrfSync({
      getTokenFromRequest: (req) => req.body._csrf
    });
    app.use(csrfSynchronisedProtection);

    // Views
    app.set('views', path.join(__dirname, 'src', 'views'));
    app.set('view engine', 'ejs');

    // Middlewares globais
    app.use(middlewareGlobal);
    app.use(csrfMiddleware);
    app.use(checkCsrfError); 

    // Configura rotas
    app.use(routes);
    

    app.listen(PORT, ()=> {
      console.log(`Acessar http://localhost:${PORT}`);
      console.log(`Servidor executando na porta ${PORT}`);
    });
  } catch (err){
    console.error('Erro na inicialização da aplicação: ', err);
  }
}

main();