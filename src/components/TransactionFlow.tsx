import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EnhancedComparison from "./EnhancedComparison";
import NegotiationChat from "./NegotiationChat";
import PaymentDeliveryFlow from "./PaymentDeliveryFlow";
import DeliveryTracking from "./DeliveryTracking";
import { 
  ShoppingCart, 
  MessageCircle, 
  CreditCard, 
  Truck, 
  CheckCircle,
  Star,
  ThumbsUp,
  Share2
} from "lucide-react";

interface TransactionFlowProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionFlow = ({ item, isOpen, onClose }: TransactionFlowProps) => {
  const [currentStep, setCurrentStep] = useState<'comparison' | 'negotiation' | 'payment' | 'tracking' | 'completed'>('comparison');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [agreement, setAgreement] = useState<any>(null);
  const [transaction, setTransaction] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // Mock vendors data
  const vendors = [
    {
      id: 'v1',
      name: 'Mai Sarah Fresh Produce',
      rating: 4.8,
      reviews: 234,
      distance: '0.2km',
      deliveryTime: '30 min',
      price: item.price * 0.9,
      originalPrice: item.price,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop',
      verified: true,
      specialties: ['Fresh Vegetables', 'Local Produce'],
      isOnline: true,
      responseTime: '5 min',
      trustScore: 9.2,
      deliveryFee: 2.50,
      minimumOrder: 5.00,
      paymentMethods: ['Cash', 'Mobile Money'],
      features: ['Organic', 'Fresh Daily', 'Local Sourced']
    },
    {
      id: 'v2',
      name: 'OK Zimbabwe',
      rating: 4.2,
      reviews: 1567,
      distance: '0.5km',
      deliveryTime: '45 min',
      price: item.price,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
      verified: true,
      specialties: ['Groceries', 'Household Items'],
      isOnline: true,
      responseTime: '10 min',
      trustScore: 8.5,
      deliveryFee: 5.00,
      minimumOrder: 10.00,
      paymentMethods: ['Cash', 'Card', 'Mobile Money'],
      features: ['Branded Products', 'Guaranteed Quality', 'Fast Delivery']
    },
    {
      id: 'v3',
      name: 'Brother John BBQ & Groceries',
      rating: 4.7,
      reviews: 89,
      distance: '0.8km',
      deliveryTime: '25 min',
      price: item.price * 0.85,
      originalPrice: item.price,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop',
      verified: true,
      specialties: ['BBQ Meat', 'Spices'],
      isOnline: true,
      responseTime: '3 min',
      trustScore: 9.0,
      deliveryFee: 3.00,
      minimumOrder: 8.00,
      paymentMethods: ['Cash', 'Mobile Money'],
      features: ['Family Business', 'Personal Service', 'Fresh Daily']
    }
  ];

  const handleVendorSelect = (vendor: any) => {
    console.log('Vendor selected:', vendor);
    setSelectedVendor(vendor);
    setCurrentStep('negotiation');
  };

  const handleNegotiate = (vendor: any) => {
    setSelectedVendor(vendor);
    setCurrentStep('negotiation');
  };

  const handleAgreement = (agreementData: any) => {
    console.log('Agreement reached:', agreementData);
    setAgreement(agreementData);
    // Small delay to show the agreement was reached
    setTimeout(() => {
      setCurrentStep('payment');
    }, 500);
  };

  const handlePaymentComplete = (transactionData: any) => {
    console.log('Payment completed:', transactionData);
    setTransaction(transactionData);
    setPaymentMethod(transactionData.paymentMethod || 'cash');
    setCurrentStep('tracking');
  };

  const handleDeliveryComplete = () => {
    setCurrentStep('completed');
  };

  const handleNextStep = () => {
    const steps = ['comparison', 'negotiation', 'payment', 'tracking', 'completed'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      // Check if we can proceed to next step
      if (nextStep === 'negotiation' && selectedVendor) {
        setCurrentStep('negotiation');
      } else if (nextStep === 'payment' && agreement) {
        setCurrentStep('payment');
      } else if (nextStep === 'tracking' && transaction) {
        setCurrentStep('tracking');
      } else if (nextStep === 'completed' && currentStep === 'tracking') {
        setCurrentStep('completed');
      }
    }
  };

