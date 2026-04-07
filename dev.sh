#!/bin/bash
echo "=========================================="
echo "   Vitalium - Development Environment"
echo "=========================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "[ERROR] Docker nao esta rodando. Inicie o Docker e tente novamente."
    exit 1
fi

ACTION=${1:-up}

case $ACTION in
    up)
        echo "[INFO] Subindo todos os servicos (backend + frontend + postgres + prisma studio)..."
        docker compose -f docker-compose.dev.yml up -d
        echo ""
        echo "[OK] Servicos iniciados!"
        echo "  Backend:       http://localhost:3000"
        echo "  Frontend:      http://localhost:3001"
        echo "  Prisma Studio: http://localhost:5555"
        echo "  PostgreSQL:    localhost:5432"
        echo ""
        echo "Use './dev.sh logs' para ver os logs"
        ;;
    down)
        echo "[INFO] Parando todos os servicos (containers preservados)..."
        docker compose -f docker-compose.dev.yml stop
        echo "[OK] Servicos parados."
        ;;
    restart)
        echo "[INFO] Reiniciando todos os servicos..."
        docker compose -f docker-compose.dev.yml restart
        echo "[OK] Servicos reiniciados!"
        ;;
    logs)
        echo "[INFO] Mostrando logs (Ctrl+C para sair)..."
        docker compose -f docker-compose.dev.yml logs -f
        ;;
    init)
        echo "[INFO] Construindo imagens e subindo servicos pela primeira vez..."
        docker compose -f docker-compose.dev.yml up --build -d
        echo ""
        echo "[OK] Servicos iniciados!"
        echo "  Backend:       http://localhost:3000"
        echo "  Frontend:      http://localhost:3001"
        echo "  Prisma Studio: http://localhost:5555"
        echo "  PostgreSQL:    localhost:5432"
        ;;
    build)
        echo "[INFO] Reconstruindo imagens..."
        docker compose -f docker-compose.dev.yml build --no-cache
        echo "[OK] Imagens reconstruidas!"
        ;;
    clean)
        echo "[INFO] Limpando tudo (containers, volumes, imagens)..."
        docker compose -f docker-compose.dev.yml down -v --rmi local
        echo "[OK] Tudo limpo!"
        ;;
    *)
        echo "Uso: ./dev.sh [up|down|restart|logs|build|clean]"
        echo ""
        echo "  up      - Sobe os servicos existentes (padrao)"
        echo "  init    - Constroi as imagens e sobe (primeira vez)"
        echo "  down    - Para todos os servicos"
        echo "  restart - Reinicia todos os servicos"
        echo "  logs    - Mostra logs em tempo real"
        echo "  build   - Reconstroi as imagens"
        echo "  clean   - Remove containers, volumes e imagens"
        ;;
esac
