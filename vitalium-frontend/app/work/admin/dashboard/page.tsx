"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Shield,
  AlertTriangle,
  Activity,
  Database,
  FileText,
  TrendingUp,
  UserCheck,
  Clock,
  Heart,
} from "lucide-react"
import { UserManagement } from "@/components/admin/user-management"
import { SystemMonitoring } from "@/components/admin/system-monitoring"
import { CompliancePanel } from "@/components/admin/compliance-panel"
import { SystemSettings } from "@/components/admin/system-settings"
import { AppLayout } from "@/components/app-layout"
import {
  GetAdminDashboardService,
  type AdminDashboardData,
} from "@/services/api/admin/GetAdminDashboard"

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true)
        setLoadError(null)
        const data = await GetAdminDashboardService.getDashboard()
        setDashboard(data)
      } catch (error) {
        console.error("Falha ao carregar dashboard administrativo:", error)
        setLoadError("Não foi possível carregar os dados do dashboard.")
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const systemStats = dashboard?.systemStats ?? {
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    pendingApprovals: 0,
    totalDoctors: 0,
    totalPatients: 0,
    systemUptime: "--",
    criticalAlerts: 0,
    dataBackupStatus: "Pending" as const,
    lastBackup: null,
  }

  const systemStatus = dashboard?.systemStatus ?? {
    server: "Offline" as const,
    database: "Instavel" as const,
    lgpdCompliance: "Atencao" as const,
  }

  const recentActivity = dashboard?.recentActivity ?? []

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      case "info":
      default:
        return "text-blue-600"
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <UserCheck className="w-4 h-4" />
      case "security_alert":
        return <AlertTriangle className="w-4 h-4" />
      case "system_update":
        return <Activity className="w-4 h-4" />
      case "compliance":
        return <Shield className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const formatTimeAgo = (dateValue: string) => {
    const diffMs = Date.now() - new Date(dateValue).getTime()
    const minutes = Math.floor(diffMs / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 60) return `${Math.max(minutes, 1)} min atrás`
    if (hours < 24) return `${hours} hora${hours > 1 ? "s" : ""} atrás`
    return `${days} dia${days > 1 ? "s" : ""} atrás`
  }

  const statusBadgeClass = (status: "Online" | "Offline" | "Saudavel" | "Instavel" | "Ativa" | "Atencao") => {
    if (status === "Online" || status === "Saudavel" || status === "Ativa") {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    }

    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  }

  return (
    <AppLayout userRole="admin">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
            <Badge variant="destructive">Administrador</Badge>
          </div>
          <p className="text-muted-foreground">
            Gerencie usuários, monitore o sistema e mantenha a conformidade da plataforma Vitalium.
          </p>
          {loadError && <p className="text-sm text-red-600 mt-2">{loadError}</p>}
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Total de Usuários</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? "..." : systemStats.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {systemStats.activeUsers} ativos • {systemStats.newUsersToday} novos hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <UserCheck className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Médicos</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? "..." : systemStats.totalDoctors}
              </div>
              <p className="text-xs text-muted-foreground">{systemStats.pendingApprovals} aguardando aprovação</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Pacientes</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? "..." : systemStats.totalPatients.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Cadastrados na plataforma</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Uptime do Sistema</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{isLoading ? "..." : systemStats.systemUptime}</div>
              <p className="text-xs text-muted-foreground">{systemStats.criticalAlerts} alertas críticos</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">Usuários</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
                <TabsTrigger value="compliance">Conformidade</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-6">
                <UserManagement />
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <SystemMonitoring />
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                <CompliancePanel />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <SystemSettings />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span>Status do Sistema</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Servidor Principal</span>
                  <Badge className={statusBadgeClass(systemStatus.server)}>{systemStatus.server}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Banco de Dados</span>
                  <Badge className={statusBadgeClass(systemStatus.database)}>
                    {systemStatus.database === "Saudavel" ? "Saudável" : "Instável"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Último Backup</span>
                  <span className="text-sm font-medium">
                    {systemStats.lastBackup
                      ? new Date(systemStats.lastBackup).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conformidade LGPD</span>
                  <Badge className={statusBadgeClass(systemStatus.lgpdCompliance)}>
                    {systemStatus.lgpdCompliance === "Ativa" ? "Ativa" : "Atenção"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isLoading && recentActivity.length === 0 && (
                  <p className="text-sm text-muted-foreground">Sem atividade recente.</p>
                )}
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${getSeverityColor(activity.severity)}`}>
                      {getSeverityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.occurredAt)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Aprovar Médicos Pendentes
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar Relatório LGPD
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Executar Backup Manual
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver Analytics Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