  const handlePreviousStep = () => {
    const steps = ['comparison', 'negotiation', 'payment', 'tracking', 'completed'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1] as any);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'comparison':
        return selectedVendor !== null;
      case 'negotiation':
        return agreement !== null;
      case 'payment':
        return agreement !== null; // Can proceed if we have an agreement
      case 'tracking':
        return transaction !== null; // Need transaction to track
      default:
        return false;
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'comparison', label: 'Compare', icon: ShoppingCart },
      { id: 'negotiation', label: 'Negotiate', icon: MessageCircle },
      { id: 'payment', label: 'Pay', icon: CreditCard },
      { id: 'tracking', label: 'Track', icon: Truck },
      { id: 'completed', label: 'Complete', icon: CheckCircle }
    ];

    const getStepStatus = (stepId: string, stepIndex: number) => {
      const currentIndex = steps.findIndex(s => s.id === currentStep);
      if (currentIndex > stepIndex) return 'completed';
      if (currentIndex === stepIndex) return 'active';
      return 'pending';
    };

  const canNavigateToStep = (stepId: string, stepIndex: number) => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    // Can always go back to previous steps
    if (stepIndex < currentIndex) return true;
    
    // Allow navigation to next step if current step is completed
    if (stepIndex === currentIndex + 1) {
      switch (currentStep) {
        case 'comparison':
          return selectedVendor !== null;
        case 'negotiation':
          return agreement !== null;
        case 'payment':
          return transaction !== null;
        case 'tracking':
          return true;
        default:
          return false;
      }
    }
    
    // For other forward steps, require all previous steps to be completed
    if (stepId === 'negotiation') {
      return selectedVendor !== null;
    }
    if (stepId === 'payment') {
      return selectedVendor !== null && agreement !== null;
    }
    if (stepId === 'tracking') {
      return selectedVendor !== null && agreement !== null && transaction !== null;
    }
    if (stepId === 'completed') {
      return selectedVendor !== null && agreement !== null && transaction !== null;
    }
    
    return false;
  };

    const handleStepClick = (stepId: string, stepIndex: number) => {
      if (canNavigateToStep(stepId, stepIndex)) {
        setCurrentStep(stepId as any);
      }
    };

    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id, index);
            const canNavigate = canNavigateToStep(step.id, index);
            
            return (
              <React.Fragment key={step.id}>
                <div 
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    canNavigate ? 'cursor-pointer' : 'cursor-not-allowed'
                  } ${
                    status === 'active' ? 'bg-primary text-primary-foreground shadow-md' : 
                    status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' : 
                    canNavigate ? 'bg-muted hover:bg-muted/80 border border-muted-foreground/20' : 'bg-muted opacity-50'
                  }`}
                  onClick={() => handleStepClick(step.id, index)}
                  title={canNavigate ? `Go to ${step.label}` : 'Complete previous steps first'}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{step.label}</span>
                  {status === 'completed' && (
                    <CheckCircle className="h-3 w-3 ml-1 text-green-600" />
                  )}
                  {status === 'active' && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse ml-1" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${
                    status === 'completed' ? 'bg-green-300' : 'bg-muted'
                  }`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCompletedStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Order Delivered Successfully!</h2>
        <p className="text-muted-foreground">
          Your order has been delivered and confirmed. Thank you for using Swumarket!
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img 
              src={transaction.item.image} 
              alt={transaction.item.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="text-left">
              <h3 className="font-semibold">{transaction.item.title}</h3>
              <p className="text-sm text-muted-foreground">From {transaction.vendor.name}</p>
              <p className="text-lg font-bold">${transaction.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Order ID:</span>
              <span className="ml-2 font-mono">#{Date.now().toString().slice(-6)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Delivered:</span>
              <span className="ml-2">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold">Rate Your Experience</h3>
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">How was your experience?</p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          <ThumbsUp className="h-4 w-4 mr-2" />
          Leave Review
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button onClick={onClose} className="flex-1">
          Done
        </Button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Complete Your Purchase
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepIndicator()}
          
          {currentStep === 'comparison' && (
            <EnhancedComparison
              item={item}
              vendors={vendors}
              onVendorSelect={handleVendorSelect}
              onNegotiate={handleNegotiate}
            />
          )}

          {currentStep === 'negotiation' && selectedVendor && (
            <div className="space-y-4">
              <NegotiationChat
                vendor={selectedVendor}
                item={item}
                isOpen={true}
                onClose={() => setCurrentStep('comparison')}
                onAgreement={handleAgreement}
              />
              
              {/* Fallback: Skip negotiation button */}
              <div className="flex justify-center pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    // Auto-complete negotiation with vendor's price
                    handleAgreement({
                      vendor: selectedVendor,
                      item: item,
                      agreedPrice: selectedVendor.price,
                      timestamp: new Date()
                    });
                  }}
                  className="text-sm"
                >
                  Skip Negotiation & Use Vendor Price (${selectedVendor.price.toFixed(2)})
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'payment' && agreement && (
            <PaymentDeliveryFlow
              agreement={agreement}
              onComplete={handlePaymentComplete}
              onBack={() => setCurrentStep('negotiation')}
            />
          )}

          {currentStep === 'tracking' && transaction && (
            <DeliveryTracking
              transaction={transaction}
              isOpen={true}
              onClose={() => setCurrentStep('completed')}
            />
          )}

          {currentStep === 'completed' && renderCompletedStep()}

          {/* Navigation Controls */}
          {currentStep !== 'completed' && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
                disabled={currentStep === 'comparison'}
                className="flex items-center gap-2"
              >
                ← Previous
              </Button>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Step {['comparison', 'negotiation', 'payment', 'tracking', 'completed'].indexOf(currentStep) + 1} of 5
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ 
                      width: `${((['comparison', 'negotiation', 'payment', 'tracking', 'completed'].indexOf(currentStep) + 1) / 5) * 100}%` 
                    }}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleNextStep}
                disabled={!canProceedToNext()}
                className="flex items-center gap-2"
              >
                {currentStep === 'tracking' ? 'Complete Order' : 'Next →'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionFlow;
