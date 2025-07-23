import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './modules/Login.js';
import Contato from './modules/Contato.js';

// Valida o formulário do login e cadastro
const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init();
cadastro.init();

// Valida o formulário de contato
const contato = new Contato('.formContato')
contato.init();