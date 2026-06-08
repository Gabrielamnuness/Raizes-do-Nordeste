import jwt from "jsonwebtoken";
import { usuarios } from "../data/memoria.js";
import { erroPadrao } from "../utils.js";

const segredoJwt = process.env.JWT_SECRET || "segredo";

export const fazerLogin = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return erroPadrao(
      res,
      422,
      "DADOS_OBRIGATORIOS",
      "Email e senha devem ser informados.",
      req.originalUrl,
      [{ field: "email/senha", issue: "campos obrigatórios" }]
    );
  }

  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === email && usuario.senha === senha
  );

  if (!usuarioEncontrado) {
    return erroPadrao(
      res,
      401,
      "CREDENCIAIS_INVALIDAS",
      "Email ou senha inválidos.",
      req.originalUrl
    );
  }

  const tokenGerado = jwt.sign(
    {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      perfil: usuarioEncontrado.perfil
    },
    segredoJwt,
    { expiresIn: "1h" }
  );

  return res.json({
    mensagem: "Login realizado com sucesso",
    token: tokenGerado,
    tipo: "Bearer",
    usuario: {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
      perfil: usuarioEncontrado.perfil
    }
  });
};
