"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Award, Target, Clock, CheckCircle } from "lucide-react"

const outcomeData = [
  { condition: "Hipertensão", improved: 78, stable: 18, declined: 4 },
  { condition: "Diabetes", improved: 65, stable: 28, declined: 7 },
  { condition: "Obesidade", improved: 52, stable: 35, declined: 13 },
  { condition: "Ansiedade", improved: 71, stable: 22, declined: 7 },
]

const recoveryTimes = [
  { month: "Jan", avgDays: 14, targetDays: 12 },
  { month: "Fev", avgDays: 13, targetDays: 12 },
  { month: "Mar", avgDays: 12, targetDays: 12 },
  { month: "Abr", avgDays: 11, targetDays: 12 },
  { month: "Mai", avgDays: 10, targetDays: 12 },
  { month: "Jun", avgDays: 9, targetDays: 12 },
]

const topPerformingDoctors = [
  { name: "Dr. Ana Silva", specialty: "Cardiologia", satisfaction: 4.9, patients: 156 },
  { name: "Dr. Carlos Santos", specialty: "Endocrinologia", satisfaction: 4.8, patients: 142 },
  { name: "Dra. Maria Costa", specialty: "Psiquiatria", satisfaction: 4.7, patients: 128 },
  { name: "Dr. João Oliveira", specialty: "Clínica Geral", satisfaction: 4.6, patients: 189 },
]

export function PatientOutcomesReport() {
  return (
    <div className="space-y-6">
      {/* Outcome Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Taxa de Melhoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">68.5%</div>
            <Progress value={68.5} className="mt-2" />
            <p className="text-xs text-emerald-600 mt-1">+5.2% vs período anterior</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Tempo Médio de Recuperação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">9.2 dias</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-emerald-600 mt-1">-2.8 dias vs período anterior</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Readmissões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">3.2%</div>
            <Progress value={15} className="mt-2" />
            <p className="text-xs text-emerald-600 mt-1">-1.1% vs período anterior</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Satisfação Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">4.7/5</div>
            <Progress value={94} className="mt-2" />
            <p className="text-xs text-emerald-600 mt-1">+0.3 vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Outcomes by Condition */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Resultados por Condição
          </CardTitle>
          <CardDescription>Distribuição de melhoria, estabilidade e declínio por condição médica</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={outcomeData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis type="number" stroke="#065f46" />
              <YAxis dataKey="condition" type="category" stroke="#065f46" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #10b981",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="improved" stackId="a" fill="#10b981" name="Melhorou" />
              <Bar dataKey="stable" stackId="a" fill="#fbbf24" name="Estável" />
              <Bar dataKey="declined" stackId="a" fill="#ef4444" name="Piorou" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recovery Times */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Tempo de Recuperação
          </CardTitle>
          <CardDescription>Evolução do tempo médio de recuperação vs meta estabelecida</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recoveryTimes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="month" stroke="#065f46" />
              <YAxis stroke="#065f46" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #10b981",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="avgDays" stroke="#10b981" strokeWidth={2} name="Tempo Médio (dias)" />
              <Line
                type="monotone"
                dataKey="targetDays"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Meta (dias)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performing Doctors */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Médicos com Melhor Performance
          </CardTitle>
          <CardDescription>Ranking baseado em satisfação do paciente e resultados clínicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformingDoctors.map((doctor, index) => (
              <div
                key={doctor.name}
                className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-900">{doctor.name}</h4>
                    <p className="text-sm text-emerald-700">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-900">{doctor.satisfaction}</div>
                    <div className="text-xs text-emerald-600">Satisfação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-900">{doctor.patients}</div>
                    <div className="text-xs text-emerald-600">Pacientes</div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Excelente
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
