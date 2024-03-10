import { Router } from "express";
import OrdemDeServicoCtrl from "../Controle/ordem_servicoCtrl.js";

const rotaOs = new Router();
const OsCtrl = new OrdemDeServicoCtrl();

rotaOs
  .get("/:termo", OsCtrl.consultar)
  .post("/", OsCtrl.gravar)
  .delete("/", OsCtrl.excluir)
  .put("/", OsCtrl.atualizar);

export default rotaOs;
