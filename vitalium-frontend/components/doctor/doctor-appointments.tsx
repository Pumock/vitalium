"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Video, User, Phone, MessageCircle, Plus } from "lucide-react"

export function DoctorAppointments() {
  const todayAppointments = [
    {
      id: 1,
      patient: "Maria Silva",
      time: "09:00",
      duration: "30 min",
      type: "Presencial",
      status: "completed",
      condition: "Hipertensão",
      notes: "Consulta de rotina - pressão controlada",
    },
    {
      id: 2,
      patient: "João Santos",
      time: "10:00",
      duration: "45 min",
      type: "Presencial",
      status: "completed",
      condition: "Diabetes",
      notes: "Ajuste de medicação necessário",
    },
    {
      id: 3,
      patient: "Ana Costa",
      time: "11:00",
      duration: "30 min",
      type: "Telemedicina",
      status: "completed",
      condition: "Ansiedade",
      notes: "Paciente relatou melhora significativa",
    },
    {
      id: 4,
      patient: "Pedro Oliveira",
      time: "14:00",
      duration: "30 min",
      type: "Presencial",
      status: "confirmed",
      condition: "Cardiopatia",
      notes: "",
    },
    {
      id: 5,
      patient: "Carla Mendes",
      time: "15:00",
      duration: "30 min",
      type: "Telemedicina",
      status: "confirmed",
      condition: "Enxaqueca",
      notes: "",
    },
    {
      id: 6,
      patient: "Roberto Silva",
      time: "16:00",
      duration: "45 min",
      type: "Presencial",
      status: "pending",
      condition: "Primeira consulta",
      notes: "",
    },
  ]

  const upcomingAppointments = [
    {
      id: 7,
      patient: "Lucia Mendes",
      date: "2024-01-25",
      time: "09:30",
      type: "Presencial",
      condition: "Hipertensão",
    },
    {
      id: 8,
      patient: "Fernando Costa",
      date: "2024-01-25",
      time: "11:00",
      type: "Telemedicina",
      condition: "Diabetes",
    },
    {
      id: 9,
      patient: "Sandra Oliveira",
      date: "2024-01-26",
      time: "14:00",
      type: "Presencial",
      condition: "Cardiopatia",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Concluída</Badge>
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Confirmada</Badge>
      case "pending":
        return <Badge variant="outline">Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Agenda de Hoje</span>
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Consulta
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayAppointments.map((appointment) => (
            <div key={appointment.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{appointment.time}</div>
                    <div className="text-xs text-muted-foreground">{appointment.duration}</div>
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {appointment.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{appointment.patient}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.condition}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(appointment.status)}
                  <Badge variant="outline" className="flex items-center space-x-1">
                    {appointment.type === "Telemedicina" ? (
                      <Video className="w-3 h-3" />
                    ) : (
                      <MapPin className="w-3 h-3" />
                    )}
                    <span>{appointment.type}</span>
                  </Badge>
                </div>
              </div>

              {appointment.notes && (
                <div className="mb-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground">{appointment.notes}</p>
                </div>
              )}

              <div className="flex space-x-2">
                {appointment.status === "confirmed" && (
                  <>
                    {appointment.type === "Telemedicina" ? (
                      <Button size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Iniciar Consulta
                      </Button>
                    ) : (
                      <Button size="sm">
                        <User className="w-4 h-4 mr-2" />
                        Iniciar Consulta
                      </Button>
                    )}
                  </>
                )}
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
                {appointment.status === "pending" && (
                  <Button size="sm" variant="outline">
                    Confirmar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Próximas Consultas</span>
          </CardTitle>
          <CardDescription>Consultas agendadas para os próximos dias</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-primary">{formatDate(appointment.date)}</div>
                  <div className="text-sm text-muted-foreground">{appointment.time}</div>
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {appointment.patient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{appointment.patient}</h3>
                  <p className="text-sm text-muted-foreground">{appointment.condition}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="flex items-center space-x-1">
                  {appointment.type === "Telemedicina" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                  <span>{appointment.type}</span>
                </Badge>
                <Button size="sm" variant="outline">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
