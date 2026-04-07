"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, Heart, TrendingDown, AlertTriangle, MessageCircle, Calendar, FileText, User } from "lucide-react"

interface PatientMonitoringProps {
  selectedPatient: string | null
}

export function PatientMonitoring({ selectedPatient }: PatientMonitoringProps) {
  // Mock patient data
  const patientData = {
    id: "1",
    name: "Maria Silva",
    age: 45,
    condition: "Hipertensão",
    healthScore: 85,
    lastUpdate: "2 horas atrás",
  }

  const vitalSigns = [
    { date: "01/01", systolic: 125, diastolic: 82, heartRate: 72, weight: 70.2 },
    { date: "02/01", systolic: 128, diastolic: 84, heartRate: 75, weight: 70.0 },
    { date: "03/01", systolic: 122, diastolic: 80, heartRate: 68, weight: 69.8 },
    { date: "04/01", systolic: 126, diastolic: 83, heartRate: 71, weight: 69.5 },
    { date: "05/01", systolic: 120, diastolic: 78, heartRate: 73, weight: 69.3 },
    { date: "06/01", systolic: 124, diastolic: 81, heartRate: 69, weight: 69.1 },
    { date: "07/01", systolic: 121, diastolic: 79, heartRate: 74, weight: 69.0 },
  ]

  const symptomsData = [
    { symptom: "Dor de cabeça", frequency: 3, severity: 6 },
    { symptom: "Fadiga", frequency: 5, severity: 4 },
    { symptom: "Tontura", frequency: 2, severity: 7 },
    { symptom: "Palpitações", frequency: 1, severity: 8 },
  ]

  const medicationAdherence = [
    { medication: "Losartana 50mg", adherence: 95, lastTaken: "Hoje 08:00" },
    { medication: "Hidroclorotiazida 25mg", adherence: 88, lastTaken: "Hoje 08:00" },
    { medication: "Sinvastatina 20mg", adherence: 92, lastTaken: "Ontem 22:00" },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "vital",
      message: "Pressão arterial elevada: 140/95 mmHg",
      time: "2 horas atrás",
      severity: "medium",
    },
    {
      id: 2,
      type: "medication",
      message: "Medicação não tomada: Hidroclorotiazida",
      time: "1 dia atrás",
      severity: "low",
    },
    {
      id: 3,
      type: "symptom",
      message: "Relatou dor de cabeça intensa (8/10)",
      time: "3 horas atrás",
      severity: "high",
    },
  ]

  if (!selectedPatient) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Selecione um paciente</h3>
          <p className="text-muted-foreground">
            Escolha um paciente da lista para visualizar o monitoramento detalhado.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{patientData.name}</CardTitle>
              <CardDescription>
                {patientData.age} anos • {patientData.condition} • Última atualização: {patientData.lastUpdate}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{patientData.healthScore}</div>
                <p className="text-sm text-muted-foreground">Score de Saúde</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Relatório
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Monitoring Tabs */}
      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vitals">Sinais Vitais</TabsTrigger>
          <TabsTrigger value="symptoms">Sintomas</TabsTrigger>
          <TabsTrigger value="medications">Medicações</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="vitals" className="space-y-6">
          {/* Current Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">Pressão Arterial</span>
                </div>
                <div className="text-2xl font-bold">121/79</div>
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">Melhorando</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Freq. Cardíaca</span>
                </div>
                <div className="text-2xl font-bold">74 bpm</div>
                <div className="flex items-center space-x-1 text-sm">
                  <span className="text-green-500">Normal</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Peso</span>
                </div>
                <div className="text-2xl font-bold">69.0 kg</div>
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">-1.2 kg</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Nível de Dor</span>
                </div>
                <div className="text-2xl font-bold">3/10</div>
                <div className="flex items-center space-x-1 text-sm">
                  <span className="text-green-500">Baixo</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vitals Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pressão Arterial - Últimos 7 dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalSigns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="systolic" stroke="#059669" strokeWidth={2} name="Sistólica" />
                      <Line type="monotone" dataKey="diastolic" stroke="#10b981" strokeWidth={2} name="Diastólica" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequência Cardíaca e Peso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalSigns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={2} name="FC (bpm)" />
                      <Line type="monotone" dataKey="weight" stroke="#f59e0b" strokeWidth={2} name="Peso (kg)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sintomas Reportados - Últimos 30 dias</CardTitle>
              <CardDescription>Frequência e intensidade dos sintomas relatados pelo paciente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {symptomsData.map((symptom, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-medium">{symptom.symptom}</h3>
                      <p className="text-sm text-muted-foreground">{symptom.frequency} episódios este mês</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{symptom.severity}/10</div>
                      <p className="text-sm text-muted-foreground">Intensidade média</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adesão às Medicações</CardTitle>
              <CardDescription>Acompanhamento do uso correto das medicações prescritas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicationAdherence.map((med, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{med.medication}</h3>
                      <p className="text-sm text-muted-foreground">Última dose: {med.lastTaken}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{med.adherence}%</div>
                        <p className="text-sm text-muted-foreground">Adesão</p>
                      </div>
                      <Badge
                        variant={med.adherence >= 90 ? "default" : med.adherence >= 70 ? "secondary" : "destructive"}
                      >
                        {med.adherence >= 90 ? "Excelente" : med.adherence >= 70 ? "Boa" : "Baixa"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alertas Recentes</CardTitle>
              <CardDescription>Notificações importantes sobre o estado do paciente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <div className="flex-shrink-0">
                      <AlertTriangle
                        className={`w-5 h-5 ${
                          alert.severity === "high"
                            ? "text-red-500"
                            : alert.severity === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">{alert.time}</p>
                    </div>
                    <Badge
                      variant={
                        alert.severity === "high"
                          ? "destructive"
                          : alert.severity === "medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {alert.severity === "high" ? "Alto" : alert.severity === "medium" ? "Médio" : "Baixo"}
                    </Badge>
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
