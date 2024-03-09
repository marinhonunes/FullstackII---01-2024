import { Router } from "express";
import OrdemDeServicoCtrl from "../Controle/ordem_servicoCtrl.js";

const rotaOs = new Router();
const OsCtrl = new OrdemDeServicoCtrl();

rotaOs
// .get('/', OsCtrl.consultar)
.get('/:termo', OsCtrl.consultar)
.post('/', OsCtrl.gravar)
// .patch('/', OsCtrl.atualizar)
// .put('/', OsCtrl.atualizar)
// .delete('/', OsCtrl.excluir);

export default rotaOs;
