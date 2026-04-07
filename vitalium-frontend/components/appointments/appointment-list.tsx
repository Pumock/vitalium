"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, User, MapPin, Search, Calendar, MessageCircle, Video } from "lucide-react"

const appointments = [
  {
    id: 1,
    date: "2024-01-20",
    time: "09:00",
    duration: 60,
    doctor: "Dr. Ana Silva",
    specialty: "Cardiologia",
    type: "Consulta",
    status: "confirmed",
    location: "Sala 201",
    mode: "presencial",
    patient: "João Silva",
  },
  {
    id: 2,
    date: "2024-01-20",
    time: "14:30",
    duration: 30,
    doctor: "Dr. Carlos Santos",
    specialty: "Endocrinologia",
    type: "Retorno",
    status: "confirmed",
    location: "Online",
    mode: "telemedicina",
    patient: "Maria Santos",
  },
  {
    id: 3,
    date: "2024-01-22",
    time: "10:15",
    duration: 45,
    doctor: "Dra. Maria Costa",
    specialty: "Psiquiatria",
    type: "Terapia",
    status: "pending",
    location: "Sala 303",
    mode: "presencial",
    patient: "Pedro Costa",
  },
  {
    id: 4,
    date: "2024-01-25",
    time: "16:00",
    duration: 60,
    doctor: "Dr. João Oliveira",
    specialty: "Clínica Geral",
    type: "Check-up",
    status: "confirmed",
    location: "Sala 102",
    mode: "presencial",
    patient: "Ana Oliveira",
  },
  {
    id: 5,
    date: "2024-01-18",
    time: "11:30",
    duration: 30,
    doctor: "Dra. Lucia Ferreira",
    specialty: "Dermatologia",
    type: "Consulta",
    status: "completed",
    location: "Sala 205",
    mode: "presencial",
    patient: "Carlos Ferreira",
  },
]

export function AppointmentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    const matchesType = typeFilter === "all" || apt.mode === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "completed":
        return "Concluído"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <Input
                placeholder="Buscar por médico, especialidade ou paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-emerald-200 focus:border-emerald-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-emerald-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="border-emerald-200">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="telemedicina">Telemedicina</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((apt) => (
          <Card key={apt.id} className="border-emerald-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(apt.status)}>{getStatusText(apt.status)}</Badge>
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                        {apt.type}
                      </Badge>
                      {apt.mode === "telemedicina" && (
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          <Video className="h-3 w-3 mr-1" />
                          Online
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm text-emerald-900">
                          {new Date(apt.date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm text-emerald-900">
                          {apt.time} ({apt.duration}min)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm text-emerald-900">{apt.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-emerald-600" />
                        <div>
                          <div className="text-sm font-medium text-emerald-900">{apt.doctor}</div>
                          <div className="text-xs text-emerald-700">{apt.specialty}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm text-emerald-900">Paciente: {apt.patient}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:min-w-fit">
                  {apt.status === "confirmed" && (
                    <>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <MessageCircle className="h-4 w-4" />
                        Chat
                      </Button>
                      {apt.mode === "telemedicina" && (
                        <Button size="sm" className="gap-2">
                          <Video className="h-4 w-4" />
                          Iniciar
                        </Button>
                      )}
                    </>
                  )}
                  {apt.status === "pending" && (
                    <Button size="sm" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Confirmar
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card className="border-emerald-200">
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Nenhuma consulta encontrada</h3>
            <p className="text-emerald-600 mb-4">Tente ajustar os filtros ou agendar uma nova consulta</p>
            <Button>Agendar Nova Consulta</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
