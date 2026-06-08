import express from "express";
import { fazerLogin } from "../controllers/authController.js";
import {
  criarPedido,
  listarPedidos,
  buscarPedidoPorId,
  mudarStatusPedido,
  listarAuditoria
} from "../controllers/pedidoController.js";
import { pagamentoMock } from "../controllers/pagamentoController.js";
import { autenticarUsuario, permitirPerfis } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/health", (req, res) => res.json({ status: "API funcionando" }));

// autenticação
router.post("/auth/login", fazerLogin);

// pedidos
router.get("/pedidos", autenticarUsuario, listarPedidos);
router.post("/pedidos", autenticarUsuario, permitirPerfis("CLIENTE", "ADMIN"), criarPedido);
router.get("/pedidos/:id", autenticarUsuario, buscarPedidoPorId);
router.patch("/pedidos/:id/status", autenticarUsuario, permitirPerfis("ADMIN"), mudarStatusPedido);

// pagamento externo simulado
router.post("/pagamentos/mock", autenticarUsuario, pagamentoMock);

// logs/auditoria simples
router.get("/auditoria", autenticarUsuario, permitirPerfis("ADMIN"), listarAuditoria);

export default router;
