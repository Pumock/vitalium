"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, MessageCircle, Phone, Video, Activity, Clock, TrendingUp, TrendingDown } from "lucide-react"

interface PatientsListProps {
  searchQuery: string
  onSelectPatient: (patientId: string) => void
}

export function PatientsList({ searchQuery="", onSelectPatient }: PatientsListProps) {
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Mock patients data
  const patients = [
    {
      id: "1",
      name: "Maria Silva",
      age: 45,
      condition: "Hipertensão",
      lastUpdate: "2 horas atrás",
      status: "stable",
      healthScore: 85,
      trend: "improving",
      lastVitals: { bp: "125/82", hr: "72 bpm" },
      unreadMessages: 2,
      nextAppointment: "2024-01-25",
      riskLevel: "low",
    },
    {
      id: "2",
      name: "João Santos",
      age: 62,
      condition: "Diabetes Tipo 2",
      lastUpdate: "30 min atrás",
      status: "attention",
      healthScore: 72,
      trend: "stable",
      lastVitals: { glucose: "180 mg/dL", bp: "140/90" },
      unreadMessages: 0,
      nextAppointment: "2024-01-26",
      riskLevel: "medium",
    },
    {
      id: "3",
      name: "Ana Costa",
      age: 38,
      condition: "Ansiedade",
      lastUpdate: "1 hora atrás",
      status: "critical",
      healthScore: 58,
      trend: "declining",
      lastVitals: { hr: "95 bpm", mood: "3/10" },
      unreadMessages: 5,
      nextAppointment: "2024-01-24",
      riskLevel: "high",
    },
    {
      id: "4",
      name: "Pedro Oliveira",
      age: 55,
      condition: "Cardiopatia",
      lastUpdate: "4 horas atrás",
      status: "stable",
      healthScore: 78,
      trend: "improving",
      lastVitals: { bp: "118/75", hr: "68 bpm" },
      unreadMessages: 1,
      nextAppointment: "2024-01-27",
      riskLevel: "low",
    },
    {
      id: "5",
      name: "Carla Mendes",
      age: 29,
      condition: "Enxaqueca",
      lastUpdate: "6 horas atrás",
      status: "stable",
      healthScore: 82,
      trend: "stable",
      lastVitals: { pain: "2/10", sleep: "7h" },
      unreadMessages: 0,
      nextAppointment: "2024-01-28",
      riskLevel: "low",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "stable":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Estável</Badge>
      case "attention":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Atenção</Badge>
      case "critical":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Crítico</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Baixo
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Médio
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Alto
          </Badge>
        )
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      case "stable":
        return <Activity className="w-4 h-4 text-blue-500" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os pacientes</SelectItem>
            <SelectItem value="critical">Críticos</SelectItem>
            <SelectItem value="attention">Atenção</SelectItem>
            <SelectItem value="stable">Estáveis</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="lastUpdate">Última atualização</SelectItem>
            <SelectItem value="healthScore">Score de saúde</SelectItem>
            <SelectItem value="riskLevel">Nível de risco</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Patients Grid */}
      <div className="grid gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} anos • {patient.condition}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(patient.status)}
                  {getRiskBadge(patient.riskLevel)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Score de Saúde</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">{patient.healthScore}</span>
                    {getTrendIcon(patient.trend)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Última Atualização</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{patient.lastUpdate}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Próxima Consulta</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(patient.nextAppointment).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Últimos sinais: {Object.values(patient.lastVitals).join(" • ")}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {patient.unreadMessages > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {patient.unreadMessages} mensagens
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => onSelectPatient(patient.id)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Vídeo
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onSelectPatient(patient.id)}>
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum paciente encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou termo de busca.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
