"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, TrendingDown, Activity, Heart, Thermometer } from "lucide-react"

export function HealthMetrics() {
  // Mock data for charts
  const bloodPressureData = [
    { date: "01/01", systolic: 120, diastolic: 80 },
    { date: "02/01", systolic: 125, diastolic: 82 },
    { date: "03/01", systolic: 118, diastolic: 78 },
    { date: "04/01", systolic: 122, diastolic: 81 },
    { date: "05/01", systolic: 119, diastolic: 79 },
    { date: "06/01", systolic: 124, diastolic: 83 },
    { date: "07/01", systolic: 121, diastolic: 80 },
  ]

  const heartRateData = [
    { date: "01/01", bpm: 72 },
    { date: "02/01", bpm: 75 },
    { date: "03/01", bpm: 68 },
    { date: "04/01", bpm: 71 },
    { date: "05/01", bpm: 73 },
    { date: "06/01", bpm: 69 },
    { date: "07/01", bpm: 74 },
  ]

  const weightData = [
    { date: "01/01", weight: 70.2 },
    { date: "08/01", weight: 69.8 },
    { date: "15/01", weight: 69.5 },
    { date: "22/01", weight: 69.3 },
  ]

  const symptomsData = [
    { symptom: "Dor de cabeça", count: 3 },
    { symptom: "Fadiga", count: 5 },
    { symptom: "Ansiedade", count: 2 },
    { symptom: "Insônia", count: 4 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary" />
          <span>Métricas de Saúde</span>
        </CardTitle>
        <CardDescription>Acompanhe a evolução dos seus indicadores de saúde</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vitals" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vitals">Sinais Vitais</TabsTrigger>
            <TabsTrigger value="weight">Peso</TabsTrigger>
            <TabsTrigger value="symptoms">Sintomas</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>

          <TabsContent value="vitals" className="space-y-6">
            {/* Current Vitals Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Pressão Arterial</span>
                  </div>
                  <div className="text-2xl font-bold">121/80</div>
                  <div className="flex items-center space-x-1 text-sm">
                    <TrendingDown className="w-3 h-3 text-green-500" />
                    <span className="text-green-500">Normal</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Freq. Cardíaca</span>
                  </div>
                  <div className="text-2xl font-bold">74 bpm</div>
                  <div className="flex items-center space-x-1 text-sm">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-500">Normal</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Temperatura</span>
                  </div>
                  <div className="text-2xl font-bold">36.5°C</div>
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-green-500">Normal</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blood Pressure Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Pressão Arterial - Últimos 7 dias</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="systolic" stroke="#059669" strokeWidth={2} name="Sistólica" />
                    <Line type="monotone" dataKey="diastolic" stroke="#10b981" strokeWidth={2} name="Diastólica" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Heart Rate Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Frequência Cardíaca - Últimos 7 dias</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bpm" stroke="#3b82f6" strokeWidth={2} name="BPM" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weight" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Controle de Peso</h3>
                <p className="text-sm text-muted-foreground">Acompanhe a evolução do seu peso</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">69.3 kg</div>
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">-0.9 kg este mês</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#059669" strokeWidth={2} name="Peso (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sintomas Mais Frequentes - Últimos 30 dias</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={symptomsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="symptom" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tendências Positivas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Pressão arterial estabilizada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Redução de peso consistente</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Melhora na qualidade do sono</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pontos de Atenção</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Aumento na frequência de dores de cabeça</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Episódios de ansiedade</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recomendações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">Continue com a dieta atual</Badge>
                  <Badge variant="secondary">Mantenha exercícios regulares</Badge>
                  <Badge variant="outline">Considere técnicas de relaxamento</Badge>
                  <Badge variant="outline">Agende consulta para dores de cabeça</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
