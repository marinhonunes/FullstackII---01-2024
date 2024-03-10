import express from 'express';
import cors from 'cors';
import rotaDepartamento from './Rotas/rotaDepartamento.js';
import rotaFuncionario from './Rotas/rotaFuncionario.js';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaOs from './Rotas/rotaOs.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Segurança/autenticacao.js';

const host = '0.0.0.0';
const porta = 3000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin);
app.use('/departamento', verificarAcesso, rotaDepartamento);
app.use('/funcionario', verificarAcesso, rotaFuncionario);
app.use('/ordem',verificarAcesso,rotaOs); 

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}.`);
});



