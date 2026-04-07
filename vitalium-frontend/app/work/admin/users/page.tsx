"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  MoreVertical,
  Download,
  Eye,
  Plus,
  Edit,
  Ban,
  CheckCircle,
  Users,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react"
import { NewUserForm } from "@/components/admin/new-user-form-dialog"

// Mock data - em produção viria de uma API
const mockUsers = [
  {
    id: 1,
    name: "Dr. Ana Silva",
    email: "ana.silva@vitalium.com",
    role: "doctor",
    status: "active",
    avatar: "/caring-doctor.png",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
    patients: 45,
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao.santos@email.com",
    role: "patient",
    status: "active",
    avatar: "/patient-consultation.png",
    createdAt: "2024-01-18",
    lastLogin: "2024-01-21",
    appointments: 3,
  },
  {
    id: 3,
    name: "Maria Oliveira",
    email: "maria.oliveira@vitalium.com",
    role: "nurse",
    status: "pending",
    avatar: "/diverse-nurses-team.png",
    createdAt: "2024-01-20",
    lastLogin: null,
    department: "Cardiologia",
  },
  {
    id: 4,
    name: "Carlos Admin",
    email: "carlos@vitalium.com",
    role: "admin",
    status: "active",
    avatar: "/admin-interface.png",
    createdAt: "2024-01-10",
    lastLogin: "2024-01-21",
    permissions: "full",
  },
  {
    id: 5,
    name: "Lucia Secretária",
    email: "lucia@vitalium.com",
    role: "secretary",
    status: "inactive",
    avatar: "/professional-secretary.png",
    createdAt: "2024-01-12",
    lastLogin: "2024-01-19",
    department: "Recepção",
  },
]

const roleLabels = {
  patient: "Paciente",
  doctor: "Médico",
  admin: "Administrador",
  secretary: "Secretária",
  nurse: "Enfermeira",
  caregiver: "Cuidador",
}

const statusLabels = {
  active: "Ativo",
  inactive: "Inativo",
  pending: "Pendente",
  suspended: "Suspenso",
}

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  suspended: "bg-red-100 text-red-800 border-red-200",
}

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [open, setOpen] = useState(false);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    pending: mockUsers.filter((u) => u.status === "pending").length,
    inactive: mockUsers.filter((u) => u.status === "inactive").length,
  }

  return (
    <AppLayout userRole="admin">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Gerenciar Usuários</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Visualize e gerencie todos os usuários da plataforma
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <NewUserForm onClose={() => setOpen(false)}/>
              </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-lg sm:text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Ativos</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pendentes</p>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-2">
                <UserX className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Inativos</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-600">{stats.inactive}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="patient">Pacientes</SelectItem>
                    <SelectItem value="doctor">Médicos</SelectItem>
                    <SelectItem value="admin">Administradores</SelectItem>
                    <SelectItem value="secretary">Secretárias</SelectItem>
                    <SelectItem value="nurse">Enfermeiras</SelectItem>
                    <SelectItem value="caregiver">Cuidadores</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                    <SelectItem value="suspended">Suspensos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Usuários ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 sm:p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 flex-1">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {roleLabels[user.role as keyof typeof roleLabels]}
                          </Badge>
                          <Badge className={`text-xs ${statusColors[user.status as keyof typeof statusColors]}`}>
                            {statusLabels[user.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info - Hidden on mobile */}
                    <div className="hidden lg:flex flex-col text-right text-sm text-muted-foreground">
                      <p>Cadastro: {new Date(user.createdAt).toLocaleDateString("pt-BR")}</p>
                      <p>
                        Último acesso: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("pt-BR") : "Nunca"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      <div className="flex sm:hidden text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="h-4 w-4 mr-2" />
                              Desativar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Ativar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Nenhum usuário encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar os filtros ou termo de busca</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
