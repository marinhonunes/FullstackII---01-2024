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

export function verificarAcesso(req, res, next) {
  const token = req.headers['authorization'];
  let tokenDecodificado = '';

  if (token){
    tokenDecodificado = verificarAssinatura(token);
  }

  
  if (tokenDecodificado.usuario.usuario == req.session.usuarioAutenticado) {
    next();
  }
  else{
    res.status(401).json({
      'status': false,
      'mensagem': 'acesso não autorizado. Faça o login na API.'
    })
  }
}

