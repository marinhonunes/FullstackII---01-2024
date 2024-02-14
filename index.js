import express from 'express';
import cors from 'cors';
import rotaDepartamento from './Rotas/rotaDepartamento.js';
import rotaFuncionario from './Rotas/rotaFuncionario.js';

const host = '0.0.0.0';
const porta = 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/departamento', rotaDepartamento);
app.use('/funcionario', rotaFuncionario);

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}.`);
});


// 1:36:31 segundos de aula 