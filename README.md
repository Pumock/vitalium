# Vitalium

Plataforma de saúde digital composta por três aplicações integradas: uma API backend, um painel web frontend e um aplicativo mobile.

## Estrutura do Repositório

```
vitalium/
├── vitalium-backend/   # API REST (NestJS + Prisma + PostgreSQL)
├── vitalium-frontend/  # Painel web (Next.js)
├── vitalium-mobile/    # Aplicativo mobile (Flutter)
├── docker-compose.dev.yml
├── docker-compose.yml
├── dev.bat             # Script de gerenciamento (Windows)
└── dev.sh              # Script de gerenciamento (Mac/Linux)
```

## Stack

| Camada    | Tecnologia                     |
|-----------|--------------------------------|
| Backend   | NestJS, Prisma ORM, PostgreSQL |
| Frontend  | Next.js 15, Tailwind CSS       |
| Mobile    | Flutter                        |
| Infra     | Docker, Docker Compose         |

---

## Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução

---

## Rodando com Docker (Recomendado)

### Primeira execução

Constrói as imagens e cria os containers:

**Windows:**
```bat
.\dev.bat init
```

**Mac/Linux:**
```bash
chmod +x dev.sh
./dev.sh init
```

Após o `init`, os serviços estarão disponíveis em:

| Serviço       | URL                        |
|---------------|----------------------------|
| Backend (API) | http://localhost:3000      |
| Frontend      | http://localhost:3001      |
| Prisma Studio | http://localhost:5555      |
| PostgreSQL    | localhost:5432             |

---

### Uso diário

| Ação                                | Windows              | Mac/Linux           |
|-------------------------------------|----------------------|---------------------|
| Iniciar containers                  | `.\dev.bat up`       | `./dev.sh up`       |
| Parar (preserva containers)         | `.\dev.bat down`     | `./dev.sh down`     |
| Reiniciar                           | `.\dev.bat restart`  | `./dev.sh restart`  |
| Ver logs em tempo real              | `.\dev.bat logs`     | `./dev.sh logs`     |
| Reconstruir imagens                 | `.\dev.bat build`    | `./dev.sh build`    |
| Limpar tudo (containers + volumes)  | `.\dev.bat clean`    | `./dev.sh clean`    |

---

## Variáveis de Ambiente

### Backend

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp vitalium-backend/.env.example vitalium-backend/.env.development
```

| Variável        | Descrição                        | Padrão (dev)                    |
|-----------------|----------------------------------|---------------------------------|
| `DATABASE_URL`  | String de conexão do PostgreSQL  | `postgresql://vitalium:...`     |
| `JWT_SECRET`    | Chave secreta para tokens JWT    | —                               |
| `PORT`          | Porta da API                     | `3000`                          |
| `NODE_ENV`      | Ambiente de execução             | `development`                   |

### Frontend

```bash
cp vitalium-frontend/.env.example vitalium-frontend/.env.local
```

| Variável                  | Descrição             | Padrão               |
|---------------------------|-----------------------|----------------------|
| `NEXT_PUBLIC_API_BASE_URL`| URL base da API       | `http://localhost:3000` |

---

## Mobile (Flutter)

O app mobile é desenvolvido em Flutter e roda de forma independente dos containers Docker.

### Pré-requisitos

- [Flutter SDK](https://flutter.dev/docs/get-started/install) instalado

### Rodar o app

```bash
cd vitalium-mobile
flutter pub get
flutter run
```

Certifique-se de que o backend está rodando e configure a URL da API no app apontando para o seu IP local.

---

## Produção

Para subir o ambiente de produção (backend + frontend + postgres + redis):

```bash
docker compose -f docker-compose.yml up -d
```

> Crie um arquivo `.env` na raiz com as variáveis `POSTGRES_PASSWORD`, `JWT_SECRET` e `NEXT_PUBLIC_API_BASE_URL` antes de subir em produção.
