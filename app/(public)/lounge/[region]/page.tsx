'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MessageCircle, Users, Clock, Send } from 'lucide-react'
import { cn, formatRelativeTime } from '@/lib/utils'

interface ChatMessage {
  id: string
  message: string
  createdAt: string
  user: {
    name: string
  }
}

export default function LoungePage() {
  const params = useParams()
  const region = params.region as string
  
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [onlineCount, setOnlineCount] = useState(12)

  useEffect(() => {
    fetchMessages()
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [region])

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat?room=${region}&limit=50`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room: region,
          message: newMessage.trim(),
        }),
      })

      if (response.ok) {
        setNewMessage('')
        // Fetch latest messages
        fetchMessages()
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const formatRegionName = (region: string) => {
    return region.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="min-h-screen bg-brand-paper">
      {/* Header */}
      <div className="bg-white border-b border-brand-ink/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand-ink">
                Smokers Lounge
              </h1>
              <p className="text-brand-ink/70">
                {formatRegionName(region)} Community Chat
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-brand-ink/70">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{onlineCount} online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Live updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-brand-ink/10 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-brand-green/10 border-b border-brand-ink/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-brand-ink">
                      {formatRegionName(region)} Lounge
                    </h2>
                    <p className="text-sm text-brand-ink/70">
                      Connect with local cannabis enthusiasts
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-brand-green">
                  <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-brand-ink/10 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-brand-ink/10 rounded w-1/4 mb-2"></div>
                          <div className="h-4 bg-brand-ink/5 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-brand-ink/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-brand-ink mb-2">No messages yet</h3>
                  <p className="text-brand-ink/70">
                    Be the first to start the conversation in the {formatRegionName(region)} lounge!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-brand-green/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-brand-green">
                          {message.user.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-brand-ink">
                            {message.user.name}
                          </span>
                          <span className="text-xs text-brand-ink/50">
                            {formatRelativeTime(message.createdAt)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-brand-ink/80">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-brand-ink/10 p-4">
              <form onSubmit={sendMessage} className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-brand-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  disabled={isSending}
                />
                
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className={cn(
                    'px-4 py-2 rounded-lg font-semibold transition-colors',
                    newMessage.trim() && !isSending
                      ? 'bg-brand-green text-white hover:bg-brand-green/90'
                      : 'bg-brand-ink/10 text-brand-ink/50 cursor-not-allowed'
                  )}
                >
                  {isSending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Guidelines */}
          <div className="mt-8 bg-brand-amber/10 rounded-xl p-6">
            <h3 className="font-semibold text-brand-ink mb-3">Community Guidelines</h3>
            <ul className="text-sm text-brand-ink/70 space-y-1">
              <li>• Be respectful and kind to other members</li>
              <li>• Share helpful information about products and experiences</li>
              <li>• No spam, advertising, or inappropriate content</li>
              <li>• Keep discussions focused on cannabis-related topics</li>
              <li>• Report any violations to moderators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
