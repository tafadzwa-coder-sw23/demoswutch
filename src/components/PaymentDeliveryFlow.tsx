import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  MapPin, 
  Truck, 
  Clock, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Navigation,
  Package,
  User,
  Phone,
  Star
} from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  fee: number;
  available: boolean;
  processingTime: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
  features: string[];
  icon: React.ComponentType<any>;
}

interface Transporter {
  id: string;
  name: string;
  rating: number;
  vehicle: string;
  estimatedArrival: string;
  distance: string;
  price: number;
  image: string;
  isOnline: boolean;
}

interface PaymentDeliveryFlowProps {
  agreement: any;
  onComplete: (transaction: any) => void;
  onBack: () => void;
}

const PaymentDeliveryFlow = ({ agreement, onComplete, onBack }: PaymentDeliveryFlowProps) => {
  const [step, setStep] = useState<'payment' | 'payment_processing' | 'delivery' | 'transporter' | 'confirmation'>('payment');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('');
  const [selectedTransporter, setSelectedTransporter] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: Banknote,
      description: 'Pay when the item is delivered',
      fee: 0,
      available: true,
      processingTime: 'Immediate'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Pay via mobile money transfer',
      fee: 2.50,
      available: true,
      processingTime: '1-2 minutes'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: CreditCard,
      description: 'Direct bank transfer',
      fee: 5.00,
      available: true,
      processingTime: '5-10 minutes'
    },
    {
      id: 'escrow',
      name: 'Escrow Protection',
      icon: Shield,
      description: 'Secure payment held until delivery confirmation',
      fee: 3.00,
      available: true,
      processingTime: 'Immediate'
    }
  ];

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'pickup',
      name: 'Pickup',
      description: 'Collect from vendor location',
      price: 0,
      estimatedTime: 'Immediate',
      features: ['No delivery fee', 'Immediate collection', 'Meet vendor directly'],
      icon: MapPin
    },
    {
      id: 'delivery',
      name: 'Home Delivery',
      description: 'Delivered to your address',
      price: 5.00,
      estimatedTime: '30-60 minutes',
      features: ['Door-to-door delivery', 'Real-time tracking', 'Delivery confirmation'],
      icon: Truck
    },
    {
      id: 'pickup_point',
      name: 'Pickup Point',
      description: 'Collect from designated pickup location',
      price: 2.00,
      estimatedTime: '15-30 minutes',
      features: ['Secure pickup point', 'Extended hours', 'Multiple locations'],
      icon: Package
    }
  ];

  const transporters: Transporter[] = [
    {
      id: 't1',
      name: 'John Moyo',
      rating: 4.8,
      vehicle: 'Motorcycle',
      estimatedArrival: '25 min',
      distance: '2.3 km',
      price: 4.50,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      isOnline: true
    },
    {
      id: 't2',
      name: 'Sarah Chikwava',
      rating: 4.9,
      vehicle: 'Bicycle',
      estimatedArrival: '35 min',
      distance: '1.8 km',
      price: 3.00,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      isOnline: true
    },
    {
      id: 't3',
      name: 'Mike Transport',
      rating: 4.6,
      vehicle: 'Van',
      estimatedArrival: '45 min',
      distance: '4.1 km',
      price: 8.00,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      isOnline: false
    }
  ];

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
    
    // If cash on delivery, skip payment processing and go to delivery
    if (paymentId === 'cash') {
      setStep('delivery');
    } else {
      // For prepaid methods, go to payment processing first
      setStep('payment_processing');
    }
  };

  const handleDeliverySelect = (deliveryId: string) => {
    setSelectedDelivery(deliveryId);
    if (deliveryId === 'pickup') {
      setStep('confirmation');
    } else {
      setStep('transporter');
    }
  };

  const handleTransporterSelect = (transporterId: string) => {
    setSelectedTransporter(transporterId);
    setStep('confirmation');
  };

  const handlePaymentProcessingComplete = () => {
    // After successful payment processing, proceed to delivery
    setStep('delivery');
  };

  const calculateTotal = () => {
    const basePrice = agreement.agreedPrice;
    const paymentFee = paymentMethods.find(p => p.id === selectedPayment)?.fee || 0;
    const deliveryPrice = deliveryOptions.find(d => d.id === selectedDelivery)?.price || 0;
    const transporterPrice = selectedTransporter ? 
      transporters.find(t => t.id === selectedTransporter)?.price || 0 : 0;
    
    return basePrice + paymentFee + deliveryPrice + transporterPrice;
  };

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Payment Method</h2>
        <p className="text-muted-foreground">Select how you'd like to pay for your order</p>
      </div>

      <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
        <div className="space-y-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.id} className="relative">
                <Label htmlFor={method.id} className="cursor-pointer">
                  <Card className={`p-4 hover:shadow-md transition-all ${
                    selectedPayment === method.id ? 'ring-2 ring-primary' : ''
                  }`}>
                    <div className="flex items-center gap-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{method.name}</h3>
                          {method.available ? (
                            <Badge className="bg-green-100 text-green-800">Available</Badge>
                          ) : (
                            <Badge variant="destructive">Unavailable</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {method.processingTime}
                          </span>
                          <span className="font-medium">
                            Fee: {method.fee === 0 ? 'Free' : `$${method.fee.toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                      <RadioGroupItem value={method.id} id={method.id} />
                    </div>
                  </Card>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button 
          onClick={() => handlePaymentSelect(selectedPayment)}
          disabled={!selectedPayment}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderPaymentProcessingStep = () => {
    const selectedMethod = paymentMethods.find(p => p.id === selectedPayment);
    const Icon = selectedMethod?.icon || CreditCard;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
          <p className="text-muted-foreground">
            Processing your {selectedMethod?.name} payment...
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium">{selectedMethod?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-bold text-lg">${agreement.agreedPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Processing Fee:</span>
              <span className="font-medium">${selectedMethod?.fee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">${(agreement.agreedPrice + (selectedMethod?.fee || 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Simulate payment processing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm">Validating payment method</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm">Processing payment</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm">Confirming transaction</span>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep('payment')}>
            Back
          </Button>
          <Button onClick={handlePaymentProcessingComplete}>
            Payment Successful - Continue
          </Button>
        </div>
      </div>
    );
  };

  const renderDeliveryStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Delivery Option</h2>
        <p className="text-muted-foreground">How would you like to receive your order?</p>
      </div>

      <RadioGroup value={selectedDelivery} onValueChange={setSelectedDelivery}>
        <div className="space-y-4">
          {deliveryOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.id} className="relative">
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card className={`p-4 hover:shadow-md transition-all ${
                    selectedDelivery === option.id ? 'ring-2 ring-primary' : ''
                  }`}>
                    <div className="flex items-center gap-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{option.name}</h3>
                          <Badge variant="outline">{option.estimatedTime}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="font-medium">
                            {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {option.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <RadioGroupItem value={option.id} id={option.id} />
                    </div>
                  </Card>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>

      {selectedDelivery === 'delivery' && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Delivery Address</h3>
          <Input
            placeholder="Enter your full address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="mb-3"
          />
          <Input
            placeholder="Special instructions (optional)"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('payment')}>Back</Button>
        <Button 
          onClick={() => handleDeliverySelect(selectedDelivery)}
          disabled={!selectedDelivery || (selectedDelivery === 'delivery' && !deliveryAddress)}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderTransporterStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Transporter</h2>
        <p className="text-muted-foreground">Select a delivery person for your order</p>
      </div>

      <div className="space-y-4">
        {transporters.map((transporter) => (
          <Card 
            key={transporter.id} 
            className={`p-4 hover:shadow-md transition-all cursor-pointer ${
              selectedTransporter === transporter.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedTransporter(transporter.id)}
          >
            <div className="flex items-center gap-4">
              <img 
                src={transporter.image} 
                alt={transporter.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{transporter.name}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {transporter.rating}
                  </span>
                  <span>{transporter.vehicle}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {transporter.estimatedArrival}
                  </span>
                  <span className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {transporter.distance}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">${transporter.price.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Delivery fee</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('delivery')}>Back</Button>
        <Button 
          onClick={() => handleTransporterSelect(selectedTransporter)}
          disabled={!selectedTransporter}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Confirm Your Order</h2>
        <p className="text-muted-foreground">Review your order details before proceeding</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img 
              src={agreement.item.image} 
              alt={agreement.item.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">{agreement.item.title}</h3>
              <p className="text-sm text-muted-foreground">From {agreement.vendor.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Payment:</span>
              <span className="ml-2 font-medium">
                {paymentMethods.find(p => p.id === selectedPayment)?.name}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Delivery:</span>
              <span className="ml-2 font-medium">
                {deliveryOptions.find(d => d.id === selectedDelivery)?.name}
              </span>
            </div>
            {selectedTransporter && (
              <div>
                <span className="text-muted-foreground">Transporter:</span>
                <span className="ml-2 font-medium">
                  {transporters.find(t => t.id === selectedTransporter)?.name}
                </span>
              </div>
            )}
            {deliveryAddress && (
              <div>
                <span className="text-muted-foreground">Address:</span>
                <span className="ml-2 font-medium">{deliveryAddress}</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Item Price:</span>
                <span>${agreement.agreedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Fee:</span>
                <span>${paymentMethods.find(p => p.id === selectedPayment)?.fee.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>${deliveryOptions.find(d => d.id === selectedDelivery)?.price.toFixed(2) || '0.00'}</span>
              </div>
              {selectedTransporter && (
                <div className="flex justify-between">
                  <span>Transporter:</span>
                  <span>${transporters.find(t => t.id === selectedTransporter)?.price.toFixed(2) || '0.00'}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('transporter')}>Back</Button>
        <Button 
          onClick={() => onComplete({
            agreement,
            payment: selectedPayment,
            paymentMethod: selectedPayment,
            delivery: selectedDelivery,
            transporter: selectedTransporter,
            address: deliveryAddress,
            instructions: specialInstructions,
            total: calculateTotal(),
            vendor: agreement.vendor,
            item: agreement.item
          })}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirm Order
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Complete Your Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'payment' && renderPaymentStep()}
          {step === 'payment_processing' && renderPaymentProcessingStep()}
          {step === 'delivery' && renderDeliveryStep()}
          {step === 'transporter' && renderTransporterStep()}
          {step === 'confirmation' && renderConfirmationStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDeliveryFlow;
