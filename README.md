# Lumi Faturas de Energia

Este repositório contém o código-fonte da aplicação Lumi Faturas de Energia, que está dividida em duas partes principais: o backend e o frontend.

## Índice

- [Backend](#backend)
  - [Configuração](#configuração)
  - [Scripts](#scripts)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Esquema Prisma](#esquema-prisma)
- [Frontend](#frontend)
  - [Configuração](#configuração-1)
  - [Scripts](#scripts-1)
  - [Estilização](#estilização)
- [Licença](#licença)

## Backend

O backend é construído utilizando Node.js, TypeScript, Fastify e Prisma ORM. Possui um teste simples usando Jest. Utiliza Docker para instanciar um servidor PostgreSQL localmente, com o Adminer para interagir com as tabelas do banco de dados.

### Configuração

1. Instale as dependências:

```sh
cd backend
yarn
```

2. Configure as variáveis de ambiente copiando o arquivo .env.example para .env e preenchendo os valores necessários.

3. Inicie o servidor PostgreSQL via Docker:

```sh
docker compose up -d
```

4. Execute as migrações do Prisma para configurar o esquema do banco de dados:

```sh
npx prisma migrate dev
```

### Scripts

- `build`: Compila o código TypeScript.
- `test`: Executa os testes utilizando Jest.
- `start`: Compila o projeto e inicia o servidor.

### Variáveis de Ambiente

O backend utiliza variáveis de ambiente definidas no arquivo .env. Há um arquivo .env.example que mostra quais variáveis precisam ser definidas.

### Esquema Prisma

O schema do Prisma está definido no arquivo `backend/prisma/schema.prisma`.

### Acessando o Banco de Dados

Assumindo que você já tenha o Banco de Dados rodando via o arquivo `backend/docker-compose.yaml`, você pode acessar `http://localhost:8080`, que é um painel Adminer para interagir diretamente com as tabelas no Postgres.

## Frontend

O frontend é construído utilizando React, TypeScript, Vite, Tailwind, Zustand, Recharts e Axios.

### Configuração

1. Instale as dependências:

```sh
cd frontend
yarn
```

### Scripts

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Compila o projeto para produção.
- `lint`: Executa o ESLint para verificar problemas de qualidade de código.
- `format`: Formata o código usando Prettier.

### Estilização

O frontend utiliza Tailwind CSS para estilização. O arquivo CSS principal e único é `frontend/src/index.css`, e também há um arquivo de configuração do Tailwind em `frontend/tailwind.config.js`.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.