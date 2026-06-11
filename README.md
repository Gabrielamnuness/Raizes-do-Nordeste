# Raizes-do-Nordeste

Rede Raízes do Nordeste - API Back-End

Descrição

A API Rede Raízes do Nordeste foi desenvolvida como projeto da disciplina Projeto Multidisciplinar – Trilha Back-End. O sistema simula a operação de uma rede de alimentação, permitindo autenticação de usuários, criação e consulta de pedidos, simulação de pagamento e atualização de status dos pedidos.

A aplicação foi construída utilizando Node.js e Express, seguindo o padrão REST e utilizando autenticação baseada em JWT.

# Tecnologias Utilizadas
* Node.js
* Express
* JWT (JSON Web Token)
* Swagger
* Nodemon
* JavaScript ES Modules
* Estrutura do Projeto

src/
controllers/
authController.js
pedidoController.js
pagamentoController.js
middleware/
authMiddleware.js
routes/
index.js
data/
memoria.js
utils.js
swagger.js
app.js

# Funcionalidades
**Autenticação**

Login de usuários
Geração de token JWT
Controle de acesso por perfil

**Pedidos**
Criação de pedidos
Consulta de pedidos
Filtro por canal de origem
Atualização de status

**Pagamentos**
Simulação de pagamento mock
Aprovação ou reprovação de pagamentos
Auditoria
Registro de operações executadas no sistema
Canais de Pedido

**O sistema aceita os seguintes canais:**

APP
TOTEM
BALCAO
PICKUP
WEB
Instalação

Clone o repositório:

git clone https://github.com/seu-usuario/rede-raizes-do-nordeste.git

**Acesse a pasta:**

cd rede-raizes-do-nordeste

**Instale as dependências:**

npm install

**Execução**

**Inicie a aplicação:**

npm run dev

**A API ficará disponível em:**

http://localhost:3000

# Swagger

**Documentação da API:**

http://localhost:3000/api-docs

**Principais Endpoints**

**Login**
POST /api/auth/login

**Criar Pedido**
POST /api/pedidos

**Listar Pedidos**
GET /api/pedidos

**Filtrar Pedidos por Canal**
GET /api/pedidos?canalPedido=APP

**Atualizar Status**
PATCH /api/pedidos/:id/status

**Simular Pagamento**
POST /api/pagamentos/mock

**Perfis de Acesso**

**ADMIN**
Atualizar status dos pedidos
Consultar pedidos
Acessar funcionalidades administrativas

**CLIENTE**
Criar pedidos
Consultar pedidos
Realizar pagamentos
Segurança

A API utiliza autenticação JWT para proteger rotas privadas e controlar permissões de acesso conforme o perfil do usuário.

Autor

Gabriela Monteiro

Projeto desenvolvido para a disciplina Projeto Multidisciplinar – Trilha Back-End.
