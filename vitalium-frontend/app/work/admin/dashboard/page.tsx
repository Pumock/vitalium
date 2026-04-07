"use client"
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

export default function AdminDashboard() {
  // Mock admin data
  const adminData = {
    name: "Admin Sistema",
    role: "Super Administrador",
    lastLogin: "2024-01-24T08:00:00Z",
  }

  const systemStats = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsersToday: 23,
    pendingApprovals: 8,
    totalDoctors: 156,
    totalPatients: 1091,
    systemUptime: "99.9%",
    criticalAlerts: 2,
    dataBackupStatus: "Completed",
    lastBackup: "2024-01-24T02:00:00Z",
  }

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      message: "Novo médico cadastrado: Dr. Carlos Silva",
      time: "2 horas atrás",
      severity: "info",
    },
    {
      id: 2,
      type: "security_alert",
      message: "Tentativa de login suspeita detectada",
      time: "4 horas atrás",
      severity: "warning",
    },
    {
      id: 3,
      type: "system_update",
      message: "Backup automático concluído com sucesso",
      time: "6 horas atrás",
      severity: "success",
    },
    {
      id: 4,
      type: "compliance",
      message: "Relatório LGPD gerado automaticamente",
      time: "1 dia atrás",
      severity: "info",
    },
  ]

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
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Total de Usuários</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{systemStats.totalUsers.toLocaleString()}</div>
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
              <div className="text-3xl font-bold text-foreground">{systemStats.totalDoctors}</div>
              <p className="text-xs text-muted-foreground">{systemStats.pendingApprovals} aguardando aprovação</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Pacientes</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{systemStats.totalPatients.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Cadastrados na plataforma</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Uptime do Sistema</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{systemStats.systemUptime}</div>
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
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Banco de Dados</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Saudável</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Último Backup</span>
                  <span className="text-sm font-medium">
                    {new Date(systemStats.lastBackup).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conformidade LGPD</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Ativa</Badge>
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
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${getSeverityColor(activity.severity)}`}>
                      {getSeverityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
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
