import session from "express-session";
import { assinar, verificarAssinatura } from "./funcoesJWT.js";

export function autenticar(req, res) {
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  if (usuario === "admin" && senha === "admin") {
    req.session.usuarioAutenticado = usuario;
    res.json({
        'status': true,
        'token': assinar({usuario})
    })
  } else {
    req.session.usuarioAutenticado = null;
    res.status(401).json({
        'status': false,
        'mensagem': 'Usuário ou senha inválidos!'
    })
  }
}

export function verificarAcesso(requisicao, resposta, next) {
  const token = requisicao.headers['authorization'];
  let tokenDecodificado = undefined;
  if (token){
      tokenDecodificado = verificarAssinatura(token);
  }
  

  if ((tokenDecodificado !== undefined) && (tokenDecodificado.usuario.usuario == requisicao.session.usuarioAutenticado)) {
      next();
  }
  else{
      resposta.status(401).json({
          "status": false,
          "mensagem": "Acesso não autorizado. Faça o login na aplicação!"
      })
  }
}

