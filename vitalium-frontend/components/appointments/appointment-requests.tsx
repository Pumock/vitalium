"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar, MessageCircle, Check, X } from "lucide-react"

const appointmentRequests = [
  {
    id: 1,
    patient: "Lucia Mendes",
    requestedDate: "2024-01-25",
    requestedTime: "14:00",
    type: "Consulta",
    mode: "presencial",
    reason: "Dores no peito e falta de ar",
    priority: "high",
    requestedAt: "2024-01-18T10:30:00",
  },
  {
    id: 2,
    patient: "Roberto Silva",
    requestedDate: "2024-01-26",
    requestedTime: "09:30",
    type: "Retorno",
    mode: "telemedicina",
    reason: "Acompanhamento pós-cirúrgico",
    priority: "medium",
    requestedAt: "2024-01-18T14:15:00",
  },
  {
    id: 3,
    patient: "Fernanda Costa",
    requestedDate: "2024-01-27",
    requestedTime: "16:00",
    type: "Check-up",
    mode: "presencial",
    reason: "Exames de rotina anuais",
    priority: "low",
    requestedAt: "2024-01-19T09:45:00",
  },
  {
    id: 4,
    patient: "Miguel Santos",
    requestedDate: "2024-01-28",
    requestedTime: "11:00",
    type: "Consulta",
    mode: "telemedicina",
    reason: "Renovação de receitas",
    priority: "medium",
    requestedAt: "2024-01-19T16:20:00",
  },
]

export function AppointmentRequests() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return priority
    }
  }

  const handleApprove = (requestId: number) => {
    console.log("Aprovando solicitação:", requestId)
    // Handle approval logic
  }

  const handleReject = (requestId: number) => {
    console.log("Rejeitando solicitação:", requestId)
    // Handle rejection logic
  }

  const handleReschedule = (requestId: number) => {
    console.log("Reagendando solicitação:", requestId)
    // Handle reschedule logic
  }

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Solicitações Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointmentRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 bg-white rounded-lg border border-emerald-200 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(request.priority)}>
                        Prioridade {getPriorityText(request.priority)}
                      </Badge>
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                        {request.type}
                      </Badge>
                      {request.mode === "telemedicina" && (
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          Online
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-emerald-600" />
                          <span className="font-medium text-emerald-900">{request.patient}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            {new Date(request.requestedDate).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm text-emerald-900">{request.requestedTime}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium text-emerald-900 mb-1">Motivo:</h4>
                          <p className="text-sm text-emerald-700">{request.reason}</p>
                        </div>
                        <div className="text-xs text-emerald-600">
                          Solicitado em: {new Date(request.requestedAt).toLocaleString("pt-BR")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 lg:min-w-fit">
                    <Button size="sm" onClick={() => handleApprove(request.id)} className="gap-2">
                      <Check className="h-4 w-4" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReschedule(request.id)}
                      className="gap-2 bg-transparent"
                    >
                      <Calendar className="h-4 w-4" />
                      Reagendar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(request.id)}
                      className="gap-2 bg-transparent text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                      Rejeitar
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <MessageCircle className="h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Check className="h-6 w-6" />
              Aprovar Todas
              <span className="text-xs text-gray-500">Prioridade baixa</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              Sugerir Horários
              <span className="text-xs text-gray-500">Alternativas</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <MessageCircle className="h-6 w-6" />
              Mensagem em Lote
              <span className="text-xs text-gray-500">Para pacientes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
