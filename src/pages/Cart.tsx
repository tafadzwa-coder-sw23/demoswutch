import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, CreditCard, Smartphone, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, removeFromCart, clear } = useCart();
  const total = items.reduce((sum, i) => sum + (('price' in i.item ? (i.item as any).price : 0) * i.quantity), 0);
  const [splitOpen, setSplitOpen] = useState(false);
  const [people, setPeople] = useState(2);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Cart</h1>
          <div className="flex items-center gap-2">
            {items.length > 0 && <Button variant="outline" size="sm" onClick={clear}>Clear</Button>}
            {items.length > 0 && <Button size="sm" onClick={() => setSplitOpen(true)}>Split payment</Button>}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {items.length === 0 && (
            <div className="text-muted-foreground text-center py-12">Your cart is empty.</div>
          )}

          {items.map(({ id, item, quantity, variant }) => (
            <Card key={id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">
                  Qty: {quantity}
                  {variant?.size && ` • Size: ${variant.size}`}
                  {variant?.color && ` • Color: ${variant.color}`}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {'price' in item && <div className="font-semibold">${(item as any).price.toFixed(2)}</div>}
                <Button variant="outline" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
              </div>
            </Card>
          ))}

          {items.length > 0 && (
            <>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-muted-foreground">Total</div>
                <div className="text-xl font-bold">${total.toFixed(2)}</div>
              </div>
              
              {/* Payment Options */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={() => navigate('/group-payments')}
                  >
                    <Users className="h-6 w-6" />
                    <span>Group Payment</span>
                    <span className="text-xs text-muted-foreground">Split with friends</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <CreditCard className="h-6 w-6" />
                    <span>Card Payment</span>
                    <span className="text-xs text-muted-foreground">Pay with card</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <Smartphone className="h-6 w-6" />
                    <span>Mobile Money</span>
                    <span className="text-xs text-muted-foreground">EcoCash, OneMoney</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <Banknote className="h-6 w-6" />
                    <span>Cash on Delivery</span>
                    <span className="text-xs text-muted-foreground">Pay when delivered</span>
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      <Dialog open={splitOpen} onOpenChange={setSplitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Split payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">People</div>
            <input type="range" min={2} max={10} value={people} onChange={(e) => setPeople(parseInt(e.target.value))} />
            <div className="flex items-center justify-between">
              <div>Participants: {people}</div>
              <div className="font-semibold">Share: ${(people ? (total / people) : 0).toFixed(2)}</div>
            </div>
            <div className="text-sm text-muted-foreground">Share this link with friends (demo):</div>
            <div className="text-xs select-all break-all border rounded p-2">https://swumarket.example/split?id=demo123&n={people}</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;


