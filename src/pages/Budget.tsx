import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus, Minus, Target, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

const Budget = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [newItem, setNewItem] = useState({ category: '', amount: 0, type: 'expense' as 'income' | 'expense' });
  const [budgetGoal, setBudgetGoal] = useState(1000);

  useEffect(() => {
    const saved = localStorage.getItem('budgetItems');
    const savedGoal = localStorage.getItem('budgetGoal');
    if (saved) {
      setBudgetItems(JSON.parse(saved));
    }
    if (savedGoal) {
      setBudgetGoal(parseFloat(savedGoal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
    localStorage.setItem('budgetGoal', budgetGoal.toString());
  }, [budgetItems, budgetGoal]);

  const addItem = () => {
    if (newItem.category && newItem.amount > 0) {
      setBudgetItems([...budgetItems, { ...newItem, id: Date.now().toString() }]);
      setNewItem({ category: '', amount: 0, type: 'expense' });
    }
  };

  const removeItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const totalIncome = budgetItems
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = budgetItems
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;
  const goalProgress = budgetGoal > 0 ? (balance / budgetGoal) * 100 : 0;

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
              <Wallet className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Budget Planner
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your income, expenses, and financial goals with smart insights
            </p>
          </div>

          <SearchBar
            className="max-w-2xl mx-auto"
            placeholder="Search for budget categories, financial tips, or savings goals..."
          />
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">${totalIncome.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Income</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">${totalExpenses.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Expenses</div>
            </Card>
            <Card className="p-6 text-center">
              <div className={`text-3xl font-bold mb-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${balance.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Current Balance</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">${budgetGoal.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Budget Goal</div>
            </Card>
          </div>

          {/* Goal Progress */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-semibold">Goal Progress</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress to Goal</span>
                <span className="text-sm text-muted-foreground">{goalProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(goalProgress, 100)}%` }}
                ></div>
              </div>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Set budget goal"
                  value={budgetGoal || ''}
                  onChange={(e) => setBudgetGoal(parseFloat(e.target.value) || 0)}
                  className="flex-1"
                />
                <Button onClick={() => setBudgetGoal(1000)}>Reset</Button>
              </div>
            </div>
          </Card>

          {/* Add New Item */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Add Transaction</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Category (e.g., Food, Rent, Salary)"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={newItem.amount || ''}
                onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) || 0 })}
              />
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'income' | 'expense' })}
                className="px-3 py-2 border rounded-md"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <Button onClick={addItem} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </Card>

          {/* Budget Items */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-3">
              {budgetItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions yet. Add your first income or expense above.
                </div>
              ) : (
                budgetItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {item.type === 'income' ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.type === 'income' ? 'Income' : 'Expense'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Financial Insights */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Financial Insights</h2>
            <div className="space-y-4">
              {balance < 0 && (
                <div className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-medium text-red-800">Over Budget</div>
                    <div className="text-sm text-red-600">You're spending ${Math.abs(balance).toFixed(2)} more than you earn.</div>
                  </div>
                </div>
              )}
              
              {balance > 0 && (
                <div className="flex items-center gap-3 p-4 border border-green-200 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Great Job!</div>
                    <div className="text-sm text-green-600">You're saving ${balance.toFixed(2)} this month.</div>
                  </div>
                </div>
              )}

              {totalExpenses > 0 && (
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">Expense Breakdown</div>
                  <div className="space-y-2">
                    {budgetItems
                      .filter(item => item.type === 'expense')
                      .reduce((acc, item) => {
                        acc[item.category] = (acc[item.category] || 0) + item.amount;
                        return acc;
                      }, {} as Record<string, number>)
                      .map(([category, amount]) => (
                        <div key={category} className="flex justify-between text-sm">
                          <span>{category}</span>
                          <span>${amount.toFixed(2)}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Budget;