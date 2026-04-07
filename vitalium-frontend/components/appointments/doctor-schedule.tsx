"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Video, MessageCircle, Phone } from "lucide-react"

const todaySchedule = [
  {
    id: 1,
    time: "08:00",
    duration: 60,
    patient: "João Silva",
    type: "Consulta",
    mode: "presencial",
    status: "confirmed",
    notes: "Primeira consulta - hipertensão",
  },
  {
    id: 2,
    time: "09:30",
    duration: 30,
    patient: "Maria Santos",
    type: "Retorno",
    mode: "telemedicina",
    status: "confirmed",
    notes: "Acompanhamento diabetes",
  },
  {
    id: 3,
    time: "10:30",
    duration: 45,
    patient: "Pedro Costa",
    type: "Check-up",
    mode: "presencial",
    status: "confirmed",
    notes: "Exames de rotina",
  },
  {
    id: 4,
    time: "14:00",
    duration: 60,
    patient: "Ana Oliveira",
    type: "Consulta",
    mode: "presencial",
    status: "pending",
    notes: "Dores no peito",
  },
  {
    id: 5,
    time: "15:30",
    duration: 30,
    patient: "Carlos Ferreira",
    type: "Retorno",
    mode: "telemedicina",
    status: "confirmed",
    notes: "Resultados de exames",
  },
]

export function DoctorSchedule() {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()

  const isCurrentAppointment = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":").map(Number)
    const appointmentTime = hour * 60 + minute
    const currentTimeMinutes = currentHour * 60 + currentMinute
    return appointmentTime <= currentTimeMinutes && currentTimeMinutes < appointmentTime + 60
  }

  const isPastAppointment = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":").map(Number)
    const appointmentTime = hour * 60 + minute
    const currentTimeMinutes = currentHour * 60 + currentMinute
    return appointmentTime + 60 < currentTimeMinutes
  }

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Agenda de Hoje - {new Date().toLocaleDateString("pt-BR")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((appointment) => {
              const isCurrent = isCurrentAppointment(appointment.time)
              const isPast = isPastAppointment(appointment.time)

              return (
                <div
                  key={appointment.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isCurrent
                      ? "bg-emerald-100 border-emerald-400 shadow-md"
                      : isPast
                        ? "bg-gray-50 border-gray-200 opacity-75"
                        : "bg-white border-emerald-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-900">
                            {appointment.time} ({appointment.duration}min)
                          </span>
                        </div>
                        {isCurrent && <Badge className="bg-emerald-600 text-white animate-pulse">Em andamento</Badge>}
                        <Badge
                          className={
                            appointment.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                        </Badge>
                        <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                          {appointment.type}
                        </Badge>
                        {appointment.mode === "telemedicina" && (
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            <Video className="h-3 w-3 mr-1" />
                            Online
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium text-emerald-900">{appointment.patient}</span>
                      </div>

                      {appointment.notes && <p className="text-sm text-emerald-700 ml-6">{appointment.notes}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 lg:min-w-fit">
                      {!isPast && (
                        <>
                          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                            <MessageCircle className="h-4 w-4" />
                            Chat
                          </Button>
                          {appointment.mode === "telemedicina" ? (
                            <Button size="sm" className="gap-2">
                              <Video className="h-4 w-4" />
                              {isCurrent ? "Entrar" : "Iniciar"}
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Phone className="h-4 w-4" />
                              Ligar
                            </Button>
                          )}
                        </>
                      )}
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Visão Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm font-medium text-emerald-700 mb-2">{day}</div>
                <div className="space-y-1">
                  {index === 0 ? (
                    <div className="text-xs text-gray-500">Folga</div>
                  ) : (
                    <>
                      <div className="text-xs bg-emerald-100 text-emerald-800 p-1 rounded">
                        {Math.floor(Math.random() * 8) + 4} consultas
                      </div>
                      <div className="text-xs text-emerald-600">8h-17h</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
