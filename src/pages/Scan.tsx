import React, { useState, useRef, useEffect } from "react";
import { Camera, Search, X, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";

const Scan = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const [manualCode, setManualCode] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();

  // Mock product database
  const mockProducts = {
    "123456789012": { name: "Coca Cola 500ml", price: 1.50, image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=200&h=200&fit=crop", category: "Beverages" },
    "234567890123": { name: "Bread Loaf", price: 2.50, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop", category: "Bakery" },
    "345678901234": { name: "iPhone 13 Pro", price: 999.00, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop", category: "Electronics" },
    "456789012345": { name: "Nike Air Max", price: 120.00, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop", category: "Shoes" },
  };

  const startScanning = async () => {
    try {
      setIsScanning(true);
      setError("");
      
      // Simulate camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Simulate scanning after 3 seconds
      setTimeout(() => {
        const codes = Object.keys(mockProducts);
        const randomCode = codes[Math.floor(Math.random() * codes.length)];
        setScannedCode(randomCode);
        setScanResult(mockProducts[randomCode as keyof typeof mockProducts]);
        setIsScanning(false);
        stream.getTracks().forEach(track => track.stop());
      }, 3000);
      
    } catch (err) {
      setError("Camera access denied. Please use manual input.");
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleManualSearch = () => {
    if (manualCode.trim()) {
      const product = mockProducts[manualCode as keyof typeof mockProducts];
      if (product) {
        setScanResult(product);
        setScannedCode(manualCode);
        setError("");
      } else {
        setError("Product not found. Please check the code and try again.");
        setScanResult(null);
      }
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: scannedCode,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: { category: product.category }
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
              <Camera className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Scan & Search
            </h1>
            <p className="text-lg text-muted-foreground">
              Scan barcodes, QR codes, or search manually to find products instantly
            </p>
          </div>

          <SearchBar
            className="max-w-2xl mx-auto"
            placeholder="Search products, scan barcodes, or enter product codes..."
          />
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Scanner Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Product Scanner</h2>
            
            {!isScanning && !scanResult && (
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Camera className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Scan</h3>
                <p className="text-muted-foreground mb-6">
                  Point your camera at a barcode or QR code to identify products instantly
                </p>
                <Button onClick={startScanning} size="lg" className="mr-4">
                  <Camera className="h-5 w-5 mr-2" />
                  Start Scanning
                </Button>
              </div>
            )}

            {isScanning && (
              <div className="text-center py-8">
                <div className="relative w-full max-w-md mx-auto mb-6">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 object-cover rounded-lg border-2 border-primary"
                  />
                  <div className="absolute inset-0 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-primary rounded-lg mb-2"></div>
                      <p className="text-sm font-medium">Position barcode within frame</p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">Scanning for barcodes...</p>
                <Button onClick={stopScanning} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Stop Scanning
                </Button>
              </div>
            )}

            {scanResult && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Product Found!</span>
                </div>
                
                <Card className="p-6">
                  <div className="flex items-start gap-6">
                    <img 
                      src={scanResult.image} 
                      alt={scanResult.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">{scanResult.name}</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl font-bold text-primary">${scanResult.price}</span>
                        <span className="text-sm text-muted-foreground">Code: {scannedCode}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-sm bg-muted px-2 py-1 rounded">{scanResult.category}</span>
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={() => handleAddToCart(scanResult)}>
                          <Search className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setScanResult(null);
                          setScannedCode("");
                        }}>
                          Scan Another
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}
          </Card>

          {/* Manual Search */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Manual Product Search</h2>
            <div className="flex gap-4">
              <Input
                placeholder="Enter product code or barcode..."
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleManualSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Try codes: 123456789012, 234567890123, 345678901234, 456789012345
            </p>
          </Card>

          {/* Recent Scans */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Recent Scans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(mockProducts).slice(0, 3).map(([code, product]) => (
                <div key={code} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-muted-foreground">${product.price}</div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => {
                    setManualCode(code);
                    handleManualSearch();
                  }}>
                    Scan Again
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scan;