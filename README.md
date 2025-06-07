# Backend API - Fastify, Prisma e TypeScript

API backend desenvolvida com Fastify, Prisma e TypeScript para gerenciar clientes, ativos e alocação.

## Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- npm ou yarn
- Banco de dados configurado (exemplo: PostgreSQL, MySQL, SQLite)

---

## Como usar

1. Clone o repositório:
git clone https://github.com/IzaiasFrancisco0/backend-ankatech.git
cd backend

2. Instale as dependências:
npm install

3. Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto com as variáveis necessárias, por exemplo:

DATABASE_URL="sua_string_de_conexão_aqui"
PORT=5000
HOST=127.0.0.1

4. Gere o cliente Prisma:
npm run prisma:generate

5. Execute a migração inicial para criar a tabela de clientes (ou outras tabelas):
npm run prisma:migrate

6. Inicie o servidor em modo desenvolvimento:
npm run dev

- Estrutura do projeto
backend/
├── prisma/               # Arquivos do Prisma (schema, migrações)
├── src/                  # Código fonte TypeScript
│   ├── routes/           # Rotas da API
│   ├── controllers/      # lógica dos controladores
│   └── index.ts          # Ponto de entrada do servidor
├── .env                  # Variáveis de ambiente (não versionar!)
├── package.json          # Configurações do projeto e scripts
└── tsconfig.json         # Configuração do TypeScript
