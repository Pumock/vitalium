"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AppLayout } from "@/components/app-layout"
import { User, Bell, Shield, Palette, Stethoscope, Heart, Camera, Save, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  // Mock user data - in real app, this would come from auth context
  const [currentUser] = useState({
    id: "1",
    name: "Dr. João Santos",
    email: "joao.santos@vitalium.com",
    role: "doctor", // patient, doctor, admin
    specialty: "Cardiologia",
    crm: "12345-SP",
    phone: "(11) 99999-9999",
    avatar: "JS",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Profile settings
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    bio: "Cardiologista com 15 anos de experiência em medicina preventiva e tratamento de doenças cardiovasculares.",

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    chatNotifications: true,
    emergencyAlerts: true,

    // Privacy settings
    profileVisibility: "colleagues", // public, colleagues, private
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareHealthData: false,

    // Security settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeout: 30,

    // Appearance settings
    theme: "system", // light, dark, system
    language: "pt-BR",
    timezone: "America/Sao_Paulo",

    // Doctor-specific settings
    consultationDuration: 30,
    autoAcceptAppointments: false,
    workingHours: {
      start: "08:00",
      end: "18:00",
    },

    // Patient-specific settings
    shareDataWithDoctors: true,
    reminderFrequency: "daily",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Here you would save the settings to your backend
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "doctor":
        return <Stethoscope className="w-4 h-4" />
      case "patient":
        return <Heart className="w-4 h-4" />
      case "admin":
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "doctor":
        return "Médico"
      case "patient":
        return "Paciente"
      case "admin":
        return "Administrador"
      default:
        return "Usuário"
    }
  }

  return (
    <AppLayout userRole={currentUser.role}>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Configurações</h1>
              <p className="text-muted-foreground mt-1">Gerencie suas preferências e configurações da conta</p>
            </div>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
            <TabsTrigger value="profile" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-3">
              <User className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-3">
              <Bell className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-3">
              <Eye className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Privacidade</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-3">
              <Shield className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-3">
              <Palette className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Aparência</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Informações do Perfil</span>
                </CardTitle>
                <CardDescription>Atualize suas informações pessoais e profissionais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                        {currentUser.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-transparent"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        {getRoleIcon(currentUser.role)}
                        <span>{getRoleLabel(currentUser.role)}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                    {currentUser.role === "doctor" && (
                      <p className="text-sm text-muted-foreground">
                        {currentUser.specialty} • CRM: {currentUser.crm}
                      </p>
                    )}
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => handleSettingChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => handleSettingChange("phone", e.target.value)}
                    />
                  </div>
                  {currentUser.role === "doctor" && (
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidade</Label>
                      <Input id="specialty" value={currentUser.specialty} readOnly className="bg-muted" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => handleSettingChange("bio", e.target.value)}
                    rows={3}
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <span>Preferências de Notificação</span>
                </CardTitle>
                <CardDescription>Configure como e quando você deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">Receber notificações importantes por email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">Notificações em tempo real no navegador</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <Label>Notificações por SMS</Label>
                      <p className="text-sm text-muted-foreground">Alertas críticos por mensagem de texto</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <Label>Lembretes de Consulta</Label>
                      <p className="text-sm text-muted-foreground">Receber lembretes antes das consultas</p>
                    </div>
                    <Switch
                      checked={settings.appointmentReminders}
                      onCheckedChange={(checked) => handleSettingChange("appointmentReminders", checked)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <Label>Notificações de Chat</Label>
                      <p className="text-sm text-muted-foreground">Novas mensagens no chat</p>
                    </div>
                    <Switch
                      checked={settings.chatNotifications}
                      onCheckedChange={(checked) => handleSettingChange("chatNotifications", checked)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <Label>Alertas de Emergência</Label>
                      <p className="text-sm text-muted-foreground">Notificações críticas de saúde</p>
                    </div>
                    <Switch
                      checked={settings.emergencyAlerts}
                      onCheckedChange={(checked) => handleSettingChange("emergencyAlerts", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <span>Configurações de Privacidade</span>
                </CardTitle>
                <CardDescription>
                  Controle quem pode ver suas informações e como elas são compartilhadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">Visibilidade do Perfil</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => handleSettingChange("profileVisibility", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Público</SelectItem>
                        <SelectItem value="colleagues">Apenas Colegas</SelectItem>
                        <SelectItem value="private">Privado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <Label>Mostrar Status Online</Label>
                      <p className="text-sm text-muted-foreground">Outros usuários podem ver quando você está online</p>
                    </div>
                    <Switch
                      checked={settings.showOnlineStatus}
                      onCheckedChange={(checked) => handleSettingChange("showOnlineStatus", checked)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <Label>Permitir Mensagens Diretas</Label>
                      <p className="text-sm text-muted-foreground">Outros usuários podem enviar mensagens privadas</p>
                    </div>
                    <Switch
                      checked={settings.allowDirectMessages}
                      onCheckedChange={(checked) => handleSettingChange("allowDirectMessages", checked)}
                    />
                  </div>

                  {currentUser.role === "patient" && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="space-y-1">
                        <Label>Compartilhar Dados de Saúde</Label>
                        <p className="text-sm text-muted-foreground">Permitir compartilhamento para pesquisa médica</p>
                      </div>
                      <Switch
                        checked={settings.shareHealthData}
                        onCheckedChange={(checked) => handleSettingChange("shareHealthData", checked)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Configurações de Segurança</span>
                </CardTitle>
                <CardDescription>Mantenha sua conta segura com essas configurações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Alterar Senha</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={settings.currentPassword}
                          onChange={(e) => handleSettingChange("currentPassword", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={settings.newPassword}
                          onChange={(e) => handleSettingChange("newPassword", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={settings.confirmPassword}
                          onChange={(e) => handleSettingChange("confirmPassword", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two Factor Authentication */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="space-y-1">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorEnabled", checked)}
                  />
                </div>

                {/* Session Timeout */}
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                  <Select
                    value={settings.sessionTimeout.toString()}
                    onValueChange={(value) => handleSettingChange("sessionTimeout", Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                      <SelectItem value="480">8 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <span>Configurações de Aparência</span>
                </CardTitle>
                <CardDescription>Personalize a aparência da plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Doctor-specific settings */}
                {currentUser.role === "doctor" && (
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-sm font-medium">Configurações Profissionais</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="consultationDuration">Duração da Consulta (minutos)</Label>
                        <Select
                          value={settings.consultationDuration.toString()}
                          onValueChange={(value) => handleSettingChange("consultationDuration", Number.parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutos</SelectItem>
                            <SelectItem value="30">30 minutos</SelectItem>
                            <SelectItem value="45">45 minutos</SelectItem>
                            <SelectItem value="60">1 hora</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="space-y-1">
                        <Label>Auto-aceitar Agendamentos</Label>
                        <p className="text-sm text-muted-foreground">Aceitar automaticamente novos agendamentos</p>
                      </div>
                      <Switch
                        checked={settings.autoAcceptAppointments}
                        onCheckedChange={(checked) => handleSettingChange("autoAcceptAppointments", checked)}
                      />
                    </div>
                  </div>
                )}

                {/* Patient-specific settings */}
                {currentUser.role === "patient" && (
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-sm font-medium">Configurações de Saúde</h4>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="space-y-1">
                        <Label>Compartilhar Dados com Médicos</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que médicos vejam seu histórico de saúde
                        </p>
                      </div>
                      <Switch
                        checked={settings.shareDataWithDoctors}
                        onCheckedChange={(checked) => handleSettingChange("shareDataWithDoctors", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reminderFrequency">Frequência de Lembretes</Label>
                      <Select
                        value={settings.reminderFrequency}
                        onValueChange={(value) => handleSettingChange("reminderFrequency", value)}
                      >
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diário</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
