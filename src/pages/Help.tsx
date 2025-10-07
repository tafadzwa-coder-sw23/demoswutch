import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Book,
  Video,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Download,
  PlayCircle
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
  userVote?: 'helpful' | 'not-helpful';
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdate: string;
  category: string;
}

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    subject: "",
    category: "general",
    message: "",
    priority: "medium"
  });

  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'How do I create my first listing on Swumarket?',
      answer: 'To create a listing, go to your Dashboard and click "Add New Listing". Fill in the product details, upload photos, set your price, and publish. Your listing will be visible to nearby buyers immediately.',
      category: 'selling',
      helpful: 45,
      notHelpful: 3
    },
    {
      id: '2',
      question: 'How does the price comparison feature work?',
      answer: 'Our price comparison tool automatically scans nearby vendors for similar products and shows you the best deals. Click the "Compare Prices" button on any product to see alternatives from different sellers in your area.',
      category: 'buying',
      helpful: 38,
      notHelpful: 2
    },
    {
      id: '3',
      question: 'Is it safe to meet sellers in person?',
      answer: 'Yes! We recommend meeting in public places, bringing a friend, and using our built-in safety features like location sharing and emergency contacts. You can also use our escrow service for high-value transactions.',
      category: 'safety',
      helpful: 52,
      notHelpful: 1
    },
    {
      id: '4',
      question: 'How do I negotiate prices with sellers?',
      answer: 'Use the "Make Offer" button on any listing to start negotiations. You can chat directly with the seller through our secure messaging system. Be respectful and reasonable with your offers.',
      category: 'buying',
      helpful: 29,
      notHelpful: 5
    },
    {
      id: '5',
      question: 'What payment methods are accepted?',
      answer: 'Swumarket supports cash, mobile money (EcoCash, OneMoney), bank transfers, and cryptocurrency. Sellers can choose which payment methods they accept for their listings.',
      category: 'payments',
      helpful: 41,
      notHelpful: 2
    },
    {
      id: '6',
      question: 'How do I report a problem with a seller or buyer?',
      answer: 'Go to the user\'s profile and click "Report User". You can also contact our support team directly. We take all reports seriously and will investigate promptly.',
      category: 'safety',
      helpful: 33,
      notHelpful: 1
    }
  ]);

  const [supportTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-001',
      subject: 'Unable to upload product images',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-20',
      lastUpdate: '2024-01-21',
      category: 'technical'
    },
    {
      id: 'TKT-002',
      subject: 'Payment not received for sold item',
      status: 'resolved',
      priority: 'high',
      createdAt: '2024-01-18',
      lastUpdate: '2024-01-19',
      category: 'payments'
    }
  ]);

  const tutorials = [
    {
      id: '1',
      title: 'Getting Started with Swumarket',
      description: 'Learn the basics of buying and selling on our platform',
      duration: '5 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'How to Create Effective Listings',
      description: 'Tips for writing descriptions and taking great photos',
      duration: '8 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Safety Guidelines for Meetups',
      description: 'Best practices for safe in-person transactions',
      duration: '6 min',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=200&fit=crop'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVote = (faqId: string, vote: 'helpful' | 'not-helpful') => {
    setFaqs(prev => prev.map(faq => {
      if (faq.id === faqId) {
        const newFaq = { ...faq };
        
        // Remove previous vote if exists
        if (faq.userVote === 'helpful') newFaq.helpful--;
        if (faq.userVote === 'not-helpful') newFaq.notHelpful--;
        
        // Add new vote
        if (vote === 'helpful') newFaq.helpful++;
        if (vote === 'not-helpful') newFaq.notHelpful++;
        
        newFaq.userVote = vote;
        return newFaq;
      }
      return faq;
    }));
  };

  const handleSubmitContact = () => {
    if (!contactForm.subject || !contactForm.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Submit contact form
    alert('Your message has been sent! We\'ll get back to you within 24 hours.');
    setContactForm({
      subject: "",
      category: "general",
      message: "",
      priority: "medium"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search help articles..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Help & Support
            </h1>
            <p className="text-lg text-muted-foreground">
              Get help, find answers, and contact our support team
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Quick Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for help articles, FAQs, tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            {/* FAQ */}
            <TabsContent value="faq">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5" />
                      Frequently Asked Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center gap-2">
                              <span>{faq.question}</span>
                              <Badge variant="outline" className="text-xs">
                                {faq.category}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <p className="text-muted-foreground">{faq.answer}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-muted-foreground">
                                    Was this helpful?
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant={faq.userVote === 'helpful' ? 'default' : 'outline'}
                                      size="sm"
                                      onClick={() => handleVote(faq.id, 'helpful')}
                                    >
                                      <ThumbsUp className="h-4 w-4 mr-1" />
                                      {faq.helpful}
                                    </Button>
                                    <Button
                                      variant={faq.userVote === 'not-helpful' ? 'default' : 'outline'}
                                      size="sm"
                                      onClick={() => handleVote(faq.id, 'not-helpful')}
                                    >
                                      <ThumbsDown className="h-4 w-4 mr-1" />
                                      {faq.notHelpful}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tutorials */}
            <TabsContent value="tutorials">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      Video Tutorials & Guides
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tutorials.map((tutorial) => (
                        <Card key={tutorial.id} className="group hover:shadow-lg transition-all cursor-pointer">
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img
                              src={tutorial.thumbnail}
                              alt={tutorial.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <PlayCircle className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {tutorial.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {tutorial.duration}
                              </span>
                            </div>
                            <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {tutorial.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contact Us */}
            <TabsContent value="contact">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Chat with our support team
                      </p>
                      <Button className="w-full">Start Chat</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        support@swumarket.com
                      </p>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        +263 77 123 4567
                      </p>
                      <Button variant="outline" className="w-full">Call Now</Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject *</label>
                        <Input
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                          placeholder="Brief description of your issue"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                          value={contactForm.category}
                          onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="general">General Question</option>
                          <option value="technical">Technical Issue</option>
                          <option value="payments">Payment Problem</option>
                          <option value="safety">Safety Concern</option>
                          <option value="account">Account Issue</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <select
                        value={contactForm.priority}
                        onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message *</label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Please describe your issue in detail..."
                        rows={5}
                      />
                    </div>
                    
                    <Button onClick={handleSubmitContact} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* My Tickets */}
            <TabsContent value="tickets">
              <Card>
                <CardHeader>
                  <CardTitle>My Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportTickets.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-muted-foreground">No support tickets found</p>
                      </div>
                    ) : (
                      supportTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{ticket.subject}</span>
                              <Badge variant="outline" className="text-xs">
                                {ticket.id}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Created: {ticket.createdAt} • Last update: {ticket.lastUpdate}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Category: {ticket.category}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                            <Badge className={getStatusColor(ticket.status)}>
                              {ticket.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Community */}
            <TabsContent value="community">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Connect with other Swumarket users, share tips, and get help from the community.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Join Community Forum
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        User Groups
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">2,500+</div>
                      <div className="text-sm text-muted-foreground">Active Members</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">850+</div>
                      <div className="text-sm text-muted-foreground">Questions Answered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">95%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Help;
