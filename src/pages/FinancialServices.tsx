import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CreditCard, 
  DollarSign, 
  Bitcoin, 
  Receipt, 
  TrendingUp, 
  TrendingDown,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpDown,
  Wallet,
  School,
  Zap,
  Wifi,
  Droplets,
  Stethoscope
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useFinancial } from "@/context/FinancialContext";

const FinancialServices = () => {
  const { state, exchangeCurrency, buyCrypto, addBill, payBill, deleteBill } = useFinancial();
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ZWL");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [newBill, setNewBill] = useState({
    name: "",
    category: "electricity" as const,
    amount: "",
    currency: "USD",
    dueDate: "",
    provider: "",
    accountNumber: ""
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electricity': return <Zap className="h-5 w-5" />;
      case 'water': return <Droplets className="h-5 w-5" />;
      case 'internet': return <Wifi className="h-5 w-5" />;
      case 'school': return <School className="h-5 w-5" />;
      case 'medical': return <Stethoscope className="h-5 w-5" />;
      default: return <Receipt className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'electricity': return 'bg-yellow-100 text-yellow-800';
      case 'water': return 'bg-blue-100 text-blue-800';
      case 'internet': return 'bg-purple-100 text-purple-800';
      case 'school': return 'bg-green-100 text-green-800';
      case 'medical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExchange = async () => {
    if (!exchangeAmount || fromCurrency === toCurrency) return;
    
    try {
      const amount = parseFloat(exchangeAmount);
      const transaction = await exchangeCurrency(amount, fromCurrency, toCurrency);
      alert(`Exchange successful! You received ${transaction.total.toFixed(2)} ${toCurrency}`);
      setExchangeAmount("");
    } catch (error) {
      alert('Exchange failed. Please try again.');
    }
  };

  const handleBuyCrypto = async () => {
    if (!cryptoAmount) return;
    
    try {
      const amount = parseFloat(cryptoAmount);
      const transaction = await buyCrypto(amount, selectedCrypto);
      alert(`Crypto purchase successful! You bought ${transaction.total.toFixed(6)} ${selectedCrypto}`);
      setCryptoAmount("");
    } catch (error) {
      alert('Crypto purchase failed. Please try again.');
    }
  };

  const handleAddBill = async () => {
    if (!newBill.name || !newBill.amount || !newBill.dueDate) return;
    
    try {
      await addBill({
        ...newBill,
        amount: parseFloat(newBill.amount)
      });
      setNewBill({
        name: "",
        category: "electricity",
        amount: "",
        currency: "USD",
        dueDate: "",
        provider: "",
        accountNumber: ""
      });
      alert('Bill added successfully!');
    } catch (error) {
      alert('Failed to add bill. Please try again.');
    }
  };

  const handlePayBill = async (billId: string) => {
    try {
      await payBill(billId);
      alert('Bill paid successfully!');
    } catch (error) {
      alert('Payment failed. Please try again.');
    }
  };

  const calculateExchangeRate = () => {
    const from = state.currencies.find(c => c.code === fromCurrency);
    const to = state.currencies.find(c => c.code === toCurrency);
    if (from && to && exchangeAmount) {
      const rate = to.rate / from.rate;
      const amount = parseFloat(exchangeAmount);
      return (amount * rate * 0.99).toFixed(2); // 1% fee
    }
    return "0.00";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search financial services..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <CreditCard className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Financial Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Currency exchange, crypto trading, and bill payments
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Wallet Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Your Wallets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {state.wallets.map((wallet) => (
                  <div key={wallet.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{wallet.currency}</span>
                      <Badge variant={wallet.type === 'crypto' ? 'secondary' : 'default'}>
                        {wallet.type}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">
                      {wallet.balance.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="exchange" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="exchange">Currency Exchange</TabsTrigger>
              <TabsTrigger value="crypto">Crypto Trading</TabsTrigger>
              <TabsTrigger value="bills">Bill Payments</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            {/* Currency Exchange */}
            <TabsContent value="exchange">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="h-6 w-6" />
                    Currency Exchange
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">From</label>
                        <Select value={fromCurrency} onValueChange={setFromCurrency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {state.currencies.map((currency) => (
                              <SelectItem key={currency.code} value={currency.code}>
                                <div className="flex items-center gap-2">
                                  <span>{currency.flag}</span>
                                  <span>{currency.code} - {currency.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Amount</label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={exchangeAmount}
                          onChange={(e) => setExchangeAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">To</label>
                        <Select value={toCurrency} onValueChange={setToCurrency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {state.currencies.map((currency) => (
                              <SelectItem key={currency.code} value={currency.code}>
                                <div className="flex items-center gap-2">
                                  <span>{currency.flag}</span>
                                  <span>{currency.code} - {currency.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">You'll receive</label>
                        <Input
                          value={calculateExchangeRate()}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleExchange} className="w-full" size="lg">
                    Exchange Currency
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Crypto Trading */}
            <TabsContent value="crypto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bitcoin className="h-6 w-6" />
                    Crypto Trading
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Cryptocurrency</label>
                        <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {state.cryptocurrencies.map((crypto) => (
                              <SelectItem key={crypto.code} value={crypto.code}>
                                <div className="flex items-center gap-2">
                                  <span>{crypto.logo}</span>
                                  <span>{crypto.code} - {crypto.name}</span>
                                  <span className="text-sm text-muted-foreground">
                                    ${crypto.price.toLocaleString()}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Amount (USD)</label>
                        <Input
                          type="number"
                          placeholder="Enter amount in USD"
                          value={cryptoAmount}
                          onChange={(e) => setCryptoAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Current Price</label>
                        <div className="p-3 border rounded-lg bg-muted">
                          <div className="text-2xl font-bold">
                            ${state.cryptocurrencies.find(c => c.code === selectedCrypto)?.price.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            {state.cryptocurrencies.find(c => c.code === selectedCrypto)?.change24h && (
                              <>
                                {state.cryptocurrencies.find(c => c.code === selectedCrypto)!.change24h > 0 ? (
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-red-500" />
                                )}
                                <span className={state.cryptocurrencies.find(c => c.code === selectedCrypto)!.change24h > 0 ? 'text-green-500' : 'text-red-500'}>
                                  {state.cryptocurrencies.find(c => c.code === selectedCrypto)!.change24h}%
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">You'll receive</label>
                        <Input
                          value={cryptoAmount ? (parseFloat(cryptoAmount) / (state.cryptocurrencies.find(c => c.code === selectedCrypto)?.price || 1) * 0.98).toFixed(6) : "0.000000"}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleBuyCrypto} className="w-full" size="lg">
                    Buy {selectedCrypto}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bill Payments */}
            <TabsContent value="bills">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-6 w-6" />
                        Your Bills
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bill
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Bill</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Bill Name</label>
                              <Input
                                value={newBill.name}
                                onChange={(e) => setNewBill({...newBill, name: e.target.value})}
                                placeholder="e.g., ZESA Electricity"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Category</label>
                              <Select value={newBill.category} onValueChange={(value: any) => setNewBill({...newBill, category: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="electricity">Electricity</SelectItem>
                                  <SelectItem value="water">Water</SelectItem>
                                  <SelectItem value="internet">Internet</SelectItem>
                                  <SelectItem value="school">School Fees</SelectItem>
                                  <SelectItem value="medical">Medical</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Amount</label>
                                <Input
                                  type="number"
                                  value={newBill.amount}
                                  onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                                  placeholder="0.00"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Currency</label>
                                <Select value={newBill.currency} onValueChange={(value) => setNewBill({...newBill, currency: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {state.currencies.map((currency) => (
                                      <SelectItem key={currency.code} value={currency.code}>
                                        {currency.code}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Due Date</label>
                              <Input
                                type="date"
                                value={newBill.dueDate}
                                onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Provider</label>
                              <Input
                                value={newBill.provider}
                                onChange={(e) => setNewBill({...newBill, provider: e.target.value})}
                                placeholder="e.g., ZESA"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Account Number</label>
                              <Input
                                value={newBill.accountNumber}
                                onChange={(e) => setNewBill({...newBill, accountNumber: e.target.value})}
                                placeholder="Account number"
                              />
                            </div>
                            <Button onClick={handleAddBill} className="w-full">
                              Add Bill
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {state.bills.map((bill) => (
                        <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${getCategoryColor(bill.category)}`}>
                              {getCategoryIcon(bill.category)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{bill.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {bill.provider} • Due: {new Date(bill.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {bill.currency} {bill.amount}
                              </div>
                              <div className="flex items-center gap-1">
                                {bill.isPaid ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm text-green-500">Paid</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm text-orange-500">Pending</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {!bill.isPaid && (
                              <Button onClick={() => handlePayBill(bill.id)}>
                                Pay Now
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Transactions */}
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'exchange' ? 'bg-blue-100 text-blue-800' :
                            transaction.type === 'crypto' ? 'bg-orange-100 text-orange-800' :
                            transaction.type === 'payment' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {transaction.type === 'exchange' ? <ArrowUpDown className="h-5 w-5" /> :
                             transaction.type === 'crypto' ? <Bitcoin className="h-5 w-5" /> :
                             transaction.type === 'payment' ? <Receipt className="h-5 w-5" /> :
                             <CreditCard className="h-5 w-5" />}
                          </div>
                          <div>
                            <h3 className="font-semibold">{transaction.description}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {transaction.fromCurrency} {transaction.amount}
                            {transaction.toCurrency !== transaction.fromCurrency && (
                              <span className="text-sm text-muted-foreground">
                                → {transaction.toCurrency} {transaction.total.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {transaction.status === 'completed' ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500">Completed</span>
                              </>
                            ) : transaction.status === 'pending' ? (
                              <>
                                <Clock className="h-4 w-4 text-orange-500" />
                                <span className="text-sm text-orange-500">Pending</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 text-red-500" />
                                <span className="text-sm text-red-500">Failed</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default FinancialServices;

