//funções utilizadas para gerar token de acesso a API
// e verifica se a assinatura de um token é valida

//infos sensiveis sao armazenadas em variaveis de ambiente .env

import jwt from "jsonwebtoken";

export function assinar(usuario) {
  const token = jwt.sign({ usuario }, process.env.SECRET_KEY, {
    expiresIn: "300s",
  });
  return token;
}

export function verificarAssinatura(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}
