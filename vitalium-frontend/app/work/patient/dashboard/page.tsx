"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Plus,
  Calendar,
  MessageCircle,
  Activity,
  Pill,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { HealthLogForm } from "@/components/patient/health-log-form"
import { HealthMetrics } from "@/components/patient/health-metrics"
import { MedicationTracker } from "@/components/patient/medication-tracker"
import { AppointmentsList } from "@/components/patient/appointments-list"
import { AppLayout } from "@/components/app-layout"

export default function PatientDashboard() {
  const [showHealthLog, setShowHealthLog] = useState(false)

  // Mock data - in real app this would come from API
  const patientData = {
    name: "Maria Silva",
    age: 45,
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
    doctor: "Dr. João Santos",
    healthScore: 85,
  }

  const todayStats = {
    symptomsLogged: true,
    medicationsTaken: 2,
    totalMedications: 3,
    waterIntake: 6,
    waterGoal: 8,
    stepsCount: 7500,
    stepsGoal: 10000,
  }

  const recentAlerts = [
    {
      id: 1,
      type: "medication",
      message: "Lembrete: Tomar Losartana às 20:00",
      time: "18:30",
      priority: "medium",
    },
    {
      id: 2,
      type: "appointment",
      message: "Consulta com Dr. João Santos amanhã às 14:00",
      time: "Ontem",
      priority: "high",
    },
    {
      id: 3,
      type: "health",
      message: "Pressão arterial registrada: 140/90 mmHg",
      time: "Hoje",
      priority: "medium",
    },
  ]

  return (
    <AppLayout userRole="patient">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <h1 className="text-3xl font-bold text-foreground">Olá, {patientData.name}!</h1>
            <Badge variant="secondary">Paciente</Badge>
          </div>
          <p className="text-muted-foreground">
            Como você está se sentindo hoje? Registre seus sintomas e acompanhe sua evolução.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 flex-col space-y-2" onClick={() => setShowHealthLog(true)} size="lg">
            <Plus className="w-6 h-6" />
            <span>Registrar Sintomas</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" size="lg">
            <MessageCircle className="w-6 h-6" />
            <span>Falar com Médico</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" size="lg">
            <Calendar className="w-6 h-6" />
            <span>Agendar Consulta</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" size="lg">
            <Activity className="w-6 h-6" />
            <span>Ver Relatórios</span>
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Resumo de Hoje</span>
                </CardTitle>
                <CardDescription>Acompanhe suas atividades diárias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {todayStats.symptomsLogged ? (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      ) : (
                        <Clock className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm font-medium">Sintomas</p>
                    <p className="text-xs text-muted-foreground">
                      {todayStats.symptomsLogged ? "Registrados" : "Pendente"}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {todayStats.medicationsTaken}/{todayStats.totalMedications}
                    </div>
                    <p className="text-sm font-medium">Medicações</p>
                    <p className="text-xs text-muted-foreground">Tomadas hoje</p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">
                      {todayStats.waterIntake}/{todayStats.waterGoal}
                    </div>
                    <p className="text-sm font-medium">Água (copos)</p>
                    <Progress value={(todayStats.waterIntake / todayStats.waterGoal) * 100} className="mt-1" />
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">
                      {todayStats.stepsCount.toLocaleString()}
                    </div>
                    <p className="text-sm font-medium">Passos</p>
                    <Progress value={(todayStats.stepsCount / todayStats.stepsGoal) * 100} className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Metrics Dashboard */}
            <HealthMetrics />

            {/* Medication Tracker */}
            <MedicationTracker />

            {/* Appointments */}
            <AppointmentsList />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Health Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Score de Saúde</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{patientData.healthScore}</div>
                  <p className="text-sm text-muted-foreground mb-4">Muito bom!</p>
                  <Progress value={patientData.healthScore} className="mb-4" />
                  <p className="text-xs text-muted-foreground">Baseado nos seus registros dos últimos 30 dias</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <span>Alertas Recentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0">
                      {alert.type === "medication" && <Pill className="w-4 h-4 text-blue-500" />}
                      {alert.type === "appointment" && <Calendar className="w-4 h-4 text-green-500" />}
                      {alert.type === "health" && <Heart className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Paciente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Idade:</span>
                  <span className="text-sm font-medium">{patientData.age} anos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Médico:</span>
                  <span className="text-sm font-medium">{patientData.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Última consulta:</span>
                  <span className="text-sm font-medium">{patientData.lastVisit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Próxima consulta:</span>
                  <span className="text-sm font-medium">{patientData.nextAppointment}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Health Log Modal */}
      {showHealthLog && <HealthLogForm onClose={() => setShowHealthLog(false)} />}
    </AppLayout>
  )
}
