import React, { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Star, Clock, ShoppingCart, Filter, Layers, Plus, X, Car, Bike, Footprints, Bus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Map = () => {
  const [selectedLayer, setSelectedLayer] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPin, setShowAddPin] = useState(false);
  const [newPin, setNewPin] = useState({ name: "", type: "transaction", amount: "" });
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock transaction pins data with ETA
  const [transactionPins, setTransactionPins] = useState([
    { 
      id: '1', 
      name: 'Grocery Purchase', 
      type: 'transaction', 
      amount: 45.50, 
      seller: 'Mai Sarah', 
      date: '2 days ago',
      lat: -17.8252, 
      lng: 31.0335,
      rating: 4.8,
      status: 'completed',
      eta: {
        walking: '8 min',
        driving: '3 min',
        cycling: '5 min',
        public: '12 min'
      }
    },
    { 
      id: '2', 
      name: 'Phone Repair', 
      type: 'service', 
      amount: 25.00, 
      seller: 'Tech Fix', 
      date: '1 week ago',
      lat: -17.8200, 
      lng: 31.0300,
      rating: 4.5,
      status: 'completed',
      eta: {
        walking: '12 min',
        driving: '4 min',
        cycling: '7 min',
        public: '15 min'
      }
    },
    { 
      id: '3', 
      name: 'BBQ Order', 
      type: 'food', 
      amount: 18.75, 
      seller: 'Brother John', 
      date: '3 days ago',
      lat: -17.8150, 
      lng: 31.0250,
      rating: 4.9,
      status: 'completed',
      eta: {
        walking: '6 min',
        driving: '2 min',
        cycling: '4 min',
        public: '8 min'
      }
    },
    { 
      id: '4', 
      name: 'Handmade Jewelry', 
      type: 'transaction', 
      amount: 35.00, 
      seller: 'Grace Crafts', 
      date: '5 days ago',
      lat: -17.8300, 
      lng: 31.0400,
      rating: 4.7,
      status: 'completed',
      eta: {
        walking: '15 min',
        driving: '6 min',
        cycling: '9 min',
        public: '18 min'
      }
    },
  ]);

  const [selectedTransportMode, setSelectedTransportMode] = useState('driving');

  const layers = [
    { id: 'all', name: 'All', icon: Layers, color: 'bg-blue-500' },
    { id: 'transaction', name: 'Transactions', icon: ShoppingCart, color: 'bg-green-500' },
    { id: 'service', name: 'Services', icon: Star, color: 'bg-purple-500' },
    { id: 'food', name: 'Food', icon: MapPin, color: 'bg-orange-500' },
  ];

  const filteredPins = selectedLayer === 'all' 
    ? transactionPins 
    : transactionPins.filter(pin => pin.type === selectedLayer);

  const handleAddPin = () => {
    if (newPin.name && newPin.amount) {
      const pin = {
        id: Date.now().toString(),
        name: newPin.name,
        type: newPin.type,
        amount: parseFloat(newPin.amount),
        seller: 'You',
        date: 'Just now',
        lat: -17.8252 + (Math.random() - 0.5) * 0.01, // Random nearby location
        lng: 31.0335 + (Math.random() - 0.5) * 0.01,
        rating: 5.0,
        status: 'completed',
        eta: {
          walking: `${Math.floor(Math.random() * 15) + 5} min`,
          driving: `${Math.floor(Math.random() * 8) + 2} min`,
          cycling: `${Math.floor(Math.random() * 10) + 3} min`,
          public: `${Math.floor(Math.random() * 20) + 8} min`
        }
      };
      setTransactionPins([...transactionPins, pin]);
      setNewPin({ name: "", type: "transaction", amount: "" });
      setShowAddPin(false);
    }
  };

  // Initialize Google Maps (mock implementation)
  useEffect(() => {
    if (mapRef.current) {
      // In a real implementation, you would initialize Google Maps here
      // For now, we'll just show a placeholder with pins
      console.log('Map initialized');
      
      // Simulate map loading
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.style.opacity = '1';
        }
      }, 500);
    }
  }, []);

  const getPinIcon = (type: string) => {
    switch (type) {
      case 'transaction': return '🛒';
      case 'service': return '🔧';
      case 'food': return '🍽️';
      default: return '📍';
    }
  };

  const getPinColor = (type: string) => {
    switch (type) {
      case 'transaction': return 'bg-green-500';
      case 'service': return 'bg-purple-500';
      case 'food': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with Search */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-50 via-white to-green-50 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transaction Map</h1>
                <p className="text-sm text-gray-600">Community activity & transactions</p>
              </div>
            </div>
            <HeaderControls />
          </div>

          <div className="relative">
            <SearchBar
              className="max-w-2xl mx-auto"
              placeholder="Search transactions, sellers, or locations..."
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {filteredPins.length} pins
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {selectedLayer === 'all' ? 'All types' : selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        {/* Enhanced Map Layers Sidebar */}
        <div className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Map Layers</h2>
                <p className="text-sm text-gray-600">Filter by transaction type</p>
              </div>
              <Button 
                size="sm" 
                onClick={() => setShowAddPin(true)}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Pin
              </Button>
            </div>
            
            {/* Layer Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {layers.map((layer) => (
                <Button
                  key={layer.id}
                  variant={selectedLayer === layer.id ? "default" : "outline"}
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`h-12 flex flex-col items-center gap-1 ${
                    selectedLayer === layer.id 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <layer.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{layer.name}</span>
                  <Badge 
                    variant={selectedLayer === layer.id ? "secondary" : "outline"} 
                    className="text-xs h-5"
                  >
                    {layer.id === 'all' ? transactionPins.length : transactionPins.filter(pin => pin.type === layer.id).length}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Transport Mode Selection */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Transport Mode</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'driving', name: 'Driving', icon: Car, color: 'text-blue-600' },
                  { id: 'walking', name: 'Walking', icon: Footprints, color: 'text-green-600' },
                  { id: 'cycling', name: 'Cycling', icon: Bike, color: 'text-purple-600' },
                  { id: 'public', name: 'Public', icon: Bus, color: 'text-orange-600' }
                ].map((mode) => (
                  <Button
                    key={mode.id}
                    variant={selectedTransportMode === mode.id ? "default" : "outline"}
                    onClick={() => setSelectedTransportMode(mode.id)}
                    className={`h-10 flex items-center gap-2 ${
                      selectedTransportMode === mode.id 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <mode.icon className={`h-4 w-4 ${selectedTransportMode === mode.id ? 'text-white' : mode.color}`} />
                    <span className="text-xs font-medium">{mode.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-300px)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {filteredPins.length} shown
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs h-6 px-2"
                  onClick={() => {
                    // Sort by ETA time (convert to minutes for sorting)
                    const sortedPins = [...filteredPins].sort((a, b) => {
                      const aTime = parseInt(a.eta[selectedTransportMode as keyof typeof a.eta].replace(' min', ''));
                      const bTime = parseInt(b.eta[selectedTransportMode as keyof typeof b.eta].replace(' min', ''));
                      return aTime - bTime;
                    });
                    setTransactionPins(sortedPins);
                  }}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Sort by ETA
                </Button>
              </div>
            </div>
            
            {filteredPins.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No transactions found</p>
                <p className="text-xs text-gray-400">Try changing the filter or add a new pin</p>
              </div>
            ) : (
              filteredPins.map((pin) => (
                <Card key={pin.id} className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500 group">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm shadow-md ${getPinColor(pin.type)} group-hover:scale-105 transition-transform`}>
                      {getPinIcon(pin.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {pin.name}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{pin.seller} • {pin.date}</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-green-600">${pin.amount}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{pin.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={pin.status === 'completed' ? 'default' : 'secondary'} 
                            className="text-xs"
                          >
                            {pin.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span className="font-medium">{pin.eta[selectedTransportMode as keyof typeof pin.eta]}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {selectedTransportMode === 'driving' && <Car className="h-3 w-3 inline mr-1" />}
                          {selectedTransportMode === 'walking' && <Footprints className="h-3 w-3 inline mr-1" />}
                          {selectedTransportMode === 'cycling' && <Bike className="h-3 w-3 inline mr-1" />}
                          {selectedTransportMode === 'public' && <Bus className="h-3 w-3 inline mr-1" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Enhanced Map Area */}
        <div className="flex-1 relative bg-gray-100">
          <div ref={mapRef} className="w-full h-full relative overflow-hidden shadow-inner opacity-0 transition-opacity duration-500">
            {/* Enhanced Professional Map Interface */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-green-100 transition-all duration-500">
              {/* Map Texture Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1),transparent_50%)]"></div>
              {/* Enhanced Street Grid with Realistic Styling */}
              <div className="absolute inset-0">
                {/* Major Highways with realistic styling */}
                <div className="absolute top-1/4 left-0 right-0 h-2 bg-gradient-to-r from-gray-600 to-gray-500 shadow-lg"></div>
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-gray-600 to-gray-500 shadow-lg"></div>
                <div className="absolute top-3/4 left-0 right-0 h-2 bg-gradient-to-r from-gray-600 to-gray-500 shadow-lg"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-600 to-gray-500 shadow-lg"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-600 to-gray-500 shadow-lg"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-600 to-gray-500 shadow-lg"></div>
                
                {/* Minor Roads with subtle styling */}
                <div className="absolute top-1/8 left-0 right-0 h-1 bg-gray-400 opacity-60 shadow-sm"></div>
                <div className="absolute top-3/8 left-0 right-0 h-1 bg-gray-400 opacity-60 shadow-sm"></div>
                <div className="absolute top-5/8 left-0 right-0 h-1 bg-gray-400 opacity-60 shadow-sm"></div>
                <div className="absolute top-7/8 left-0 right-0 h-1 bg-gray-400 opacity-60 shadow-sm"></div>
                <div className="absolute left-1/8 top-0 bottom-0 w-1 bg-gray-400 opacity-60 shadow-sm"></div>
                <div className="absolute left-3/8 top-0 bottom-0 w-1 bg-gray-400 opacity-60 shadow-sm"></div>
                <div className="absolute left-5/8 top-0 bottom-0 w-1 bg-gray-400 opacity-60 shadow-sm"></div>
                <div className="absolute left-7/8 top-0 bottom-0 w-1 bg-gray-400 opacity-60 shadow-sm"></div>
                
                {/* Lane Markings with realistic styling */}
                <div className="absolute top-1/4 left-1/4 w-12 h-0.5 bg-yellow-400 opacity-90 shadow-sm"></div>
                <div className="absolute top-1/4 left-1/4 w-12 h-0.5 bg-yellow-400 opacity-90 shadow-sm mt-1"></div>
                <div className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-yellow-400 opacity-90 shadow-sm"></div>
                <div className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-yellow-400 opacity-90 shadow-sm mt-1"></div>
                <div className="absolute top-3/4 left-3/4 w-12 h-0.5 bg-yellow-400 opacity-90 shadow-sm"></div>
                <div className="absolute top-3/4 left-3/4 w-12 h-0.5 bg-yellow-400 opacity-90 shadow-sm mt-1"></div>
                
                {/* Intersection Markings */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-300 rounded-full opacity-80"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-300 rounded-full opacity-80"></div>
                <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-yellow-300 rounded-full opacity-80"></div>
              </div>

              {/* Clean Street Names - Only show on hover */}
              <div className="absolute top-1/4 left-2 text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded shadow-sm opacity-0 hover:opacity-100 transition-opacity duration-200">Sam Levy Way</div>
              <div className="absolute top-1/2 left-2 text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded shadow-sm opacity-0 hover:opacity-100 transition-opacity duration-200">Borrowdale Road</div>
              <div className="absolute top-3/4 left-2 text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded shadow-sm opacity-0 hover:opacity-100 transition-opacity duration-200">Avondale Street</div>

              {/* Enhanced Landmark Pins with Professional Styling */}
              <div className="absolute top-1/6 left-1/6 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-3 border-white shadow-2xl cursor-pointer hover:scale-125 transition-all duration-300 group">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-inner">🏪</div>
                {/* Enhanced Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl">
                  <div className="font-semibold">OK Zimbabwe</div>
                  <div className="text-xs text-gray-300">Supermarket • 4.2★</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
                {/* Pulse Animation */}
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
              </div>
              
              {/* Professional Delivery Tracking Card */}
              <div className="absolute top-4 right-4 bg-white/98 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-100 max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <Navigation className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">Live Delivery</h3>
                    <p className="text-sm text-gray-600">Order #12345</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">ETA</span>
                    <span className="text-lg font-bold text-green-600">12 min</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Distance</span>
                    <span className="text-sm font-semibold text-gray-900">2.3 km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">In Transit</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">JM</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">John Moyo</p>
                      <p className="text-xs text-gray-600">Driver • 4.8★</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">🏍️</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Motorcycle</p>
                      <p className="text-xs text-gray-600">License: ABC123</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl">
                    <Navigation className="h-4 w-4 mr-2" />
                    Track Driver
                  </Button>
                </div>
              </div>

              {/* Restaurant Pin */}
              <div className="absolute top-2/3 left-1/3 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 group">
                <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center text-white text-xs">🍽️</div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Nandos
                </div>
              </div>

              {/* Professional Delivery Route */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Route Line with better styling */}
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 100 150 Q 200 100 300 200"
                    stroke="url(#routeGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="12,6"
                    className="animate-pulse"
                  />
                  <path
                    d="M 100 150 Q 200 100 300 200"
                    stroke="#ffffff"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="6,3"
                    className="animate-pulse"
                    style={{ animationDelay: '0.3s' }}
                  />
                </svg>
                
                {/* Animated Delivery Truck */}
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm shadow-xl animate-bounce transform -translate-x-1/2 -translate-y-1/2">
                  🚚
                </div>
                
                {/* Start Point - Pickup */}
                <div className="absolute top-1/2 left-1/4 w-5 h-5 bg-red-500 rounded-full border-3 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>
                </div>
                
                {/* Destination - Delivery */}
                <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>
                </div>
              </div>
              
              {/* Hardware Store Pin */}
              <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 group">
                <div className="w-full h-full bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">🔧</div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Hardware Store
                </div>
              </div>
              
              {/* Professional Floating Action Buttons */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-3">
                <Button 
                  size="sm" 
                  className="w-14 h-14 rounded-full shadow-2xl bg-white hover:bg-gray-50 border border-gray-200 hover:scale-105 transition-all duration-200"
                  title="My Location"
                >
                  <Navigation className="h-6 w-6 text-blue-600" />
                </Button>
                <Button 
                  size="sm" 
                  className="w-14 h-14 rounded-full shadow-2xl bg-white hover:bg-gray-50 border border-gray-200 hover:scale-105 transition-all duration-200"
                  title="Map Layers"
                >
                  <Layers className="h-6 w-6 text-gray-600" />
                </Button>
                <Button 
                  size="sm" 
                  className="w-14 h-14 rounded-full shadow-2xl bg-white hover:bg-gray-50 border border-gray-200 hover:scale-105 transition-all duration-200"
                  title="Traffic Info"
                >
                  <Car className="h-6 w-6 text-orange-600" />
                </Button>
                <Button 
                  size="sm" 
                  className="w-14 h-14 rounded-full shadow-2xl bg-white hover:bg-gray-50 border border-gray-200 hover:scale-105 transition-all duration-200"
                  title="Satellite View"
                >
                  <MapPin className="h-6 w-6 text-green-600" />
                </Button>
              </div>
              
              {/* Professional Quick Delivery Status */}
              <div className="absolute bottom-4 left-4 bg-white/98 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-100 max-w-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Active Delivery</h4>
                    <p className="text-xs text-gray-600">Order #12345</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">ETA</span>
                    <span className="text-lg font-bold text-green-600">8 min</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-600">Grocery Delivery</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">In Transit</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">JM</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">John Moyo</p>
                    <p className="text-xs text-gray-600">Driver • 4.8★</p>
                  </div>
                  <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg">
                    Track
                  </Button>
                </div>
              </div>
              
              {/* Residential Area Pin */}
              <div className="absolute bottom-1/4 left-1/2 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 group">
                <div className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">🏠</div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Residential Area
                </div>
              </div>

              {/* Enhanced Parks and Green Areas */}
              <div className="absolute top-1/8 right-1/8 w-20 h-16 bg-gradient-to-br from-green-300 to-green-400 rounded-xl opacity-70 shadow-lg border-2 border-green-200"></div>
              <div className="absolute top-1/8 right-1/8 text-xs font-medium text-green-800 bg-white/95 px-2 py-1 rounded shadow-md border border-green-200 -mt-6">Parirenyatwa Park</div>
              
              <div className="absolute bottom-1/6 left-1/8 w-16 h-10 bg-gradient-to-br from-green-300 to-green-400 rounded-xl opacity-70 shadow-lg border-2 border-green-200"></div>
              <div className="absolute bottom-1/6 left-1/8 text-xs font-medium text-green-800 bg-white/95 px-2 py-1 rounded shadow-md border border-green-200 -mt-6">CBD Gardens</div>

              {/* Transaction Pins with Google Maps Style */}
              {filteredPins.map((pin, index) => (
                <div
                  key={pin.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${15 + (index * 18) % 70}%`,
                    top: `${25 + (index * 22) % 50}%`,
                  }}
                >
                  {/* Google Maps Style Pin */}
                  <div className="relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs shadow-lg border-2 border-white ${getPinColor(pin.type)} hover:scale-110 transition-transform`}>
                      {getPinIcon(pin.type)}
                    </div>
                    {/* Pin Shadow */}
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/20 rounded-full blur-sm"></div>
                  </div>
                  
                  {/* Enhanced Google Maps Style Info Window with ETA */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="bg-white rounded-lg shadow-xl border min-w-[240px] max-w-[300px]">
                      {/* Info Window Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="font-semibold text-sm text-gray-900">{pin.name}</div>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">{pin.seller}</div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-green-600">${pin.amount}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{pin.rating}</span>
                          </div>
                        </div>
                        
                        {/* ETA Section */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-semibold text-gray-900">Travel Time</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {selectedTransportMode === 'driving' && <Car className="h-4 w-4 text-blue-600" />}
                              {selectedTransportMode === 'walking' && <Footprints className="h-4 w-4 text-green-600" />}
                              {selectedTransportMode === 'cycling' && <Bike className="h-4 w-4 text-purple-600" />}
                              {selectedTransportMode === 'public' && <Bus className="h-4 w-4 text-orange-600" />}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {pin.eta[selectedTransportMode as keyof typeof pin.eta]}
                          </div>
                          <div className="text-xs text-gray-600 capitalize">
                            by {selectedTransportMode}
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-3">{pin.date}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs h-8 flex-1">
                            <Navigation className="h-3 w-3 mr-1" />
                            Directions
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-8 flex-1">
                            <Star className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Enhanced Google Maps Style Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button size="sm" variant="outline" className="bg-white/95 backdrop-blur-sm shadow-xl hover:bg-white hover:shadow-2xl h-12 w-12 p-0 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                  <Navigation className="h-5 w-5 text-gray-700" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white/95 backdrop-blur-sm shadow-xl hover:bg-white hover:shadow-2xl h-12 w-12 p-0 border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                  <Layers className="h-5 w-5 text-gray-700" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white/95 backdrop-blur-sm shadow-xl hover:bg-white hover:shadow-2xl h-12 w-12 p-0 border-2 border-gray-200 hover:border-purple-300 transition-all duration-200">
                  <Filter className="h-5 w-5 text-gray-700" />
                </Button>
              </div>

              {/* Enhanced Zoom Controls */}
              <div className="absolute bottom-4 right-4 space-y-1">
                <Button size="sm" variant="outline" className="bg-white/95 backdrop-blur-sm shadow-xl hover:bg-white hover:shadow-2xl h-10 w-10 p-0 text-xl font-bold border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                  +
                </Button>
                <Button size="sm" variant="outline" className="bg-white/95 backdrop-blur-sm shadow-xl hover:bg-white hover:shadow-2xl h-10 w-10 p-0 text-xl font-bold border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                  −
                </Button>
              </div>

              {/* Enhanced Location Info with ETA */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 max-w-sm border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-900">Harare, Zimbabwe</span>
                    <div className="text-xs text-gray-600">Current location</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-700">Transport Mode</span>
                    <div className="flex items-center gap-1">
                      {selectedTransportMode === 'driving' && <Car className="h-3 w-3 text-blue-600" />}
                      {selectedTransportMode === 'walking' && <Footprints className="h-3 w-3 text-green-600" />}
                      {selectedTransportMode === 'cycling' && <Bike className="h-3 w-3 text-purple-600" />}
                      {selectedTransportMode === 'public' && <Bus className="h-3 w-3 text-orange-600" />}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-900 capitalize">
                    {selectedTransportMode}
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 mb-1">
                  {filteredPins.length} transactions • {selectedLayer === 'all' ? 'All types' : selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)} visible
                </div>
                <div className="text-xs text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Enhanced Map Type Toggle */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border-2 border-gray-200">
                <Button size="sm" variant="outline" className="rounded-none border-0 bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 px-4 py-2 font-semibold">
                  Map
                </Button>
                <Button size="sm" variant="outline" className="rounded-none border-0 bg-white hover:bg-gray-50 px-4 py-2 font-semibold text-gray-700">
                  Satellite
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Pin Dialog */}
      <Dialog open={showAddPin} onOpenChange={setShowAddPin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction Pin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Transaction Name</label>
              <Input
                placeholder="e.g., Grocery Purchase"
                value={newPin.name}
                onChange={(e) => setNewPin({ ...newPin, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                className="w-full p-2 border rounded-md"
                value={newPin.type}
                onChange={(e) => setNewPin({ ...newPin, type: e.target.value })}
              >
                <option value="transaction">Transaction</option>
                <option value="service">Service</option>
                <option value="food">Food</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                value={newPin.amount}
                onChange={(e) => setNewPin({ ...newPin, amount: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddPin} className="flex-1">
                Add Pin
              </Button>
              <Button variant="outline" onClick={() => setShowAddPin(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;