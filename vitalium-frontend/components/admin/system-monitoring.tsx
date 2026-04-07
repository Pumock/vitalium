"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Activity,
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react"

export function SystemMonitoring() {
  // Mock system metrics data
  const systemMetrics = {
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 78,
    uptime: "15 dias, 8 horas",
    activeConnections: 1247,
    requestsPerMinute: 2340,
    errorRate: 0.02,
  }

  const performanceData = [
    { time: "00:00", cpu: 35, memory: 60, requests: 1200 },
    { time: "04:00", cpu: 28, memory: 55, requests: 800 },
    { time: "08:00", cpu: 45, memory: 70, requests: 2100 },
    { time: "12:00", cpu: 52, memory: 75, requests: 2800 },
    { time: "16:00", cpu: 48, memory: 72, requests: 2500 },
    { time: "20:00", cpu: 42, memory: 68, requests: 2200 },
  ]

  const errorLogs = [
    {
      id: 1,
      timestamp: "2024-01-24T14:30:00Z",
      level: "error",
      message: "Database connection timeout",
      service: "API Gateway",
      count: 3,
    },
    {
      id: 2,
      timestamp: "2024-01-24T13:45:00Z",
      level: "warning",
      message: "High memory usage detected",
      service: "Application Server",
      count: 1,
    },
    {
      id: 3,
      timestamp: "2024-01-24T12:20:00Z",
      level: "info",
      message: "Scheduled backup completed successfully",
      service: "Backup Service",
      count: 1,
    },
  ]

  const services = [
    { name: "API Gateway", status: "healthy", uptime: "99.9%", responseTime: "45ms" },
    { name: "Database Primary", status: "healthy", uptime: "99.8%", responseTime: "12ms" },
    { name: "Database Replica", status: "healthy", uptime: "99.7%", responseTime: "15ms" },
    { name: "File Storage", status: "healthy", uptime: "99.9%", responseTime: "23ms" },
    { name: "Email Service", status: "warning", uptime: "98.5%", responseTime: "120ms" },
    { name: "Chat Service", status: "healthy", uptime: "99.6%", responseTime: "67ms" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Saudável</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Atenção</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Erro</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Erro</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Aviso</Badge>
      case "info":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Info</Badge>
      default:
        return <Badge variant="secondary">{level}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Cpu className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">CPU</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{systemMetrics.cpu}%</span>
                    <Badge
                      variant={
                        systemMetrics.cpu > 80 ? "destructive" : systemMetrics.cpu > 60 ? "secondary" : "default"
                      }
                    >
                      {systemMetrics.cpu > 80 ? "Alto" : systemMetrics.cpu > 60 ? "Médio" : "Normal"}
                    </Badge>
                  </div>
                  <Progress value={systemMetrics.cpu} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MemoryStick className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Memória</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{systemMetrics.memory}%</span>
                    <Badge
                      variant={
                        systemMetrics.memory > 80 ? "destructive" : systemMetrics.memory > 60 ? "secondary" : "default"
                      }
                    >
                      {systemMetrics.memory > 80 ? "Alto" : systemMetrics.memory > 60 ? "Médio" : "Normal"}
                    </Badge>
                  </div>
                  <Progress value={systemMetrics.memory} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <HardDrive className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Disco</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{systemMetrics.disk}%</span>
                    <Badge
                      variant={
                        systemMetrics.disk > 80 ? "destructive" : systemMetrics.disk > 60 ? "secondary" : "default"
                      }
                    >
                      {systemMetrics.disk > 80 ? "Alto" : systemMetrics.disk > 60 ? "Médio" : "Normal"}
                    </Badge>
                  </div>
                  <Progress value={systemMetrics.disk} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Wifi className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium">Rede</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{systemMetrics.network}%</span>
                    <Badge
                      variant={
                        systemMetrics.network > 80
                          ? "destructive"
                          : systemMetrics.network > 60
                            ? "secondary"
                            : "default"
                      }
                    >
                      {systemMetrics.network > 80 ? "Alto" : systemMetrics.network > 60 ? "Médio" : "Normal"}
                    </Badge>
                  </div>
                  <Progress value={systemMetrics.network} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="w-5 h-5 text-primary" />
                  <span>Informações do Sistema</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium">{systemMetrics.uptime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conexões Ativas</span>
                  <span className="text-sm font-medium">{systemMetrics.activeConnections.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Requisições/min</span>
                  <span className="text-sm font-medium">{systemMetrics.requestsPerMinute.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Taxa de Erro</span>
                  <span className="text-sm font-medium">{systemMetrics.errorRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Ações Rápidas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reiniciar Serviços
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Executar Backup
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  Limpar Cache
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance do Sistema - Últimas 24 horas</CardTitle>
              <CardDescription>Monitoramento de CPU, memória e requisições</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} name="Memória %" />
                    <Line type="monotone" dataKey="requests" stroke="#f59e0b" strokeWidth={2} name="Requisições" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status dos Serviços</CardTitle>
              <CardDescription>Monitoramento de todos os serviços da plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="font-medium text-foreground">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{service.responseTime}</p>
                        <p className="text-xs text-muted-foreground">Tempo de resposta</p>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>Últimos eventos e erros registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {errorLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <div className="flex-shrink-0">{getLevelBadge(log.level)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground">{log.message}</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{log.service}</span>
                        {log.count > 1 && (
                          <Badge variant="outline" className="text-xs">
                            {log.count}x
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
