"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, User, MapPin, Video } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const doctors = [
  { id: 1, name: "Dr. Ana Silva", specialty: "Cardiologia", available: true },
  { id: 2, name: "Dr. Carlos Santos", specialty: "Endocrinologia", available: true },
  { id: 3, name: "Dra. Maria Costa", specialty: "Psiquiatria", available: false },
  { id: 4, name: "Dr. João Oliveira", specialty: "Clínica Geral", available: true },
  { id: 5, name: "Dra. Lucia Ferreira", specialty: "Dermatologia", available: true },
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

interface BookAppointmentProps {
  children: React.ReactNode
}

export function BookAppointment({ children }: BookAppointmentProps) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [consultationType, setConsultationType] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle appointment booking logic here
    console.log({
      date: selectedDate,
      doctor: selectedDoctor,
      time: selectedTime,
      type: appointmentType,
      consultationType,
      notes,
    })
    setOpen(false)
  }

  const selectedDoctorInfo = doctors.find((d) => d.id.toString() === selectedDoctor)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-900">Agendar Nova Consulta</DialogTitle>
          <DialogDescription>Preencha os dados abaixo para agendar sua consulta médica</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label htmlFor="doctor" className="text-emerald-900">
              Médico
            </Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger className="border-emerald-200">
                <SelectValue placeholder="Selecione um médico" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id.toString()} disabled={!doctor.available}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.specialty}</div>
                      </div>
                      {doctor.available ? (
                        <Badge className="bg-emerald-100 text-emerald-800 ml-2">Disponível</Badge>
                      ) : (
                        <Badge variant="secondary" className="ml-2">
                          Indisponível
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDoctorInfo && (
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <User className="h-4 w-4" />
                {selectedDoctorInfo.name} - {selectedDoctorInfo.specialty}
              </div>
            )}
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="text-emerald-900">Data da Consulta</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-emerald-200 bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="text-emerald-900">Horário</Label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className={selectedTime === time ? "" : "bg-transparent"}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div className="space-y-2">
            <Label className="text-emerald-900">Tipo de Consulta</Label>
            <Select value={appointmentType} onValueChange={setAppointmentType}>
              <SelectTrigger className="border-emerald-200">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="retorno">Retorno</SelectItem>
                <SelectItem value="checkup">Check-up</SelectItem>
                <SelectItem value="exame">Exame</SelectItem>
                <SelectItem value="terapia">Terapia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Consultation Mode */}
          <div className="space-y-2">
            <Label className="text-emerald-900">Modalidade</Label>
            <Select value={consultationType} onValueChange={setConsultationType}>
              <SelectTrigger className="border-emerald-200">
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presencial">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Presencial
                  </div>
                </SelectItem>
                <SelectItem value="telemedicina">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Telemedicina
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-emerald-900">
              Observações (opcional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Descreva brevemente o motivo da consulta ou observações importantes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border-emerald-200 focus:border-emerald-400"
              rows={3}
            />
          </div>

          {/* Summary */}
          {selectedDate && selectedDoctor && selectedTime && (
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2">Resumo da Consulta</h4>
              <div className="space-y-1 text-sm text-emerald-700">
                <div>Data: {format(selectedDate, "PPP", { locale: ptBR })}</div>
                <div>Horário: {selectedTime}</div>
                <div>Médico: {selectedDoctorInfo?.name}</div>
                <div>Especialidade: {selectedDoctorInfo?.specialty}</div>
                {appointmentType && <div>Tipo: {appointmentType}</div>}
                {consultationType && <div>Modalidade: {consultationType}</div>}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={!selectedDate || !selectedDoctor || !selectedTime}>
              Agendar Consulta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
