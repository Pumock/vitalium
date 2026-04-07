import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Users, Settings } from "lucide-react"
import { DoctorSchedule } from "@/components/appointments/doctor-schedule"
import { AppointmentRequests } from "@/components/appointments/appointment-requests"
import { AppLayout } from "@/components/app-layout"

export default function DoctorAppointmentsPage() {
  return (
    <AppLayout userRole="doctor">
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-emerald-900">Minha Agenda</h1>
              <p className="text-emerald-700 mt-1">Gerencie seus horários e consultas</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                Configurar Horários
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">8</div>
                <p className="text-xs text-emerald-600">Consultas agendadas</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Esta Semana</CardTitle>
                <Clock className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">42</div>
                <p className="text-xs text-emerald-600">Total de consultas</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Solicitações</CardTitle>
                <Users className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">5</div>
                <p className="text-xs text-emerald-600">Aguardando aprovação</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Taxa de Ocupação</CardTitle>
                <Clock className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">85%</div>
                <p className="text-xs text-emerald-600">Esta semana</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="schedule" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schedule" className="gap-2">
                <Calendar className="h-4 w-4" />
                Minha Agenda
              </TabsTrigger>
              <TabsTrigger value="requests" className="gap-2">
                <Users className="h-4 w-4" />
                Solicitações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule">
              <Suspense fallback={<div>Carregando agenda...</div>}>
                <DoctorSchedule />
              </Suspense>
            </TabsContent>

            <TabsContent value="requests">
              <Suspense fallback={<div>Carregando solicitações...</div>}>
                <AppointmentRequests />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}
