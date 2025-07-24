# 📦 Projeto - Gerenciamento de Produtos e Avaliações

Este projeto é uma aplicação completa com **Backend (NestJS + PostgreSQL)** e **Frontend (React)**, rodando em containers com **Docker Compose**.

---

## 🧱 Estrutura

```
.
├── backend/      # API NestJS com PostgreSQL
├── frontend/     # Interface Web em React
├── docker-compose.yml
├── README.md
```

---

## 🚀 Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Porta `5433`, `3000`, `3001` livres no host

---

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone git@github.com:RobsonMT/Code-Chalenge-SolarMarket.git
cd Code-Chalenge-SolarMarket
```

---

### 2. Ajuste variáveis de ambiente (opcional)

Se necessário, edite o arquivo `.env` (ou use variáveis direto no `docker-compose.yml`).

Exemplo de variáveis já definidas:

```yaml
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=app_db
```

---

### 3. Suba os containers

```bash
docker-compose up --build
```

Aguarde até que os serviços `backend`, `frontend` e `db` estejam no ar.

---

### 4. Acesse a aplicação

- Frontend: [http://172.21.0.4:3001/](http://172.21.0.4:3001/)
- API: [http://localhost:3000](http://localhost:3000)

---

### 5. Rodar Migrations (caso necessário)

Dentro do container do backend:

```bash
docker exec -it app-backend bash
npx typeorm migration:run
```

---

## 🛠️ Comandos úteis

```bash
# Subir tudo com rebuild
docker-compose up --build

# Parar tudo
docker-compose down

# Entrar no backend
docker exec -it app-backend bash

# Ver logs
docker-compose logs -f
```

---

## 🧪 Tecnologias utilizadas

- **Backend**: NestJS + TypeORM + PostgreSQL
- **Frontend**: React + TailwindCSS
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker + Docker Compose

---

## 🐞 Problemas comuns

### ❌ `Cannot find module '/app/dist/main'`

Você precisa compilar o backend antes de iniciar com `node dist/main`. Isso é feito automaticamente no Dockerfile do backend com:

```Dockerfile
RUN npm run build
```

### ❌ Porta 5432 já em uso

Verifique se há outro Postgres rodando localmente:

```bash
sudo lsof -i :5432
```

Pare o processo ou altere a porta no `docker-compose.yml`.