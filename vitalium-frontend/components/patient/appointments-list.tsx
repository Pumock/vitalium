"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video, Plus, User } from "lucide-react"

export function AppointmentsList() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. João Santos",
      specialty: "Cardiologia",
      date: "2024-01-25",
      time: "14:00",
      type: "Presencial",
      location: "Consultório - Sala 205",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dra. Maria Oliveira",
      specialty: "Endocrinologia",
      date: "2024-02-02",
      time: "09:30",
      type: "Telemedicina",
      location: "Consulta online",
      status: "confirmed",
    },
    {
      id: 3,
      doctor: "Dr. Pedro Silva",
      specialty: "Clínico Geral",
      date: "2024-02-15",
      time: "16:00",
      type: "Presencial",
      location: "Consultório - Sala 101",
      status: "pending",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Confirmada</Badge>
      case "pending":
        return <Badge variant="outline">Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Próximas Consultas</span>
            </CardTitle>
            <CardDescription>Suas consultas agendadas</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Agendar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{appointment.doctor}</h3>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                </div>
              </div>
              {getStatusBadge(appointment.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                {appointment.type === "Telemedicina" ? (
                  <Video className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                )}
                <span>{appointment.location}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              {appointment.type === "Telemedicina" && (
                <Button size="sm" variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Entrar na Consulta
                </Button>
              )}
              <Button size="sm" variant="outline">
                Ver Detalhes
              </Button>
              <Button size="sm" variant="outline">
                Reagendar
              </Button>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Nenhuma consulta agendada</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agendar Primeira Consulta
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
