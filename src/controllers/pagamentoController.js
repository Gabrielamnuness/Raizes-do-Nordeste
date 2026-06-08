export const pagamentoMock = (req, res) => {
  const { pedidoId, valor, statusPagamento } = req.body;

  if (!pedidoId || !valor) {
    return res.status(400).json({
      error: "DADOS_INVALIDOS",
      message: "Informe o pedidoId e o valor do pagamento.",
      details: [],
      path: "/api/pagamentos/mock",
      timestamp: new Date().toISOString()
    });
  }

  const resultadoPagamento = statusPagamento || "APROVADO";

  return res.status(200).json({
    pedidoId,
    valor,
    statusPagamento: resultadoPagamento,
    mensagem:
      resultadoPagamento === "APROVADO"
        ? "Pagamento aprovado com sucesso"
        : "Pagamento recusado"
  });
};