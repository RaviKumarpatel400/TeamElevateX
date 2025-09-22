import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Send, MessageCircle, User, Bot, Clock, CheckCircle } from 'lucide-react'

interface LiveChatProps {
  onBack: () => void
}

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

export default function LiveChat({ onBack }: LiveChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! 👋 Welcome to TeamElevateX. I\'m Sarah, your project consultant. How can I help you today?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 60000),
      status: 'delivered'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mock responses for demo purposes
  const mockResponses = [
    'That sounds like an interesting project! Could you tell me more about your specific requirements?',
    'Great! We have extensive experience with that type of application. What\'s your target timeline?',
    'Absolutely! We can definitely help with that. Let me connect you with one of our senior developers.',
    'Perfect! I\'ll prepare a preliminary quote for you. What\'s the best email to send it to?',
    'That\'s a fantastic idea! We\'ve built similar solutions before. Would you like to see some examples?',
    'I understand. Let me schedule a call with our technical lead to discuss this in more detail.',
    'Sure! We offer flexible payment plans. Would you like to discuss the pricing structure?',
    'Excellent question! Our typical development process includes discovery, design, development, and deployment phases.'
  ]

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    
    // Update message status to sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      )
    }, 500)

    // Simulate typing indicator
    setIsTyping(true)
    
    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false)
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'agent',
        timestamp: new Date(),
        status: 'delivered'
      }
      
      setMessages(prev => [...prev, agentMessage])
      
      // Mark user message as read
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'read' }
            : msg
        )
      )
    }, 2000 + Math.random() * 2000) // Random delay 2-4 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getMessageStatusIcon = (status?: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />
      case 'sent':
        return <CheckCircle className="w-3 h-3 text-gray-400" />
      case 'delivered':
        return <CheckCircle className="w-3 h-3 text-blue-500" />
      case 'read':
        return <CheckCircle className="w-3 h-3 text-green-500" />
      default:
        return null
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-accent hover:text-accent-foreground mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Options
        </Button>
        <h2 className="text-3xl font-bold text-foreground">Live Chat Support</h2>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-3 text-accent" />
              Chat with TeamElevateX
            </div>
            <div className="flex items-center text-sm">
              <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              {isConnected ? 'Online' : 'Offline'}
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.sender === 'user' ? 'items-end' : 'items-start'
                } flex flex-col`}>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-accent text-accent-foreground rounded-br-none'
                      : 'bg-muted text-muted-foreground rounded-bl-none'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {/* Timestamp and Status */}
                  <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === 'user' && getMessageStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={!isConnected}
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || !isConnected}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                'I need a quote',
                'Tell me about your services',
                'I have a mobile app idea',
                'What\'s your process?',
                'Can you review my project?'
              ].map((quickMessage) => (
                <button
                  key={quickMessage}
                  onClick={() => setNewMessage(quickMessage)}
                  className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors"
                >
                  {quickMessage}
                </button>
              ))}
            </div>
            
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Usually responds within a few minutes • Available Mon-Fri 9AM-6PM EST
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}