"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, Download, Eye, AlertTriangle, CheckCircle2, Users } from "lucide-react"

export function CompliancePanel() {
  const complianceStatus = {
    lgpd: {
      score: 95,
      status: "compliant",
      lastAudit: "2024-01-15",
      nextAudit: "2024-04-15",
    },
    hipaa: {
      score: 92,
      status: "compliant",
      lastAudit: "2024-01-10",
      nextAudit: "2024-04-10",
    },
    dataRetention: {
      score: 88,
      status: "warning",
      lastReview: "2024-01-20",
      nextReview: "2024-02-20",
    },
  }

  const dataRequests = [
    {
      id: 1,
      type: "access",
      requester: "Maria Silva",
      email: "maria.silva@email.com",
      date: "2024-01-24",
      status: "pending",
      deadline: "2024-02-23",
    },
    {
      id: 2,
      type: "deletion",
      requester: "João Santos",
      email: "joao.santos@email.com",
      date: "2024-01-22",
      status: "completed",
      deadline: "2024-02-21",
    },
    {
      id: 3,
      type: "portability",
      requester: "Ana Costa",
      email: "ana.costa@email.com",
      date: "2024-01-20",
      status: "in_progress",
      deadline: "2024-02-19",
    },
  ]

  const auditLogs = [
    {
      id: 1,
      action: "Data Export",
      user: "Admin Sistema",
      target: "Patient Data - Maria Silva",
      timestamp: "2024-01-24T14:30:00Z",
      ip: "192.168.1.100",
      status: "success",
    },
    {
      id: 2,
      action: "User Access",
      user: "Dr. João Santos",
      target: "Patient Records",
      timestamp: "2024-01-24T13:45:00Z",
      ip: "192.168.1.101",
      status: "success",
    },
    {
      id: 3,
      action: "Data Deletion",
      user: "Admin Sistema",
      target: "Expired Records",
      timestamp: "2024-01-24T02:00:00Z",
      ip: "192.168.1.100",
      status: "success",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Conforme</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Atenção</Badge>
      case "non_compliant":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Não Conforme</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Concluído</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Em Andamento</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case "access":
        return "Acesso aos Dados"
      case "deletion":
        return "Exclusão de Dados"
      case "portability":
        return "Portabilidade"
      case "rectification":
        return "Retificação"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="requests">Solicitações</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>LGPD</span>
                </CardTitle>
                <CardDescription>Lei Geral de Proteção de Dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">{complianceStatus.lgpd.score}%</span>
                  {getStatusBadge(complianceStatus.lgpd.status)}
                </div>
                <Progress value={complianceStatus.lgpd.score} className="h-2" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última auditoria:</span>
                    <span>{new Date(complianceStatus.lgpd.lastAudit).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Próxima auditoria:</span>
                    <span>{new Date(complianceStatus.lgpd.nextAudit).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>HIPAA</span>
                </CardTitle>
                <CardDescription>Health Insurance Portability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">{complianceStatus.hipaa.score}%</span>
                  {getStatusBadge(complianceStatus.hipaa.status)}
                </div>
                <Progress value={complianceStatus.hipaa.score} className="h-2" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última auditoria:</span>
                    <span>{new Date(complianceStatus.hipaa.lastAudit).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Próxima auditoria:</span>
                    <span>{new Date(complianceStatus.hipaa.nextAudit).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Retenção de Dados</span>
                </CardTitle>
                <CardDescription>Políticas de armazenamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">{complianceStatus.dataRetention.score}%</span>
                  {getStatusBadge(complianceStatus.dataRetention.status)}
                </div>
                <Progress value={complianceStatus.dataRetention.score} className="h-2" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última revisão:</span>
                    <span>{new Date(complianceStatus.dataRetention.lastReview).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Próxima revisão:</span>
                    <span>{new Date(complianceStatus.dataRetention.nextReview).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações de Conformidade</CardTitle>
              <CardDescription>Ferramentas para manter a conformidade regulatória</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                  <FileText className="w-6 h-6" />
                  <span>Gerar Relatório LGPD</span>
                </Button>
                <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                  <Shield className="w-6 h-6" />
                  <span>Auditoria de Segurança</span>
                </Button>
                <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                  <Users className="w-6 h-6" />
                  <span>Revisar Permissões</span>
                </Button>
                <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                  <Download className="w-6 h-6" />
                  <span>Exportar Logs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Dados (LGPD)</CardTitle>
              <CardDescription>Gerenciar solicitações de acesso, exclusão e portabilidade de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{getRequestTypeLabel(request.type)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {request.requester} • {request.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Solicitado em {new Date(request.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Prazo: {new Date(request.deadline).toLocaleDateString("pt-BR")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.ceil(
                            (new Date(request.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          dias restantes
                        </p>
                      </div>
                      {getRequestStatusBadge(request.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Auditoria</CardTitle>
              <CardDescription>Registro de todas as ações sensíveis no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {log.status === "success" ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{log.action}</h3>
                        <p className="text-sm text-muted-foreground">
                          {log.user} • {log.target}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          IP: {log.ip} • {new Date(log.timestamp).toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <Badge variant={log.status === "success" ? "default" : "destructive"}>
                      {log.status === "success" ? "Sucesso" : "Falha"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Conformidade</CardTitle>
              <CardDescription>Gerar e baixar relatórios regulatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Relatórios LGPD</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-between bg-transparent" variant="outline">
                      <span>Relatório Mensal - Janeiro 2024</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between bg-transparent" variant="outline">
                      <span>Auditoria de Dados - Q4 2023</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between bg-transparent" variant="outline">
                      <span>Solicitações de Usuários - 2023</span>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Relatórios de Segurança</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-between bg-transparent" variant="outline">
                      <span>Logs de Acesso - Janeiro 2024</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between bg-transparent" variant="outline">
                      <span>Tentativas de Login - Mensal</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between bg-transparent" variant="outline">
                      <span>Relatório de Incidentes - Q4 2023</span>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
