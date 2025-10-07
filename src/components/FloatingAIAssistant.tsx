import React, { useState } from "react";
import { Bot, X, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (message.trim()) {
      // Navigate to AI Assistant page with the message
      navigate(`/ai-assistant?message=${encodeURIComponent(message)}`);
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handlePanicButton = () => {
    if (confirm('🚨 EMERGENCY ALERT 🚨\n\nAre you sure you want to trigger the panic button?\n\nThis will:\n• Alert your emergency contacts\n• Share your location\n• Contact emergency services\n\nPress OK only if you need immediate help!')) {
      navigate('/safety');
      // In a real app, this would trigger the panic button directly
      alert('Emergency alert triggered! Redirecting to Safety Center...');
    }
  };

  return (
    <>
      {/* Emergency Panic Button */}
      <Button
        onClick={handlePanicButton}
        className="fixed bottom-36 right-4 z-40 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-red-600 hover:bg-red-700 text-white animate-pulse"
        size="icon"
      >
        <AlertTriangle className="h-6 w-6" />
      </Button>

      {/* Floating AI Assistant Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-40 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-24 right-4 z-40 w-80 h-96 shadow-xl border-2">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-3 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">Hi! I'm your AI assistant. How can I help you today?</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="text-sm">I can help you find products, compare prices, plan your budget, or answer any questions about Swumarket.</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="link"
                size="sm"
                onClick={() => navigate('/ai-assistant')}
                className="w-full mt-2 text-xs"
              >
                Open Full Assistant
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FloatingAIAssistant;
