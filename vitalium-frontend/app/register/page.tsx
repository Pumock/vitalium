"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState("")
  const [step, setStep] = useState(1)

  const renderStepOne = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="userType">Tipo de usuário *</Label>
        <Select value={userType} onValueChange={setUserType}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu tipo de usuário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="patient">Paciente</SelectItem>
            <SelectItem value="doctor">Médico</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="secretary">Secretária</SelectItem>
            <SelectItem value="nurse">Enfermeira</SelectItem>
            <SelectItem value="caregiver">Cuidador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome *</Label>
          <Input id="firstName" placeholder="Seu nome" className="border-border" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome *</Label>
          <Input id="lastName" placeholder="Seu sobrenome" className="border-border" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" placeholder="seu@email.com" className="border-border" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone *</Label>
        <Input id="phone" type="tel" placeholder="(11) 99999-9999" className="border-border" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite uma senha segura"
            className="border-border pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            className="border-border pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={() => setStep(2)} disabled={!userType}>
        Continuar
      </Button>
    </CardContent>
  )

  const renderStepTwo = () => (
    <CardContent className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="mb-4 p-0 h-auto">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      {userType === "doctor" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="crm">CRM *</Label>
            <Input id="crm" placeholder="Digite seu CRM" className="border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidade *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione sua especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiologia</SelectItem>
                <SelectItem value="dermatology">Dermatologia</SelectItem>
                <SelectItem value="endocrinology">Endocrinologia</SelectItem>
                <SelectItem value="gastroenterology">Gastroenterologia</SelectItem>
                <SelectItem value="neurology">Neurologia</SelectItem>
                <SelectItem value="orthopedics">Ortopedia</SelectItem>
                <SelectItem value="pediatrics">Pediatria</SelectItem>
                <SelectItem value="psychiatry">Psiquiatria</SelectItem>
                <SelectItem value="other">Outra</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {userType === "patient" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de nascimento *</Label>
            <Input id="birthDate" type="date" className="border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gênero</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefiro não informar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Histórico médico</Label>
            <Textarea
              id="medicalHistory"
              placeholder="Descreva brevemente seu histórico médico, medicações em uso, alergias, etc."
              className="border-border min-h-[100px]"
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="address">Endereço</Label>
        <Input id="address" placeholder="Rua, número, bairro, cidade" className="border-border" />
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" id="terms" className="rounded border-border" />
        <Label htmlFor="terms" className="text-sm text-muted-foreground">
          Concordo com os{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Termos de Uso
          </Link>{" "}
          e{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Política de Privacidade
          </Link>
        </Label>
      </div>

      <Button className="w-full" size="lg">
        Criar conta
      </Button>
    </CardContent>
  )

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-foreground">Vitalium</span>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{step === 1 ? "Criar sua conta" : "Informações adicionais"}</CardTitle>
            <CardDescription>
              {step === 1 ? "Preencha os dados básicos para começar" : "Complete seu perfil para finalizar o cadastro"}
            </CardDescription>
          </CardHeader>

          {step === 1 ? renderStepOne() : renderStepTwo()}
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  )
}
