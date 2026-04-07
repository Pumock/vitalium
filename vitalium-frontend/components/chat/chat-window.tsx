"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Send,
  Paperclip,
  Smile,
  Calendar,
  AlertTriangle,
  FileText,
  ImageIcon,
  Camera,
  Mic,
  MoreVertical,
  Check,
  CheckCheck,
} from "lucide-react"

interface ChatWindowProps {
  chatId: string
  currentUser: {
    id: string
    name: string
    type: string
    avatar: string
  }
}

export function ChatWindow({ chatId, currentUser }: ChatWindowProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock messages data
  const mockMessages = {
    "1": [
      {
        id: "1",
        text: "Bom dia, Dra. Como está?",
        sender: "patient",
        timestamp: "2024-01-24T09:00:00Z",
        status: "read",
        type: "text",
      },
      {
        id: "2",
        text: "Bom dia, Maria! Estou bem, obrigado. Como você está se sentindo hoje?",
        sender: "doctor",
        timestamp: "2024-01-24T09:02:00Z",
        status: "read",
        type: "text",
      },
      {
        id: "3",
        text: "Estou me sentindo melhor. A pressão está mais controlada.",
        sender: "patient",
        timestamp: "2024-01-24T09:05:00Z",
        status: "read",
        type: "text",
      },
      {
        id: "4",
        text: "Que ótima notícia! Continue tomando a medicação conforme prescrito. Você tem medido a pressão regularmente?",
        sender: "doctor",
        timestamp: "2024-01-24T09:07:00Z",
        status: "read",
        type: "text",
      },
      {
        id: "5",
        text: "Sim, todos os dias pela manhã. Aqui estão os últimos resultados:",
        sender: "patient",
        timestamp: "2024-01-24T09:10:00Z",
        status: "read",
        type: "text",
      },
      {
        id: "6",
        text: "pressao_arterial.jpg",
        sender: "patient",
        timestamp: "2024-01-24T09:10:30Z",
        status: "read",
        type: "image",
        fileName: "Medições de Pressão - Janeiro 2024",
      },
      {
        id: "7",
        text: "Excelente! Os valores estão dentro do esperado. Continue assim!",
        sender: "doctor",
        timestamp: "2024-01-24T09:15:00Z",
        status: "read",
        type: "text",
      },
      {
        id: "8",
        text: "Obrigada pelas orientações, doutor!",
        sender: "patient",
        timestamp: "2024-01-24T14:30:00Z",
        status: "delivered",
        type: "text",
      },
    ],
    "3": [
      {
        id: "1",
        text: "URGENTE: Estou sentindo dores no peito",
        sender: "patient",
        timestamp: "2024-01-24T12:20:00Z",
        status: "delivered",
        type: "text",
        priority: "urgent",
      },
    ],
  }

  useEffect(() => {
    setMessages(mockMessages[chatId as keyof typeof mockMessages] || [])
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: currentUser.type,
      timestamp: new Date().toISOString(),
      status: "sent",
      type: "text",
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="w-3 h-3 text-primary" />
      default:
        return null
    }
  }

  const MessageBubble = ({ msg }: { msg: any }) => {
    const isCurrentUser = msg.sender === currentUser.type
    const isUrgent = msg.priority === "urgent"

    return (
      <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
        <div
          className={`flex items-end space-x-2 max-w-[70%] ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
        >
          {!isCurrentUser && (
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                {msg.sender === "patient" ? "P" : "D"}
              </AvatarFallback>
            </Avatar>
          )}

          <div
            className={`rounded-lg px-4 py-2 ${
              isCurrentUser
                ? "bg-primary text-primary-foreground"
                : isUrgent
                  ? "bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  : "bg-muted"
            }`}
          >
            {isUrgent && (
              <div className="flex items-center space-x-1 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <Badge variant="destructive" className="text-xs">
                  URGENTE
                </Badge>
              </div>
            )}

            {msg.type === "image" ? (
              <div className="space-y-2">
                <div className="w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm">{msg.fileName}</p>
              </div>
            ) : (
              <p className="text-sm">{msg.text}</p>
            )}

            <div
              className={`flex items-center justify-end space-x-1 mt-1 ${isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}
            >
              <span className="text-xs">{formatTime(msg.timestamp)}</span>
              {isCurrentUser && getMessageStatusIcon(msg.status)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <FileText className="w-4 h-4 mr-2" />
                Documento
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ImageIcon className="w-4 h-4 mr-2" />
                Imagem
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Camera className="w-4 h-4 mr-2" />
                Câmera
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consulta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1 relative">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button variant="ghost" size="sm">
                <Smile className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-red-600">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Marcar como Urgente
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consulta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Consulta
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Solicitar Exames
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Urgente
          </Button>
        </div>
      </div>
    </div>
  )
}
