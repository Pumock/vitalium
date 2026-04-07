"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, FileText, Lock, Eye, AlertTriangle, CheckCircle, Clock, Download } from "lucide-react"

const complianceMetrics = [
  {
    category: "LGPD",
    score: 98,
    status: "compliant",
    lastAudit: "2024-01-15",
    nextAudit: "2024-07-15",
  },
  {
    category: "HIPAA",
    score: 96,
    status: "compliant",
    lastAudit: "2024-01-10",
    nextAudit: "2024-07-10",
  },
  {
    category: "ISO 27001",
    score: 94,
    status: "compliant",
    lastAudit: "2023-12-20",
    nextAudit: "2024-06-20",
  },
  {
    category: "SOC 2",
    score: 92,
    status: "compliant",
    lastAudit: "2024-01-05",
    nextAudit: "2024-07-05",
  },
]

const dataProtectionMetrics = [
  { metric: "Dados Criptografados", value: 100, target: 100 },
  { metric: "Backups Seguros", value: 100, target: 100 },
  { metric: "Controle de Acesso", value: 98, target: 95 },
  { metric: "Logs de Auditoria", value: 100, target: 100 },
  { metric: "Monitoramento 24/7", value: 99, target: 99 },
]

const recentAudits = [
  {
    date: "2024-01-15",
    type: "LGPD Compliance",
    result: "Aprovado",
    score: 98,
    auditor: "Auditoria Externa KPMG",
  },
  {
    date: "2024-01-10",
    type: "Security Assessment",
    result: "Aprovado",
    score: 96,
    auditor: "Pentest Interno",
  },
  {
    date: "2023-12-20",
    type: "ISO 27001 Review",
    result: "Aprovado",
    score: 94,
    auditor: "Bureau Veritas",
  },
]

const privacyRequests = [
  { type: "Acesso aos Dados", count: 23, resolved: 23, avgTime: "2.1 dias" },
  { type: "Correção de Dados", count: 8, resolved: 8, avgTime: "1.5 dias" },
  { type: "Exclusão de Dados", count: 5, resolved: 5, avgTime: "3.2 dias" },
  { type: "Portabilidade", count: 12, resolved: 12, avgTime: "2.8 dias" },
]

export function ComplianceReport() {
  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceMetrics.map((metric) => (
          <Card key={metric.category} className="border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {metric.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900">{metric.score}%</div>
              <Progress value={metric.score} className="mt-2" />
              <Badge
                className={
                  metric.status === "compliant"
                    ? "bg-emerald-100 text-emerald-800 mt-2"
                    : "bg-amber-100 text-amber-800 mt-2"
                }
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Conforme
              </Badge>
              <p className="text-xs text-emerald-600 mt-1">
                Próxima auditoria: {new Date(metric.nextAudit).toLocaleDateString("pt-BR")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Protection Metrics */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Proteção de Dados
          </CardTitle>
          <CardDescription>Métricas de segurança e proteção de dados pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataProtectionMetrics.map((metric) => (
              <div key={metric.metric} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-emerald-900">{metric.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-emerald-700">{metric.value}%</span>
                    {metric.value >= metric.target ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                </div>
                <Progress value={metric.value} className="h-2" />
                <p className="text-xs text-emerald-600">Meta: {metric.target}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Audits */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Auditorias Recentes
            </CardTitle>
            <CardDescription>Resultados das últimas avaliações de conformidade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAudits.map((audit, index) => (
                <div key={index} className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-emerald-900">{audit.type}</h4>
                      <p className="text-sm text-emerald-700">{audit.auditor}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">{audit.result}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-emerald-600">{new Date(audit.date).toLocaleDateString("pt-BR")}</span>
                    <span className="font-bold text-emerald-900">{audit.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Requests */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Solicitações de Privacidade
            </CardTitle>
            <CardDescription>Gestão de direitos dos titulares de dados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {privacyRequests.map((request) => (
                <div
                  key={request.type}
                  className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                >
                  <div>
                    <h4 className="font-medium text-emerald-900">{request.type}</h4>
                    <p className="text-sm text-emerald-700">
                      {request.resolved}/{request.count} resolvidas
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-900">{request.avgTime}</div>
                    <div className="text-xs text-emerald-600">tempo médio</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Actions */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Ações de Conformidade</CardTitle>
          <CardDescription>Próximas ações e recomendações para manter a conformidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                <h4 className="font-semibold text-emerald-900">Próximas Auditorias</h4>
              </div>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• ISO 27001 Review - 20/06/2024</li>
                <li>• SOC 2 Assessment - 05/07/2024</li>
                <li>• LGPD Compliance - 15/07/2024</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-amber-900">Ações Recomendadas</h4>
              </div>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Atualizar política de retenção de dados</li>
                <li>• Revisar contratos com fornecedores</li>
                <li>• Treinar equipe em novas regulamentações</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Relatório Completo
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              Certificados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
