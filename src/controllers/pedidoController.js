import { pedidos, auditoria } from "../data/memoria.js";
import { canaisValidos, erroPadrao, statusPedidoValidos } from "../utils.js";

export const criarPedido = (req, res) => {
  const dadosRecebidos = req.body;
  const { canalPedido, total, itens = [] } = dadosRecebidos;

  if (!canalPedido) {
    return erroPadrao(
      res,
      422,
      "CAMPO_OBRIGATORIO",
      "O campo canalPedido é obrigatório.",
      req.originalUrl,
      [{ field: "canalPedido", issue: "campo obrigatório" }]
    );
  }

  if (!canaisValidos.includes(canalPedido)) {
    return erroPadrao(
      res,
      422,
      "CANAL_INVALIDO",
      "O canal do pedido informado não é válido.",
      req.originalUrl,
      [{ field: "canalPedido", issue: `use: ${canaisValidos.join(", ")}` }]
    );
  }

  if (total !== undefined && Number(total) < 0) {
    return erroPadrao(
      res,
      422,
      "TOTAL_INVALIDO",
      "O valor total do pedido não pode ser negativo.",
      req.originalUrl,
      [{ field: "total", issue: "valor negativo" }]
    );
  }

  const pedidoCriado = {
    id: pedidos.length + 1,
    usuarioId: req.usuario?.id || 1,
    canalPedido,
    total: Number(total || 0),
    itens,
    status: "AGUARDANDO_PAGAMENTO",
    criadoEm: new Date().toISOString()
  };

  pedidos.push(pedidoCriado);
  auditoria.push({
    acao: "CRIACAO_PEDIDO",
    pedidoId: pedidoCriado.id,
    usuarioId: pedidoCriado.usuarioId,
    dataHora: new Date().toISOString()
  });

  console.log(`Pedido ${pedidoCriado.id} criado pelo canal ${canalPedido}`);

  return res.status(201).json(pedidoCriado);
};

export const listarPedidos = (req, res) => {
  const { canalPedido, status } = req.query;

  let pedidosFiltrados = [...pedidos];

  if (canalPedido) {
    pedidosFiltrados = pedidosFiltrados.filter(
      (pedido) => pedido.canalPedido === canalPedido
    );
  }

  if (status) {
    pedidosFiltrados = pedidosFiltrados.filter((pedido) => pedido.status === status);
  }

  return res.json({
    total: pedidosFiltrados.length,
    pedidos: pedidosFiltrados
  });
};

export const buscarPedidoPorId = (req, res) => {
  const idPedido = Number(req.params.id);
  const pedidoEncontrado = pedidos.find((pedido) => pedido.id === idPedido);

  if (!pedidoEncontrado) {
    return erroPadrao(
      res,
      404,
      "PEDIDO_NAO_ENCONTRADO",
      "Pedido não encontrado.",
      req.originalUrl
    );
  }

  return res.json(pedidoEncontrado);
};

export const mudarStatusPedido = (req, res) => {
  const idPedido = Number(req.params.id);
  const novoStatus = req.body.status;

  const pedidoEncontrado = pedidos.find((pedido) => pedido.id === idPedido);

  if (!pedidoEncontrado) {
    return erroPadrao(
      res,
      404,
      "PEDIDO_NAO_ENCONTRADO",
      "Pedido não encontrado.",
      req.originalUrl
    );
  }

  if (!statusPedidoValidos.includes(novoStatus)) {
    return erroPadrao(
      res,
      422,
      "STATUS_INVALIDO",
      "Status informado não é válido.",
      req.originalUrl,
      [{ field: "status", issue: `use: ${statusPedidoValidos.join(", ")}` }]
    );
  }

  const statusAnterior = pedidoEncontrado.status;
  pedidoEncontrado.status = novoStatus;
  pedidoEncontrado.atualizadoEm = new Date().toISOString();

  auditoria.push({
    acao: "ALTERACAO_STATUS_PEDIDO",
    pedidoId: pedidoEncontrado.id,
    usuarioId: req.usuarioLogado?.id,
    statusAnterior,
    novoStatus,
    dataHora: new Date().toISOString()
  });

  console.log(`Pedido ${pedidoEncontrado.id} alterado de ${statusAnterior} para ${novoStatus}`);

  return res.json({
    mensagem: "Status atualizado",
    pedido: pedidoEncontrado
  });
};

export const listarAuditoria = (req, res) => {
  return res.json({ total: auditoria.length, registros: auditoria });
};
