import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Phone, 
  Video, 
  Mic, 
  Camera, 
  Smile, 
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  DollarSign,
  Handshake,
  AlertCircle
} from "lucide-react";

interface Message {
  id: string;
  sender: 'user' | 'vendor';
  type: 'text' | 'image' | 'video' | 'voice' | 'offer' | 'counter-offer' | 'agreement';
  content: string;
  timestamp: Date;
  read: boolean;
  metadata?: {
    price?: number;
    quantity?: number;
    conditions?: string[];
    expiresAt?: Date;
  };
}

interface NegotiationChatProps {
  vendor: any;
  item: any;
  isOpen: boolean;
  onClose: () => void;
  onAgreement: (agreement: any) => void;
}

const NegotiationChat = ({ vendor, item, isOpen, onClose, onAgreement }: NegotiationChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'vendor',
      type: 'text',
      content: `Hi! I saw you're interested in ${item.title}. I have it available for $${item.price}. Would you like to negotiate?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      content: newMessage,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate vendor response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const responses = [
          "That sounds reasonable. Let me check my inventory.",
          "I can do that price. When would you like to meet?",
          "I have a few questions about the condition you're looking for.",
          "Great! I can offer free delivery within 2km.",
          "Let me send you some photos of the actual item."
        ];
        
        const vendorMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'vendor',
          type: 'text',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          read: true
        };
        
        setMessages(prev => [...prev, vendorMessage]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const handleMakeOffer = (price: number) => {
    const offerMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'offer',
      content: `I'd like to offer $${price} for this item.`,
      timestamp: new Date(),
      read: false,
      metadata: {
        price,
        quantity: 1,
        conditions: ['Cash on delivery', 'Meet at public place'],
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    };

    setMessages(prev => [...prev, offerMessage]);
    setCurrentOffer(price);
  };

  const handleAcceptOffer = () => {
    const agreementMessage: Message = {
      id: Date.now().toString(),
      sender: 'vendor',
      type: 'agreement',
      content: `Deal! I accept your offer of $${currentOffer}. Let's proceed with the transaction.`,
      timestamp: new Date(),
      read: true
    };

    setMessages(prev => [...prev, agreementMessage]);
    onAgreement({
      vendor,
      item,
      agreedPrice: currentOffer,
      timestamp: new Date()
    });
  };

  const handleVideoCall = () => {
    setIsVideoCall(true);
    // In real implementation, this would start a video call
    setTimeout(() => {
      setIsVideoCall(false);
    }, 5000);
  };

  const handleVoiceMessage = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      const voiceMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        type: 'voice',
        content: 'Voice message (30s)',
        timestamp: new Date(),
        read: false
      };
      setMessages(prev => [...prev, voiceMessage]);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <img 
              src={vendor.image} 
              alt={vendor.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-lg">{vendor.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online now
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleVideoCall}>
              <Video className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {message.type === 'offer' && (
                    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Price Offer</span>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        ${message.metadata?.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expires: {message.metadata?.expiresAt?.toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  {message.type === 'agreement' && (
                    <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Handshake className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">Deal Agreed!</span>
                      </div>
                      <div className="text-green-700">
                        Both parties have agreed to the terms.
                      </div>
                    </div>
                  )}
                  
                  {message.type === 'text' && (
                    <div className="p-3 rounded-lg">
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.sender === 'user' && (
                          message.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">Typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {currentOffer && (
            <div className="p-4 border-t bg-muted/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Pending Offer: ${currentOffer}</span>
                </div>
                <Button size="sm" onClick={handleAcceptOffer}>
                  Accept Offer
                </Button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleVoiceMessage} disabled={isRecording}>
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Camera className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              
              <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick Offer Buttons */}
            <div className="flex gap-2 mt-3">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleMakeOffer(item.price * 0.9)}
              >
                Offer 10% off
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleMakeOffer(item.price * 0.85)}
              >
                Offer 15% off
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleMakeOffer(item.price * 0.8)}
              >
                Offer 20% off
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NegotiationChat;
