import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Login from './module/Login';
import Cadastro from './module/Cadastro';

const cadastro = new Login('.form-cadastro');
const login = new Login('.form-login');
login.init();
cadastro.init();

const craiaEdita = new Cadastro ('.form-cria-ou-edita-contato');
craiaEdita.init();




// import './assets/css/style.css';
