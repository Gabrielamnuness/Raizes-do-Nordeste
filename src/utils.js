export const erroPadrao = (
  error,
  message,
  path = "",
  details = []
) => {
  return {
    error,
    message,
    details,
    timestamp: new Date().toISOString(),
    path
  };
};

export const gerarErro = erroPadrao;

export const canaisValidos = [
  "APP",
  "TOTEM",
  "BALCAO",
  "PICKUP",
  "WEB"
];

export const statusPedidoValidos = [
  "AGUARDANDO_PAGAMENTO",
  "PAGO",
  "EM_PREPARO",
  "PRONTO",
  "ENTREGUE",
  "CANCELADO"
];

export const registrarLog = (mensagem) => {
  console.log(`[${new Date().toISOString()}] ${mensagem}`);
};