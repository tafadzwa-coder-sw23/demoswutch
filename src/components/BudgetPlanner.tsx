import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

const BudgetPlanner = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [newItem, setNewItem] = useState({ category: '', amount: 0, type: 'expense' as 'income' | 'expense' });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('budgetItems');
    if (saved) {
      setBudgetItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
  }, [budgetItems]);

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

  return (
    <Card className="w-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Budget Planner</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Income</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Expenses</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${balance.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">Balance</div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {/* Add New Item */}
            <div className="flex gap-2">
              <Input
                placeholder="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Amount"
                value={newItem.amount || ''}
                onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) || 0 })}
                className="w-24"
              />
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'income' | 'expense' })}
                className="px-3 py-2 border rounded-md"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <Button onClick={addItem} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Budget Items */}
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {budgetItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="flex items-center gap-2">
                    {item.type === 'income' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">${item.amount.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BudgetPlanner;
