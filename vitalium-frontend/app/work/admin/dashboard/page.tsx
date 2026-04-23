import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, TrendingUp, Users, Activity, FileText, BarChart3 } from "lucide-react"
import { HealthTrendsReport } from "@/components/reports/health-trends-report"
import { PatientOutcomesReport } from "@/components/reports/patient-outcomes-report"
import { SystemAnalyticsReport } from "@/components/reports/system-analytics-report"
import { ComplianceReport } from "@/components/reports/compliance-report"
import { AppLayout } from "@/components/app-layout"

export default function ReportsPage() {
  return (
    <AppLayout userRole="admin">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios e Analytics</h1>
            <p className="text-muted-foreground mt-1">Insights abrangentes sobre saúde e desempenho do sistema</p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Últimos 7 dias</SelectItem>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="90days">Últimos 90 dias</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,847</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas Realizadas</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,234</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Adesão</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">94.2%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.1% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4.8/5</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +0.3 vs mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Reports */}
        <Tabs defaultValue="health-trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="health-trends" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Tendências de Saúde
            </TabsTrigger>
            <TabsTrigger value="patient-outcomes" className="gap-2">
              <Users className="h-4 w-4" />
              Resultados dos Pacientes
            </TabsTrigger>
            <TabsTrigger value="system-analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics do Sistema
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <FileText className="h-4 w-4" />
              Conformidade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="health-trends">
            <Suspense fallback={<div>Carregando relatório de tendências...</div>}>
              <HealthTrendsReport />
            </Suspense>
          </TabsContent>

          <TabsContent value="patient-outcomes">
            <Suspense fallback={<div>Carregando relatório de resultados...</div>}>
              <PatientOutcomesReport />
            </Suspense>
          </TabsContent>

          <TabsContent value="system-analytics">
            <Suspense fallback={<div>Carregando analytics do sistema...</div>}>
              <SystemAnalyticsReport />
            </Suspense>
          </TabsContent>

          <TabsContent value="compliance">
            <Suspense fallback={<div>Carregando relatório de conformidade...</div>}>
              <ComplianceReport />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
