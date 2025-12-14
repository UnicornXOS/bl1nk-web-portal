import { useState, useRef, useEffect } from 'react';
import { Send, Settings, Plus, Trash2, MessageSquare, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  provider: 'vercel' | 'aws' | 'bedrock';
  createdAt: Date;
}

export default function AIAssistant() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: `Chat ${new Date().toLocaleDateString()}`,
      messages: [],
      provider: 'bedrock',
      createdAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeSession) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `This is a simulated response from ${activeSession.provider.toUpperCase()} API. In production, this would be connected to your configured API keys.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(sessions.length > 1 ? sessions[0].id : null);
      setMessages([]);
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'vercel':
        return 'bg-black text-white border-gray-700';
      case 'aws':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'bedrock':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-800 flex flex-col bg-slate-900/50">
        {/* Header */}
        <div className="p-4 border-b border-slate-800">
          <Button
            onClick={createNewSession}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Plus size={18} className="mr-2" />
            New Chat
          </Button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sessions.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No chat sessions yet</p>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                  activeSessionId === session.id
                    ? 'bg-cyan-600/20 border border-cyan-500/50'
                    : 'hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate text-sm">{session.title}</p>
                    <Badge className={`${getProviderColor(session.provider)} border text-xs mt-1`}>
                      {session.provider}
                    </Badge>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Settings Button */}
        <div className="p-4 border-t border-slate-800">
          <Button
            onClick={() => setShowSettings(true)}
            variant="outline"
            className="w-full border-cyan-500/30 hover:bg-cyan-500/10"
          >
            <Settings size={18} className="mr-2" />
            API Keys
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeSession ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-slate-800 p-4 bg-slate-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-cyan-400" />
                  <div>
                    <h2 className="text-white font-semibold">{activeSession.title}</h2>
                    <Badge className={`${getProviderColor(activeSession.provider)} border text-xs mt-1`}>
                      {activeSession.provider}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Start a conversation with the AI assistant</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {message.timestamp.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-gray-200 px-4 py-3 rounded-lg flex items-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-800 p-4 bg-slate-900/50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Create a new chat session to get started</p>
              <Button
                onClick={createNewSession}
                className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Plus size={18} className="mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-900 border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">API Keys Configuration</h2>

              {/* Vercel API */}
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Vercel API Gateway</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">API Key</label>
                      <input
                        type="password"
                        placeholder="Enter your Vercel API key"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Base URL</label>
                      <input
                        type="text"
                        placeholder="https://api.vercel.com"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                {/* AWS API */}
                <div className="border-b border-slate-800 pb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">AWS API Gateway</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Access Key ID</label>
                      <input
                        type="password"
                        placeholder="Enter your AWS Access Key ID"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Secret Access Key</label>
                      <input
                        type="password"
                        placeholder="Enter your AWS Secret Access Key"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Region</label>
                      <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                        <option>us-east-1</option>
                        <option>us-west-2</option>
                        <option>eu-west-1</option>
                        <option>ap-southeast-1</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bedrock API */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">AWS Bedrock</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Access Key ID</label>
                      <input
                        type="password"
                        placeholder="Enter your Bedrock Access Key ID"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Secret Access Key</label>
                      <input
                        type="password"
                        placeholder="Enter your Bedrock Secret Access Key"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Model ID</label>
                      <input
                        type="text"
                        placeholder="anthropic.claude-3-sonnet-20240229-v1:0"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <Button
                  onClick={() => {
                    setShowSettings(false);
                    toast.success('API keys saved successfully!');
                  }}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="outline"
                  className="flex-1 border-cyan-500/30 hover:bg-cyan-500/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
