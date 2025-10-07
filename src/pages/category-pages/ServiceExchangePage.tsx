import React, { useState } from "react";
import { Users, Briefcase, GraduationCap, MapPin, Star, Clock, ShoppingCart, Heart, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";

const ServiceExchangePage = () => {
  const [activeTab, setActiveTab] = useState("services");
  const { addToCart } = useCart();

  const mockServices = [
    { id: '1', name: 'Plumbing Services', provider: 'John Moyo', price: 45.00, category: 'Home Services', rating: 4.8, location: 'Harare', experience: '5 years', image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=200&h=200&fit=crop' },
    { id: '2', name: 'Graphic Design', provider: 'Sarah Chigumba', price: 35.00, category: 'Creative', rating: 4.9, location: 'Bulawayo', experience: '3 years', image: 'https://images.unsplash.com/photo-1622979136416-a0217372379c?w=200&h=200&fit=crop' },
    { id: '3', name: 'Tutoring - Mathematics', provider: 'Mike Tshuma', price: 25.00, category: 'Education', rating: 4.7, location: 'Gweru', experience: '8 years', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop' },
    { id: '4', name: 'Car Mechanic', provider: 'Grace Ncube', price: 60.00, category: 'Automotive', rating: 4.6, location: 'Mutare', experience: '10 years', image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=200&h=200&fit=crop' },
    { id: '5', name: 'House Cleaning', provider: 'Tendai Moyo', price: 20.00, category: 'Home Services', rating: 4.5, location: 'Sam Levy', experience: '2 years', image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=200&h=200&fit=crop' },
    { id: '6', name: 'Photography', provider: 'Blessing Chigumba', price: 80.00, category: 'Creative', rating: 4.9, location: 'Avondale', experience: '6 years', image: 'https://images.unsplash.com/photo-1622979136416-a0217372379c?w=200&h=200&fit=crop' },
  ];

  const mockJobs = [
    { id: '1', title: 'Part-time Sales Assistant', company: 'Retail Store', location: 'CBD', salary: '$300/month', type: 'Part-time', posted: '2 days ago', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
    { id: '2', title: 'Delivery Driver', company: 'Logistics Co', location: 'Harare', salary: '$250/month', type: 'Gig', posted: '1 day ago', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
    { id: '3', title: 'Data Entry Clerk', company: 'Office Solutions', location: 'Sam Levy', salary: '$400/month', type: 'Full-time', posted: '3 days ago', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
  ];

  const mockInternships = [
    { id: '1', title: 'Software Development Intern', company: 'Tech Startup', location: 'Borrowdale', duration: '3 months', stipend: '$200/month', posted: '1 week ago', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' },
    { id: '2', title: 'Marketing Intern', company: 'Digital Agency', location: 'Avondale', duration: '6 months', stipend: '$150/month', posted: '5 days ago', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' },
    { id: '3', title: 'Finance Intern', company: 'Banking Group', location: 'CBD', duration: '4 months', stipend: '$300/month', posted: '2 weeks ago', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' },
  ];

  const mockPriceComparison = [
    { item: 'Plumbing Services', providers: [
      { name: 'John Moyo', price: 45.00, available: true, savings: 0, rating: 4.8 },
      { name: 'PlumbPro', price: 50.00, available: true, savings: -5.00, rating: 4.6 },
      { name: 'FixIt Fast', price: 40.00, available: false, savings: 5.00, rating: 4.5 },
      { name: 'Water Works', price: 42.00, available: true, savings: 3.00, rating: 4.7 },
    ]},
    { item: 'Graphic Design', providers: [
      { name: 'Sarah Chigumba', price: 35.00, available: true, savings: 0, rating: 4.9 },
      { name: 'Creative Studio', price: 40.00, available: true, savings: -5.00, rating: 4.7 },
      { name: 'Design Hub', price: 30.00, available: true, savings: 5.00, rating: 4.6 },
      { name: 'Art & Design', price: 38.00, available: true, savings: -3.00, rating: 4.8 },
    ]},
  ];

  const handleAddToCart = (service: any) => {
    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image,
      quantity: 1,
      variant: { category: service.category, provider: service.provider }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-blue-500 bg-blue-100">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Service Exchange
            </h1>
            <p className="text-lg text-muted-foreground">
              Skilled labor, professional services, and job opportunities marketplace
            </p>
          </div>

          <SearchBar
            className="max-w-2xl mx-auto"
            placeholder="Search for services, jobs, internships, or skills..."
          />
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Price Comparison */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-semibold">Service Price Comparison</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Compare service prices across different providers to find the best value.
            </p>
            <div className="space-y-6">
              {mockPriceComparison.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-4">{item.item}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {item.providers.map((provider, providerIdx) => (
                      <div key={providerIdx} className={`p-4 rounded-lg border-2 ${provider.available ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">{provider.name}</span>
                          <Badge variant={provider.available ? 'default' : 'destructive'}>
                            {provider.available ? 'Available' : 'Busy'}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-2">${provider.price}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {provider.rating}
                        </div>
                        {provider.savings > 0 && (
                          <div className="text-sm text-green-600 font-semibold">
                            Save ${provider.savings.toFixed(2)}
                          </div>
                        )}
                        {provider.savings < 0 && (
                          <div className="text-sm text-red-600 font-semibold">
                            +${Math.abs(provider.savings).toFixed(2)} more
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="internships">Internships</TabsTrigger>
              <TabsTrigger value="freelance">Freelance</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockServices.map(service => (
                  <Card key={service.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{service.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Provider: {service.provider}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Category: {service.category}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Experience: {service.experience}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {service.location}
                          <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                          {service.rating}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">${service.price}</span>
                        <Button size="sm" onClick={() => handleAddToCart(service)}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Book Service
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockJobs.map(job => (
                  <Card key={job.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={job.image} 
                        alt={job.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{job.title}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Company: {job.company}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Salary: {job.salary}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Posted: {job.posted}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{job.type}</Badge>
                        <Button size="sm">
                          <Heart className="h-4 w-4 mr-1" />
                          Apply
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="internships" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockInternships.map(internship => (
                  <Card key={internship.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={internship.image} 
                        alt={internship.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{internship.title}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Company: {internship.company}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {internship.location}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration: {internship.duration}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Stipend: {internship.stipend}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Posted: {internship.posted}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Internship</Badge>
                        <Button size="sm">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          Apply
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="freelance" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Freelance Opportunities</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Website Development Project</h3>
                      <Badge variant="outline">$500 - $1000</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Looking for a skilled developer to create a modern e-commerce website.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Posted 2 days ago</span>
                      <span>•</span>
                      <span>Remote</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Content Writing - Blog Posts</h3>
                      <Badge variant="outline">$20 - $50</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Need engaging blog posts about technology and business topics.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Posted 1 week ago</span>
                      <span>•</span>
                      <span>Remote</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Logo Design</h3>
                      <Badge variant="outline">$100 - $300</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Create a modern logo for a new tech startup company.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Posted 3 days ago</span>
                      <span>•</span>
                      <span>Remote</span>
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full">View All Freelance Projects</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ServiceExchangePage;