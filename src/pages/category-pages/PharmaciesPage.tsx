import React, { useState } from "react";
import { Pill, Stethoscope, Shield, MapPin, Star, Clock, ShoppingCart, Heart, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";

const PharmaciesPage = () => {
  const [activeTab, setActiveTab] = useState("medicines");
  const { addToCart } = useCart();

  const mockMedicines = [
    { id: '1', name: 'Paracetamol 500mg', price: 2.50, inStock: true, prescription: false, category: 'Pain Relief', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', rating: 4.5, location: 'Harare' },
    { id: '2', name: 'Amoxicillin 250mg', price: 8.75, inStock: true, prescription: true, category: 'Antibiotics', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', rating: 4.7, location: 'Bulawayo' },
    { id: '3', name: 'Vitamin C 1000mg', price: 5.00, inStock: false, prescription: false, category: 'Vitamins', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', rating: 4.6, location: 'Gweru' },
    { id: '4', name: 'Ibuprofen 400mg', price: 3.25, inStock: true, prescription: false, category: 'Pain Relief', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', rating: 4.4, location: 'Mutare' },
    { id: '5', name: 'Multivitamin Complex', price: 12.50, inStock: true, prescription: false, category: 'Vitamins', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', rating: 4.8, location: 'Sam Levy' },
    { id: '6', name: 'Cough Syrup', price: 6.75, inStock: true, prescription: false, category: 'Cold & Flu', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', rating: 4.3, location: 'Avondale' },
  ];

  const mockHealthcareProviders = [
    { id: '1', name: 'Dr. Sarah Moyo', specialty: 'General Practitioner', location: 'Avondale', rating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop' },
    { id: '2', name: 'Dr. John Chigumba', specialty: 'Pediatrician', location: 'Sam Levy', rating: 4.6, available: false, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop' },
    { id: '3', name: 'Dr. Grace Ncube', specialty: 'Dermatologist', location: 'Borrowdale', rating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1594824379913-3a0a6b5b5b5b?w=100&h=100&fit=crop' },
    { id: '4', name: 'Dr. Mike Tshuma', specialty: 'Cardiologist', location: 'CBD', rating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop' },
  ];

  const mockPriceComparison = [
    { item: 'Paracetamol 500mg', pharmacies: [
      { name: 'Health Plus', price: 2.50, inStock: true, savings: 0 },
      { name: 'MediCare', price: 2.30, inStock: true, savings: 0.20 },
      { name: 'PharmaWorld', price: 2.75, inStock: false, savings: -0.25 },
      { name: 'QuickMed', price: 2.40, inStock: true, savings: 0.10 },
    ]},
    { item: 'Vitamin C 1000mg', pharmacies: [
      { name: 'Health Plus', price: 5.00, inStock: true, savings: 0 },
      { name: 'MediCare', price: 4.75, inStock: true, savings: 0.25 },
      { name: 'PharmaWorld', price: 5.25, inStock: true, savings: -0.25 },
      { name: 'QuickMed', price: 4.50, inStock: true, savings: 0.50 },
    ]},
  ];

  const handleAddToCart = (medicine: any) => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
      quantity: 1,
      variant: { category: medicine.category, prescription: medicine.prescription }
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-green-500 bg-green-100">
              <Pill className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Pharmacies & Health
            </h1>
            <p className="text-lg text-muted-foreground">
              Secure healthcare hub with AI diagnostics and verified professionals
            </p>
          </div>

          <SearchBar
            className="max-w-2xl mx-auto"
            placeholder="Search medicines, symptoms, or healthcare providers..."
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
              <Shield className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-semibold">Medicine Price Comparison</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Compare medicine prices across different pharmacies to find the best deals.
            </p>
            <div className="space-y-6">
              {mockPriceComparison.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-4">{item.item}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {item.pharmacies.map((pharmacy, pharmacyIdx) => (
                      <div key={pharmacyIdx} className={`p-4 rounded-lg border-2 ${pharmacy.inStock ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">{pharmacy.name}</span>
                          <Badge variant={pharmacy.inStock ? 'default' : 'destructive'}>
                            {pharmacy.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-2">${pharmacy.price}</div>
                        {pharmacy.savings > 0 && (
                          <div className="text-sm text-green-600 font-semibold">
                            Save ${pharmacy.savings.toFixed(2)}
                          </div>
                        )}
                        {pharmacy.savings < 0 && (
                          <div className="text-sm text-red-600 font-semibold">
                            +${Math.abs(pharmacy.savings).toFixed(2)} more
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
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="medicines">Medicines</TabsTrigger>
              <TabsTrigger value="providers">Healthcare Providers</TabsTrigger>
              <TabsTrigger value="ai">AI Diagnostics</TabsTrigger>
            </TabsList>

            <TabsContent value="medicines" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockMedicines.map(medicine => (
                  <Card key={medicine.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={medicine.image} 
                        alt={medicine.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{medicine.name}</h3>
                        <Badge variant={medicine.inStock ? 'default' : 'destructive'}>
                          {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Category: {medicine.category}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {medicine.location}
                          <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                          {medicine.rating}
                        </div>
                        {medicine.prescription && (
                          <div className="flex items-center gap-1 text-sm text-orange-600">
                            <AlertCircle className="h-4 w-4" />
                            Prescription Required
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">${medicine.price}</span>
                        <Button size="sm" onClick={() => handleAddToCart(medicine)} disabled={!medicine.inStock}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {medicine.inStock ? 'Add to Cart' : 'Notify When Available'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="providers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockHealthcareProviders.map(provider => (
                  <Card key={provider.id} className="p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <img 
                        src={provider.image} 
                        alt={provider.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{provider.name}</h3>
                          <Badge variant={provider.available ? 'default' : 'secondary'}>
                            {provider.available ? 'Available' : 'Busy'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{provider.specialty}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          {provider.location}
                          <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                          {provider.rating}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" disabled={!provider.available}>
                            <Heart className="h-4 w-4 mr-1" />
                            Book Appointment
                          </Button>
                          <Button size="sm" variant="outline">
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">AI-Powered Health Assistant</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Symptom Checker</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Describe your symptoms and get AI-powered health insights and recommendations.
                    </p>
                    <Button>Start Symptom Check</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Medication Reminder</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set up smart reminders for your medications and health routines.
                    </p>
                    <Button variant="outline">Set Reminders</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Health Tips</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get personalized health tips and wellness recommendations.
                    </p>
                    <Button variant="outline">View Tips</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PharmaciesPage;