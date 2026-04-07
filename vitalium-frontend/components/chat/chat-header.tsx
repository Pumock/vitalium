"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, Video, MoreVertical, Calendar, FileText, AlertTriangle, User, Clock } from "lucide-react"

interface ChatHeaderProps {
  chatId: string
  currentUser: {
    id: string
    name: string
    type: string
    avatar: string
  }
}

export function ChatHeader({ chatId, currentUser }: ChatHeaderProps) {
  // Mock participant data based on chatId
  const participants = {
    "1": {
      name: "Maria Silva",
      type: "patient",
      avatar: "MS",
      status: "online",
      condition: "Hipertensão",
      lastSeen: "Agora",
    },
    "2": {
      name: "João Santos",
      type: "patient",
      avatar: "JS",
      status: "offline",
      condition: "Diabetes",
      lastSeen: "2 horas atrás",
    },
    "3": {
      name: "Ana Costa",
      type: "patient",
      avatar: "AC",
      status: "online",
      condition: "Ansiedade",
      lastSeen: "Agora",
    },
  }

  const participant = participants[chatId as keyof typeof participants]

  if (!participant) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string, lastSeen: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "away":
        return "Ausente"
      case "offline":
        return `Visto por último ${lastSeen}`
      default:
        return lastSeen
    }
  }

  return (
    <div className="border-b border-border bg-card/50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{participant.avatar}</AvatarFallback>
          </Avatar>
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(
              participant.status,
            )}`}
          />
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-foreground">{participant.name}</h2>
            <Badge variant="outline" className="text-xs">
              {participant.condition}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{getStatusText(participant.status, participant.lastSeen)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Phone className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Video className="w-4 h-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Ver Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="w-4 h-4 mr-2" />
              Histórico Médico
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Consulta
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Clock className="w-4 h-4 mr-2" />
              Histórico de Mensagens
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Marcar como Urgente
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
