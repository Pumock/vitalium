"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { ChatHeader } from "@/components/chat/chat-header"
import { AppLayout } from "@/components/app-layout"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1")

  // Mock user data - would come from auth context
  const currentUser = {
    id: "user1",
    name: "Dr. João Santos",
    type: "doctor",
    avatar: "JS",
  }

  return (
    <AppLayout userRole={currentUser.type} showSidebar={true}>
      <div className="h-screen bg-background flex flex-col">
        {/* Main Chat Interface */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="h-fukk w-80 border-r border-border flex-shrink-0">
            <ChatSidebar searchQuery="" selectedChat={selectedChat} onSelectChat={setSelectedChat} currentUser={currentUser} />
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                <ChatHeader chatId={selectedChat} currentUser={currentUser} />
                <ChatWindow chatId={selectedChat} currentUser={currentUser} />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Selecione uma conversa</h3>
                  <p className="text-muted-foreground">Escolha uma conversa para começar a trocar mensagens</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
