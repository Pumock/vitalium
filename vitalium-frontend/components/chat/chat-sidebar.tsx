"use client"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Plus } from "lucide-react"

interface ChatSidebarProps {
  searchQuery: string
  selectedChat: string | null
  onSelectChat: (chatId: string) => void
  currentUser: {
    id: string
    name: string
    type: string
    avatar: string
  }
}

export function ChatSidebar({ searchQuery="", selectedChat, onSelectChat, currentUser }: ChatSidebarProps) {
  
  // Mock conversations data
  const conversations = [
    {
      id: "1",
      participant: {
        name: "Maria Silva",
        type: "patient",
        avatar: "MS",
        status: "online",
      },
      lastMessage: {
        text: "Obrigada pelas orientações, doutor!",
        time: "14:30",
        sender: "patient",
        unread: false,
      },
      unreadCount: 0,
      priority: "normal",
      condition: "Hipertensão",
    },
    {
      id: "2",
      participant: {
        name: "João Santos",
        type: "patient",
        avatar: "JS",
        status: "offline",
      },
      lastMessage: {
        text: "Posso remarcar a consulta de amanhã?",
        time: "13:45",
        sender: "patient",
        unread: true,
      },
      unreadCount: 2,
      priority: "normal",
      condition: "Diabetes",
    },
    {
      id: "3",
      participant: {
        name: "Ana Costa",
        type: "patient",
        avatar: "AC",
        status: "online",
      },
      lastMessage: {
        text: "URGENTE: Estou sentindo dores no peito",
        time: "12:20",
        sender: "patient",
        unread: true,
      },
      unreadCount: 1,
      priority: "urgent",
      condition: "Ansiedade",
    },
    {
      id: "4",
      participant: {
        name: "Pedro Oliveira",
        type: "patient",
        avatar: "PO",
        status: "away",
      },
      lastMessage: {
        text: "Você: Como está se sentindo hoje?",
        time: "11:15",
        sender: "doctor",
        unread: false,
      },
      unreadCount: 0,
      priority: "normal",
      condition: "Cardiopatia",
    },
    {
      id: "5",
      participant: {
        name: "Carla Mendes",
        type: "patient",
        avatar: "CM",
        status: "online",
      },
      lastMessage: {
        text: "Os exames chegaram, posso enviar?",
        time: "10:30",
        sender: "patient",
        unread: true,
      },
      unreadCount: 3,
      priority: "normal",
      condition: "Enxaqueca",
    },
  ]

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()  ),
  )

  const urgentConversations = filteredConversations.filter((conv) => conv.priority === "urgent")
  const normalConversations = filteredConversations.filter((conv) => conv.priority === "normal")

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

  const formatTime = (time: string) => {
    return time
  }

  const ConversationItem = ({ conversation }: { conversation: any }) => (
    <div
      className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
        selectedChat === conversation.id ? "bg-primary/10 border-r-2 border-primary" : ""
      }`}
      onClick={() => onSelectChat(conversation.id)}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {conversation.participant.avatar}
            </AvatarFallback>
          </Avatar>
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(
              conversation.participant.status,
            )}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground truncate">{conversation.participant.name}</h3>
            <div className="flex items-center space-x-2">
              {conversation.priority === "urgent" && <AlertTriangle className="w-4 h-4 text-red-500" />}
              <span className="text-xs text-muted-foreground">{formatTime(conversation.lastMessage.time)}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-1">{conversation.condition}</p>

          <div className="flex items-center justify-between">
            <p
              className={`text-sm truncate flex-1 ${
                conversation.lastMessage.unread ? "font-medium text-foreground" : "text-muted-foreground"
              }`}
            >
              {conversation.lastMessage.text}
            </p>
            {conversation.unreadCount > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground min-w-[20px] h-5 text-xs flex items-center justify-center">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Conversas</h2>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Nova
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="relative">
              Todas
              {filteredConversations.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {filteredConversations.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="urgent" className="relative">
              Urgentes
              {urgentConversations.length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {urgentConversations.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Não lidas
              {filteredConversations.filter((c) => c.unreadCount > 0).length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {filteredConversations.filter((c) => c.unreadCount > 0).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="space-y-1">
              {urgentConversations.map((conversation) => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))}
              {normalConversations.map((conversation) => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="urgent" className="mt-0">
            <div className="space-y-1">
              {urgentConversations.map((conversation) => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <div className="space-y-1">
              {filteredConversations
                .filter((c) => c.unreadCount > 0)
                .map((conversation) => (
                  <ConversationItem key={conversation.id} conversation={conversation} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
