'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Users, Clock } from 'lucide-react'
import { cn, formatRelativeTime } from '@/lib/utils'

interface ChatPreviewProps {
  room: string
  className?: string
}

interface ChatMessage {
  id: string
  message: string
  createdAt: string
  user: {
    name: string
  }
}

export default function ChatPreview({ room, className }: ChatPreviewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat?room=${room}&limit=3`)
        if (response.ok) {
          const data = await response.json()
          setMessages(data)
        } else if (response.status === 401) {
          // Handle unauthorized access gracefully
          console.log('Chat requires authentication')
          setMessages([])
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error)
        setMessages([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [room])

  if (isLoading) {
    return (
      <div className={cn('bg-white rounded-xl p-6 border border-brand-ink/10', className)}>
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="w-5 h-5 text-brand-green" />
          <h3 className="font-semibold text-brand-ink">Smokers Lounge</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-brand-ink/10 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-brand-ink/5 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('bg-white rounded-xl p-6 border border-brand-ink/10', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-brand-green" />
          <h3 className="font-semibold text-brand-ink">Smokers Lounge</h3>
        </div>
        <div className="flex items-center text-sm text-brand-ink/70">
          <Users className="w-4 h-4 mr-1" />
          <span>12 online</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-brand-ink/70 text-center py-4">
            No recent messages. Be the first to start the conversation!
          </p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="border-l-2 border-brand-green/30 pl-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-brand-ink">
                  {message.user.name}
                </span>
                <span className="text-xs text-brand-ink/50">
                  {formatRelativeTime(message.createdAt)}
                </span>
              </div>
              <p className="text-sm text-brand-ink/80 line-clamp-2">
                {message.message}
              </p>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-brand-ink/10">
        <div className="flex items-center text-sm text-brand-green">
          <Clock className="w-4 h-4 mr-1" />
          <span>Live updates every 5 seconds</span>
        </div>
      </div>
    </div>
  )
}
