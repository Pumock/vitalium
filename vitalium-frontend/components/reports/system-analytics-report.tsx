"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Activity, Server, Smartphone } from "lucide-react"

const usageData = [
  { time: "00:00", users: 45, messages: 12, appointments: 2 },
  { time: "06:00", users: 123, messages: 34, appointments: 8 },
  { time: "12:00", users: 456, messages: 89, appointments: 23 },
  { time: "18:00", users: 678, messages: 156, appointments: 34 },
  { time: "24:00", users: 234, messages: 67, appointments: 12 },
]

const deviceData = [
  { name: "Mobile", value: 65, color: "#10b981" },
  { name: "Desktop", value: 25, color: "#059669" },
  { name: "Tablet", value: 10, color: "#047857" },
]

const featureUsage = [
  { feature: "Chat", usage: 89, growth: 12 },
  { feature: "Agendamentos", usage: 76, growth: 8 },
  { feature: "Relatórios de Saúde", usage: 68, growth: 15 },
  { feature: "Medicamentos", usage: 82, growth: 5 },
  { feature: "Consultas", usage: 94, growth: 3 },
]

const systemHealth = [
  { metric: "Uptime", value: 99.9, status: "excellent" },
  { metric: "Response Time", value: 245, status: "good", unit: "ms" },
  { metric: "Error Rate", value: 0.02, status: "excellent", unit: "%" },
  { metric: "CPU Usage", value: 45, status: "good", unit: "%" },
  { metric: "Memory Usage", value: 62, status: "good", unit: "%" },
]

export function SystemAnalyticsReport() {
  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {systemHealth.map((metric) => (
          <Card key={metric.metric} className="border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900">
                {metric.value}
                {metric.unit || ""}
              </div>
              <Badge
                variant={metric.status === "excellent" ? "default" : "secondary"}
                className={
                  metric.status === "excellent" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }
              >
                {metric.status === "excellent" ? "Excelente" : "Bom"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Patterns */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Padrões de Uso do Sistema
          </CardTitle>
          <CardDescription>Atividade de usuários, mensagens e agendamentos ao longo do dia</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="time" stroke="#065f46" />
              <YAxis stroke="#065f46" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #10b981",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="Usuários Ativos"
              />
              <Area
                type="monotone"
                dataKey="messages"
                stackId="2"
                stroke="#059669"
                fill="#059669"
                fillOpacity={0.6}
                name="Mensagens"
              />
              <Area
                type="monotone"
                dataKey="appointments"
                stackId="3"
                stroke="#047857"
                fill="#047857"
                fillOpacity={0.6}
                name="Agendamentos"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Distribution */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Distribuição por Dispositivo
            </CardTitle>
            <CardDescription>Como os usuários acessam a plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {deviceData.map((device) => (
                <div key={device.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                  <span className="text-sm text-emerald-700">{device.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Usage */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Uso de Funcionalidades</CardTitle>
            <CardDescription>Adoção e crescimento das principais features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureUsage.map((feature) => (
                <div key={feature.feature} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-emerald-900">{feature.feature}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-emerald-700 border-emerald-300">
                        +{feature.growth}%
                      </Badge>
                      <span className="text-sm text-emerald-700">{feature.usage}%</span>
                    </div>
                  </div>
                  <Progress value={feature.usage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <Server className="h-5 w-5" />
            Métricas de Performance
          </CardTitle>
          <CardDescription>Indicadores técnicos de saúde do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-900">2.3s</div>
              <div className="text-sm text-emerald-700">Tempo de Carregamento</div>
              <div className="text-xs text-emerald-600 mt-1">-0.5s vs mês anterior</div>
            </div>

            <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-900">99.97%</div>
              <div className="text-sm text-emerald-700">Disponibilidade</div>
              <div className="text-xs text-emerald-600 mt-1">+0.02% vs mês anterior</div>
            </div>

            <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-900">1.2M</div>
              <div className="text-sm text-emerald-700">Requests/dia</div>
              <div className="text-xs text-emerald-600 mt-1">+15% vs mês anterior</div>
            </div>

            <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-900">0.01%</div>
              <div className="text-sm text-emerald-700">Taxa de Erro</div>
              <div className="text-xs text-emerald-600 mt-1">-0.02% vs mês anterior</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
