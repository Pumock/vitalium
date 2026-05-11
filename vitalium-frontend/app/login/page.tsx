"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { LoginService } from "@/services/api/auth/Login"
import { persistAuthSession } from "@/services/auth/session"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const router = useRouter()

  const handleLogin = async () => {
    try {
      setIsSubmitting(true)
      setErrorMessage(null)

      const response = await LoginService.login({
        email,
        password,
      })

      if (userType && response.user.role.toLowerCase() !== userType) {
        setErrorMessage("O tipo de usuário selecionado não corresponde à conta informada.")
        return
      }

      persistAuthSession(response)

      switch (response.user.role) {
        case "ADMIN":
          router.push("/work/admin/users")
          break
        default:
          router.push("/")
          break
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message ?? "Não foi possível realizar o login.")
      } else {
        setErrorMessage("Não foi possível realizar o login.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-foreground">Vitalium</span>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
            <CardDescription>Acesse sua conta para continuar usando a plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de usuário</Label>
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

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="border-border"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="border-border pr-10"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-border" />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Lembrar de mim
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full"
              size="lg"
              disabled={isSubmitting || !email || !password}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              O acesso é liberado pela administração da plataforma.
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            Ao entrar, você concorda com nossos{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
