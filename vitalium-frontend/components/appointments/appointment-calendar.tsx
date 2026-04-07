"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, User, MapPin } from "lucide-react"

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
    location: "Sala 105",
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
  },
]

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export function AppointmentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getAppointmentsForDate = (date: string) => {
    return appointments.filter((apt) => apt.date === date)
  }

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2 border-emerald-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-emerald-900">
              {months[month]} {year}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-emerald-700">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2 h-20" />
              }

              const dateString = formatDate(year, month, day)
              const dayAppointments = getAppointmentsForDate(dateString)
              const isSelected = selectedDate === dateString
              const isToday = dateString === new Date().toISOString().split("T")[0]

              return (
                <div
                  key={day}
                  className={`p-2 h-20 border border-emerald-100 rounded-lg cursor-pointer transition-colors hover:bg-emerald-50 ${
                    isSelected ? "bg-emerald-100 border-emerald-300" : ""
                  } ${isToday ? "ring-2 ring-emerald-400" : ""}`}
                  onClick={() => setSelectedDate(dateString)}
                >
                  <div className="text-sm font-medium text-emerald-900 mb-1">{day}</div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map((apt) => (
                      <div
                        key={apt.id}
                        className={`text-xs p-1 rounded text-white truncate ${
                          apt.status === "confirmed" ? "bg-emerald-600" : "bg-amber-500"
                        }`}
                      >
                        {apt.time} {apt.doctor.split(" ")[1]}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-emerald-600">+{dayAppointments.length - 2} mais</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">
            {selectedDate ? new Date(selectedDate).toLocaleDateString("pt-BR") : "Selecione uma data"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            <div className="space-y-4">
              {getAppointmentsForDate(selectedDate).length > 0 ? (
                getAppointmentsForDate(selectedDate).map((apt) => (
                  <div key={apt.id} className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        className={
                          apt.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }
                      >
                        {apt.status === "confirmed" ? "Confirmado" : "Pendente"}
                      </Badge>
                      <span className="text-sm text-emerald-600">{apt.type}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm text-emerald-900">
                          {apt.time} ({apt.duration}min)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-emerald-600" />
                        <div>
                          <div className="text-sm font-medium text-emerald-900">{apt.doctor}</div>
                          <div className="text-xs text-emerald-700">{apt.specialty}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm text-emerald-900">{apt.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Reagendar
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent text-red-600 border-red-300">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
                  <p className="text-emerald-600">Nenhuma consulta agendada para esta data</p>
                  <Button size="sm" className="mt-4">
                    Agendar Consulta
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
              <p className="text-emerald-600">Clique em uma data no calendário para ver os detalhes</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
