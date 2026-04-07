"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, AlertTriangle } from "lucide-react"

const healthTrendsData = [
  { month: "Jan", bloodPressure: 125, heartRate: 72, weight: 70, satisfaction: 4.2 },
  { month: "Fev", bloodPressure: 123, heartRate: 74, weight: 69.5, satisfaction: 4.3 },
  { month: "Mar", bloodPressure: 121, heartRate: 73, weight: 69, satisfaction: 4.5 },
  { month: "Abr", bloodPressure: 119, heartRate: 71, weight: 68.5, satisfaction: 4.6 },
  { month: "Mai", bloodPressure: 118, heartRate: 70, weight: 68, satisfaction: 4.7 },
  { month: "Jun", bloodPressure: 116, heartRate: 69, weight: 67.5, satisfaction: 4.8 },
]

const symptomData = [
  { name: "Dor de Cabeça", value: 35, color: "#ef4444" },
  { name: "Fadiga", value: 28, color: "#f97316" },
  { name: "Ansiedade", value: 22, color: "#eab308" },
  { name: "Insônia", value: 15, color: "#10b981" },
]

const medicationAdherence = [
  { medication: "Hipertensão", adherence: 94 },
  { medication: "Diabetes", adherence: 89 },
  { medication: "Colesterol", adherence: 92 },
  { medication: "Ansiedade", adherence: 87 },
]

export function HealthTrendsReport() {
  return (
    <div className="space-y-6">
      {/* Health Metrics Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendências de Sinais Vitais
            </CardTitle>
            <CardDescription>Evolução dos principais indicadores de saúde</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthTrendsData}>
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
                <Line
                  type="monotone"
                  dataKey="bloodPressure"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Pressão Arterial"
                />
                <Line type="monotone" dataKey="heartRate" stroke="#059669" strokeWidth={2} name="Frequência Cardíaca" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Distribuição de Sintomas</CardTitle>
            <CardDescription>Sintomas mais reportados pelos pacientes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={symptomData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {symptomData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Medication Adherence */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Adesão à Medicação</CardTitle>
          <CardDescription>Taxa de adesão por categoria de medicamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicationAdherence.map((med) => (
              <div key={med.medication} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-emerald-900">{med.medication}</span>
                  <Badge
                    variant={med.adherence >= 90 ? "default" : "secondary"}
                    className="bg-emerald-100 text-emerald-800"
                  >
                    {med.adherence}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {med.adherence >= 90 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                  <div className="w-32 bg-emerald-100 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${med.adherence}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Insights Principais</CardTitle>
          <CardDescription>Análises e recomendações baseadas nos dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <h4 className="font-semibold text-emerald-900">Melhoria Geral</h4>
              </div>
              <p className="text-sm text-emerald-700">
                Pressão arterial média reduziu 7% nos últimos 6 meses, indicando melhoria significativa no controle da
                hipertensão.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-amber-900">Atenção Necessária</h4>
              </div>
              <p className="text-sm text-amber-700">
                Aumento de 15% nos relatos de ansiedade. Recomenda-se intensificar o acompanhamento psicológico.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
