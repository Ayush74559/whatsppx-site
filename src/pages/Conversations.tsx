import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRequireAuth } from '@/hooks/useAuth';
import { Search, Send, Phone, Video, MoreVertical, MessageSquare } from 'lucide-react';
import { conversationService } from '@/services/conversationService';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import type { Conversation, Message } from '@/types';

export function Conversations() {
  const { loading: authLoading } = useRequireAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    try {
      const data = await conversationService.getConversations();
      setConversations(data);
      if (data.length > 0) {
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const data = await conversationService.getMessages(conversationId);
      setMessages(data);
      await conversationService.markAsRead(conversationId);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversation) return;

    try {
      await conversationService.sendMessage(selectedConversation.id, message);
      setMessage('');
      loadMessages(selectedConversation.id);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    }
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.customerPhone.includes(searchQuery)
  );

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (conversations.length === 0) {
    return (
      <DashboardLayout>
        <Card className="glass-card p-12">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground mb-4">
              Your customer conversations will appear here once you connect WhatsApp
            </p>
            <Button className="bg-gradient-primary">
              Connect WhatsApp
            </Button>
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-6rem)]">
        <Card className="glass-card h-full flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 border-r border-border/50 flex flex-col">
            <div className="p-4 border-b border-border/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 border-b border-border/50 text-left hover:bg-secondary/50 transition-colors ${
                    selectedConversation?.id === conv.id ? 'bg-secondary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium">{conv.customerName}</p>
                    {conv.unreadCount > 0 && (
                      <Badge className="bg-whatsapp text-white">{conv.unreadCount}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {conv.lastMessage}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(conv.lastMessageTime, { addSuffix: true })}
                    </span>
                    {conv.tags && conv.tags.length > 0 && (
                      <div className="flex gap-1">
                        {conv.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selectedConversation.customerName}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.customerPhone}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="ghost">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No messages yet
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`message-bubble ${
                          msg.sender === 'customer' ? 'message-received' : 'message-sent'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'customer' ? 'text-muted-foreground' : 'text-white/70'
                          }`}
                        >
                          {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    className="bg-whatsapp hover:bg-whatsapp-dark"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a conversation to view messages
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
