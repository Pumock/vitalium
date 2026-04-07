"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Minus } from "lucide-react"

interface HealthLogFormProps {
  onClose: () => void
}

export function HealthLogForm({ onClose }: HealthLogFormProps) {
  const [painLevel, setPainLevel] = useState([0])
  const [energyLevel, setEnergyLevel] = useState([5])
  const [moodLevel, setMoodLevel] = useState([5])
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [customSymptom, setCustomSymptom] = useState("")

  const commonSymptoms = [
    "Dor de cabeça",
    "Febre",
    "Tosse",
    "Dor no peito",
    "Falta de ar",
    "Náusea",
    "Tontura",
    "Fadiga",
    "Dor nas costas",
    "Dor abdominal",
    "Insônia",
    "Ansiedade",
  ]

  const addSymptom = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom])
    }
  }

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom))
  }

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !symptoms.includes(customSymptom.trim())) {
      setSymptoms([...symptoms, customSymptom.trim()])
      setCustomSymptom("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit the health log data
    console.log({
      painLevel: painLevel[0],
      energyLevel: energyLevel[0],
      moodLevel: moodLevel[0],
      symptoms,
      date: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Registro Diário de Saúde</CardTitle>
            <CardDescription>Como você está se sentindo hoje?</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Pain Level */}
            <div className="space-y-3">
              <Label>Nível de Dor (0-10)</Label>
              <div className="px-3">
                <Slider value={painLevel} onValueChange={setPainLevel} max={10} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Sem dor</span>
                  <span className="font-medium">Nível: {painLevel[0]}</span>
                  <span>Dor extrema</span>
                </div>
              </div>
            </div>

            {/* Energy Level */}
            <div className="space-y-3">
              <Label>Nível de Energia (1-10)</Label>
              <div className="px-3">
                <Slider
                  value={energyLevel}
                  onValueChange={setEnergyLevel}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Muito baixa</span>
                  <span className="font-medium">Nível: {energyLevel[0]}</span>
                  <span>Muito alta</span>
                </div>
              </div>
            </div>

            {/* Mood Level */}
            <div className="space-y-3">
              <Label>Humor (1-10)</Label>
              <div className="px-3">
                <Slider value={moodLevel} onValueChange={setMoodLevel} min={1} max={10} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Muito triste</span>
                  <span className="font-medium">Nível: {moodLevel[0]}</span>
                  <span>Muito feliz</span>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-3">
              <Label>Sintomas</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonSymptoms.map((symptom) => (
                  <Button
                    key={symptom}
                    type="button"
                    variant={symptoms.includes(symptom) ? "default" : "outline"}
                    size="sm"
                    onClick={() => (symptoms.includes(symptom) ? removeSymptom(symptom) : addSymptom(symptom))}
                    className="justify-start"
                  >
                    {symptoms.includes(symptom) ? (
                      <Minus className="w-3 h-3 mr-1" />
                    ) : (
                      <Plus className="w-3 h-3 mr-1" />
                    )}
                    {symptom}
                  </Button>
                ))}
              </div>

              {/* Custom Symptom */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Adicionar sintoma personalizado"
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSymptom())}
                />
                <Button type="button" onClick={addCustomSymptom} disabled={!customSymptom.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Selected Symptoms */}
              {symptoms.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeSymptom(symptom)}
                    >
                      {symptom}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Vital Signs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Pressão Arterial</Label>
                <Input id="bloodPressure" placeholder="120/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Frequência Cardíaca</Label>
                <Input id="heartRate" placeholder="72 bpm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperatura</Label>
                <Input id="temperature" placeholder="36.5°C" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso</Label>
                <Input id="weight" placeholder="70 kg" />
              </div>
            </div>

            {/* Sleep Quality */}
            <div className="space-y-2">
              <Label htmlFor="sleepQuality">Qualidade do Sono</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Como foi seu sono?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excelente</SelectItem>
                  <SelectItem value="good">Bom</SelectItem>
                  <SelectItem value="fair">Regular</SelectItem>
                  <SelectItem value="poor">Ruim</SelectItem>
                  <SelectItem value="terrible">Péssimo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Observações Adicionais</Label>
              <Textarea
                id="notes"
                placeholder="Descreva como você está se sentindo, medicações tomadas, atividades realizadas, etc."
                className="min-h-[100px]"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1">
                Salvar Registro
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
