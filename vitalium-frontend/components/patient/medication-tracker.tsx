"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Pill, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react"

export function MedicationTracker() {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Losartana 50mg",
      dosage: "1 comprimido",
      frequency: "1x ao dia",
      time: "08:00",
      taken: true,
      nextDose: "Amanhã às 08:00",
    },
    {
      id: 2,
      name: "Metformina 850mg",
      dosage: "1 comprimido",
      frequency: "2x ao dia",
      time: "08:00, 20:00",
      taken: true,
      nextDose: "Hoje às 20:00",
    },
    {
      id: 3,
      name: "Sinvastatina 20mg",
      dosage: "1 comprimido",
      frequency: "1x ao dia",
      time: "22:00",
      taken: false,
      nextDose: "Hoje às 22:00",
    },
  ])

  const todayProgress = (medications.filter((med) => med.taken).length / medications.length) * 100

  const markAsTaken = (id: number) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, taken: true } : med)))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="w-5 h-5 text-primary" />
              <span>Controle de Medicações</span>
            </CardTitle>
            <CardDescription>Acompanhe suas medicações diárias</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Summary */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progresso de Hoje</span>
            <span className="text-sm text-muted-foreground">
              {medications.filter((med) => med.taken).length} de {medications.length} tomadas
            </span>
          </div>
          <Progress value={todayProgress} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            {todayProgress === 100
              ? "Parabéns! Todas as medicações foram tomadas hoje."
              : "Continue seguindo seu cronograma de medicações."}
          </p>
        </div>

        {/* Medications List */}
        <div className="space-y-4">
          {medications.map((medication) => (
            <div key={medication.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
              <div className="flex-shrink-0">
                {medication.taken ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Clock className="w-6 h-6 text-orange-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-foreground">{medication.name}</h3>
                  <Badge variant={medication.taken ? "default" : "secondary"}>
                    {medication.taken ? "Tomada" : "Pendente"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {medication.dosage} • {medication.frequency}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{medication.nextDose}</span>
                </div>
              </div>

              {!medication.taken && (
                <Button size="sm" onClick={() => markAsTaken(medication.id)} className="flex-shrink-0">
                  Marcar como Tomada
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Upcoming Reminders */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Próximos Lembretes</span>
          </div>
          <div className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
            <p>• Metformina às 20:00 (em 2 horas)</p>
            <p>• Sinvastatina às 22:00 (em 4 horas)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
