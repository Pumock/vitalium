"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, MoreVertical, UserCheck, UserX, Shield, Edit, Trash2, Plus, Filter, Download, Mail } from "lucide-react"
import { NewUserForm } from "./new-user-form-dialog"


export function UserManagement({ searchQuery }: any) {
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [open, setOpen] = useState(false);

  // Mock users data
  const users = [
    {
      id: "1",
      name: "Dr. João Santos",
      email: "joao.santos@email.com",
      phone: "(11) 99999-1234",
      role: "doctor",
      specialty: "Cardiologia",
      crm: "CRM 12345-SP",
      status: "active",
      lastLogin: "2024-01-24T08:00:00Z",
      registrationDate: "2024-01-01T00:00:00Z",
      patientsCount: 45,
      verified: true,
    },
    {
      id: "2",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 99999-5678",
      role: "patient",
      condition: "Hipertensão",
      status: "active",
      lastLogin: "2024-01-24T14:30:00Z",
      registrationDate: "2024-01-15T00:00:00Z",
      verified: true,
    },
    {
      id: "3",
      name: "Dr. Carlos Silva",
      email: "carlos.silva@email.com",
      phone: "(11) 99999-9999",
      role: "doctor",
      specialty: "Neurologia",
      crm: "CRM 67890-SP",
      status: "pending",
      lastLogin: null,
      registrationDate: "2024-01-24T10:00:00Z",
      patientsCount: 0,
      verified: false,
    },
    {
      id: "4",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 99999-4321",
      role: "patient",
      condition: "Diabetes",
      status: "active",
      lastLogin: "2024-01-23T16:45:00Z",
      registrationDate: "2024-01-10T00:00:00Z",
      verified: true,
    },
    {
      id: "5",
      name: "Enfermeira Paula",
      email: "paula.enfermeira@email.com",
      phone: "(11) 99999-8765",
      role: "nurse",
      department: "UTI",
      status: "active",
      lastLogin: "2024-01-24T07:30:00Z",
      registrationDate: "2024-01-05T00:00:00Z",
      verified: true,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const query = searchQuery ? searchQuery.toLowerCase() : "";

    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "doctor":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Médico</Badge>
      case "patient":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paciente</Badge>
      case "admin":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Admin</Badge>
      case "nurse":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Enfermeira</Badge>
        )
      case "secretary":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Secretária</Badge>
        )
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Ativo</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pendente</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Suspenso</Badge>
      case "inactive":
        return <Badge variant="outline">Inativo</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleApproveUser = (userId: string) => {
    console.log("Approving user:", userId)
    // Here you would update the user status
  }

  const handleSuspendUser = (userId: string) => {
    console.log("Suspending user:", userId)
    // Here you would suspend the user
  }

  const handleDeleteUser = (userId: string) => {
    console.log("Deleting user:", userId)
    // Here you would delete the user
  }

  return (
    <div className="space-y-6">
      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>Gerencie todos os usuários da plataforma</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
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
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="doctor">Médicos</SelectItem>
                <SelectItem value="patient">Pacientes</SelectItem>
                <SelectItem value="nurse">Enfermeiras</SelectItem>
                <SelectItem value="secretary">Secretárias</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="suspended">Suspensos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                      {user.verified && <Shield className="w-4 h-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                    <div className="flex items-center space-x-2">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {user.status === "pending" && (
                    <Button size="sm" onClick={() => handleApproveUser(user.id)}>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        <User className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Enviar Email
                      </DropdownMenuItem>
                      {user.status === "active" ? (
                        <DropdownMenuItem onClick={() => handleSuspendUser(user.id)} className="text-red-600">
                          <UserX className="w-4 h-4 mr-2" />
                          Suspender
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleApproveUser(user.id)}>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Ativar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="text-sm font-medium">{user.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cadastro</p>
                  <p className="text-sm font-medium">{new Date(user.registrationDate).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Último acesso</p>
                  <p className="text-sm font-medium">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("pt-BR") : "Nunca"}
                  </p>
                </div>
              </div>

              {user.role === "doctor" && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {user.specialty} • {user.crm}
                    </span>
                    <span className="font-medium">{user.patientsCount} pacientes</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum usuário encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou termo de busca.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
