"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Clock, CheckCircle2, MessageCircle, Phone, User } from "lucide-react"

export function AlertsPanel() {
  const criticalAlerts = [
    {
      id: 1,
      patient: "Ana Costa",
      message: "Pressão arterial crítica: 180/110 mmHg",
      time: "5 min atrás",
      type: "vital",
      severity: "critical",
      status: "pending",
    },
    {
      id: 2,
      patient: "Carlos Silva",
      message: "Não tomou medicação há 2 dias",
      time: "1 hora atrás",
      type: "medication",
      severity: "high",
      status: "pending",
    },
  ]

  const mediumAlerts = [
    {
      id: 3,
      patient: "Maria Santos",
      message: "Dor de cabeça intensa relatada (9/10)",
      time: "2 horas atrás",
      type: "symptom",
      severity: "medium",
      status: "pending",
    },
    {
      id: 4,
      patient: "João Oliveira",
      message: "Frequência cardíaca elevada: 95 bpm",
      time: "3 horas atrás",
      type: "vital",
      severity: "medium",
      status: "pending",
    },
    {
      id: 5,
      patient: "Pedro Costa",
      message: "Consulta perdida - reagendamento necessário",
      time: "4 horas atrás",
      type: "appointment",
      severity: "medium",
      status: "pending",
    },
  ]

  const resolvedAlerts = [
    {
      id: 6,
      patient: "Lucia Mendes",
      message: "Pressão arterial normalizada após medicação",
      time: "1 dia atrás",
      type: "vital",
      severity: "medium",
      status: "resolved",
      resolvedBy: "Dr. João Santos",
    },
    {
      id: 7,
      patient: "Roberto Silva",
      message: "Paciente confirmou tomada de medicação",
      time: "2 dias atrás",
      type: "medication",
      severity: "low",
      status: "resolved",
      resolvedBy: "Dr. João Santos",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Crítico</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Alto</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Médio</Badge>
      case "low":
        return <Badge variant="outline">Baixo</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vital":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "medication":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "symptom":
        return <User className="w-4 h-4 text-orange-500" />
      case "appointment":
        return <Clock className="w-4 h-4 text-purple-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const handleResolveAlert = (alertId: number) => {
    console.log("Resolving alert:", alertId)
    // Here you would update the alert status
  }

  const handleContactPatient = (patient: string, method: "chat" | "phone") => {
    console.log(`Contacting ${patient} via ${method}`)
    // Here you would initiate contact
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="critical" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="critical" className="relative">
            Críticos
            {criticalAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {criticalAlerts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="medium" className="relative">
            Médios
            {mediumAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
                {mediumAlerts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="resolved">Resolvidos</TabsTrigger>
        </TabsList>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span>Alertas Críticos</span>
              </CardTitle>
              <CardDescription>Requerem atenção imediata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border-2 border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(alert.type)}
                      <div>
                        <h3 className="font-semibold text-foreground">{alert.patient}</h3>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className="text-foreground mb-4">{alert.message}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleContactPatient(alert.patient, "chat")}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleContactPatient(alert.patient, "phone")}>
                      <Phone className="w-4 h-4 mr-2" />
                      Ligar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Resolver
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-600">
                <Clock className="w-5 h-5" />
                <span>Alertas Médios</span>
              </CardTitle>
              <CardDescription>Requerem acompanhamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mediumAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(alert.type)}
                      <div>
                        <h3 className="font-semibold text-foreground">{alert.patient}</h3>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className="text-foreground mb-4">{alert.message}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleContactPatient(alert.patient, "chat")}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Resolver
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span>Alertas Resolvidos</span>
              </CardTitle>
              <CardDescription>Histórico de alertas tratados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resolvedAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <div>
                        <h3 className="font-semibold text-foreground">{alert.patient}</h3>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Resolvido
                    </Badge>
                  </div>
                  <p className="text-foreground mb-2">{alert.message}</p>
                  <p className="text-sm text-muted-foreground">Resolvido por: {alert.resolvedBy}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
