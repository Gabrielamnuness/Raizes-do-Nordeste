import jwt from "jsonwebtoken";

export const autenticarUsuario = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "TOKEN_NAO_INFORMADO",
      message: "Token de autenticação não informado.",
      details: [],
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const usuario = jwt.verify(token, "segredo");
    req.usuario = usuario;
    next();
  } catch {
    return res.status(401).json({
      error: "TOKEN_INVALIDO",
      message: "Token inválido.",
      details: [],
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }
};

export const permitirPerfis = (...perfisPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({
        error: "ACESSO_NEGADO",
        message: "Usuário sem permissão para acessar este recurso.",
        details: [],
        path: req.originalUrl,
        timestamp: new Date().toISOString()
      });
    }

    next();
  };
};