import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle,
  AlertCircle,
  Truck,
  User,
  Star,
  Route,
  Timer
} from "lucide-react";

interface DeliveryStatus {
  id: string;
  status: 'preparing' | 'picked_up' | 'in_transit' | 'nearby' | 'arrived' | 'delivered';
  timestamp: Date;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  message?: string;
}

interface Transporter {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  image: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  isOnline: boolean;
}

interface DeliveryTrackingProps {
  transaction: any;
  isOpen: boolean;
  onClose: () => void;
}

const DeliveryTracking = ({ transaction, isOpen, onClose }: DeliveryTrackingProps) => {
  const [currentStatus, setCurrentStatus] = useState<DeliveryStatus>({
    id: '1',
    status: 'preparing',
    timestamp: new Date(),
    message: 'Your order is being prepared by the vendor'
  });
  
  const [transporter, setTransporter] = useState<Transporter>({
    id: 't1',
    name: 'John Moyo',
    phone: '+263 77 123 4567',
    vehicle: 'Motorcycle',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    currentLocation: {
      lat: -17.8252,
      lng: 31.0335
    },
    isOnline: true
  });

  const [eta, setEta] = useState(25);
  const [distance, setDistance] = useState(2.3);
  const [route, setRoute] = useState([
    { lat: -17.8252, lng: 31.0335, name: 'Vendor Location' },
    { lat: -17.8200, lng: 31.0400, name: 'Your Location' }
  ]);

  const statusSteps = [
    { id: 'preparing', label: 'Preparing', icon: CheckCircle, color: 'text-blue-600' },
    { id: 'picked_up', label: 'Picked Up', icon: Truck, color: 'text-orange-600' },
    { id: 'in_transit', label: 'In Transit', icon: Navigation, color: 'text-purple-600' },
    { id: 'nearby', label: 'Nearby', icon: MapPin, color: 'text-yellow-600' },
    { id: 'arrived', label: 'Arrived', icon: AlertCircle, color: 'text-green-600' },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'text-green-600' }
  ];

  // Simulate delivery progress
  useEffect(() => {
    if (!isOpen) return;

    const progressInterval = setInterval(() => {
      setCurrentStatus(prev => {
        const currentIndex = statusSteps.findIndex(step => step.id === prev.status);
        if (currentIndex < statusSteps.length - 1) {
          const nextStatus = statusSteps[currentIndex + 1];
          return {
            id: (Date.now() + 1).toString(),
            status: nextStatus.id as any,
            timestamp: new Date(),
            location: {
              lat: -17.8200 + (Math.random() - 0.5) * 0.01,
              lng: 31.0400 + (Math.random() - 0.5) * 0.01,
              address: 'Approaching your location'
            },
            message: getStatusMessage(nextStatus.id)
          };
        }
        return prev;
      });

      // Update ETA and distance
      setEta(prev => Math.max(0, prev - 2));
      setDistance(prev => Math.max(0, prev - 0.3));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(progressInterval);
  }, [isOpen]);

  const getStatusMessage = (status: string) => {
    const messages = {
      preparing: 'Your order is being prepared by the vendor',
      picked_up: 'Your order has been picked up and is on the way',
      in_transit: 'Your order is in transit to your location',
      nearby: 'Your order is nearby and will arrive soon',
      arrived: 'Your order has arrived at your location',
      delivered: 'Your order has been successfully delivered'
    };
    return messages[status as keyof typeof messages];
  };

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.id === currentStatus.status);
  };

  const handleCallTransporter = () => {
    // In real implementation, this would initiate a phone call
    window.open(`tel:${transporter.phone}`);
  };

  const handleMessageTransporter = () => {
    // In real implementation, this would open messaging
    console.log('Opening chat with transporter');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Track Your Delivery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Order Status</h3>
                <p className="text-sm text-muted-foreground">{currentStatus.message}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ETA: {eta} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {distance.toFixed(1)} km away
                  </span>
                </div>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                {statusSteps.find(s => s.id === currentStatus.status)?.label}
              </Badge>
            </div>
          </Card>

          {/* Progress Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold">Delivery Progress</h3>
            <div className="space-y-3">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= getCurrentStepIndex();
                const isCurrent = index === getCurrentStepIndex();
                
                return (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>
                        {step.label}
                      </div>
                      {isCurrent && currentStatus.timestamp && (
                        <div className="text-sm text-muted-foreground">
                          {currentStatus.timestamp.toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transporter Info */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Your Transporter</h3>
            <div className="flex items-center gap-4">
              <img 
                src={transporter.image} 
                alt={transporter.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{transporter.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{transporter.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{transporter.vehicle}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleCallTransporter}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleMessageTransporter}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Map Placeholder */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Live Location</h3>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Live tracking map</p>
                <p className="text-sm text-muted-foreground">
                  Transporter is {distance.toFixed(1)}km away
                </p>
              </div>
            </div>
          </Card>

          {/* Order Details */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono">#{transaction.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item:</span>
                <span>{transaction.item.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vendor:</span>
                <span>{transaction.vendor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-semibold">${transaction.total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryTracking;
