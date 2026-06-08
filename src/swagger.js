export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Raízes do Nordeste",
    version: "1.0.0",
    description: "Documentação da API do projeto Back-End"
  },
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Realizar login",
        responses: {
          200: { description: "Login realizado com sucesso" },
          401: { description: "Credenciais inválidas" }
        }
      }
    },
    "/api/pedidos": {
      post: {
        summary: "Criar pedido",
        responses: {
          201: { description: "Pedido criado" },
          400: { description: "Erro de validação" },
          401: { description: "Não autenticado" }
        }
      },
      get: {
        summary: "Listar pedidos",
        responses: {
          200: { description: "Lista de pedidos" },
          401: { description: "Não autenticado" }
        }
      }
    },
    "/api/pedidos/{id}/status": {
      patch: {
        summary: "Atualizar status do pedido",
        responses: {
          200: { description: "Status atualizado" },
          403: { description: "Sem permissão" },
          404: { description: "Pedido não encontrado" }
        }
      }
    },
    "/api/pagamentos/mock": {
      post: {
        summary: "Simular pagamento",
        responses: {
          200: { description: "Pagamento processado" },
          404: { description: "Pedido não encontrado" }
        }
      }
    }
  }
};