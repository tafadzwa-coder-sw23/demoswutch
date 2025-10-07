import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Financial Services Types
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate to USD
  flag: string;
}

export interface CryptoCurrency {
  code: string;
  name: string;
  symbol: string;
  price: number; // Price in USD
  change24h: number; // 24h change percentage
  logo: string;
}

export interface Bill {
  id: string;
  name: string;
  category: 'electricity' | 'water' | 'internet' | 'school' | 'medical' | 'other';
  amount: number;
  currency: string;
  dueDate: string;
  isPaid: boolean;
  provider: string;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  type: 'exchange' | 'payment' | 'transfer' | 'crypto';
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  fee: number;
  total: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
}

export interface Wallet {
  id: string;
  currency: string;
  balance: number;
  type: 'fiat' | 'crypto';
}

interface FinancialState {
  currencies: Currency[];
  cryptocurrencies: CryptoCurrency[];
  bills: Bill[];
  transactions: Transaction[];
  wallets: Wallet[];
  exchangeRates: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}

type FinancialAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENCIES'; payload: Currency[] }
  | { type: 'SET_CRYPTOS'; payload: CryptoCurrency[] }
  | { type: 'SET_BILLS'; payload: Bill[] }
  | { type: 'ADD_BILL'; payload: Bill }
  | { type: 'UPDATE_BILL'; payload: Bill }
  | { type: 'DELETE_BILL'; payload: string }
  | { type: 'PAY_BILL'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'SET_WALLETS'; payload: Wallet[] }
  | { type: 'UPDATE_WALLET'; payload: Wallet }
  | { type: 'SET_EXCHANGE_RATES'; payload: Record<string, number> };

const initialState: FinancialState = {
  currencies: [],
  cryptocurrencies: [],
  bills: [],
  transactions: [],
  wallets: [],
  exchangeRates: {},
  isLoading: false,
  error: null,
};

const financialReducer = (state: FinancialState, action: FinancialAction): FinancialState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CURRENCIES':
      return { ...state, currencies: action.payload };
    case 'SET_CRYPTOS':
      return { ...state, cryptocurrencies: action.payload };
    case 'SET_BILLS':
      return { ...state, bills: action.payload };
    case 'ADD_BILL':
      return { ...state, bills: [...state.bills, action.payload] };
    case 'UPDATE_BILL':
      return {
        ...state,
        bills: state.bills.map(bill => 
          bill.id === action.payload.id ? action.payload : bill
        )
      };
    case 'DELETE_BILL':
      return {
        ...state,
        bills: state.bills.filter(bill => bill.id !== action.payload)
      };
    case 'PAY_BILL':
      return {
        ...state,
        bills: state.bills.map(bill =>
          bill.id === action.payload ? { ...bill, isPaid: true } : bill
        )
      };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'SET_WALLETS':
      return { ...state, wallets: action.payload };
    case 'UPDATE_WALLET':
      return {
        ...state,
        wallets: state.wallets.map(wallet =>
          wallet.id === action.payload.id ? action.payload : wallet
        )
      };
    case 'SET_EXCHANGE_RATES':
      return { ...state, exchangeRates: action.payload };
    default:
      return state;
  }
};

const FinancialContext = createContext<{
  state: FinancialState;
  dispatch: React.Dispatch<FinancialAction>;
  // Actions
  loadCurrencies: () => Promise<void>;
  loadCryptocurrencies: () => Promise<void>;
  loadBills: () => Promise<void>;
  addBill: (bill: Omit<Bill, 'id'>) => Promise<void>;
  updateBill: (bill: Bill) => Promise<void>;
  deleteBill: (id: string) => Promise<void>;
  payBill: (id: string) => Promise<void>;
  exchangeCurrency: (amount: number, from: string, to: string) => Promise<Transaction>;
  buyCrypto: (amount: number, crypto: string) => Promise<Transaction>;
  loadWallets: () => Promise<void>;
  loadExchangeRates: () => Promise<void>;
} | null>(null);

export const FinancialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financialReducer, initialState);

  // Load currencies
  const loadCurrencies = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock data - in real app, fetch from API
      const currencies: Currency[] = [
        { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1, flag: '🇺🇸' },
        { code: 'ZWL', name: 'Zimbabwe Dollar', symbol: 'Z$', rate: 0.0027, flag: '🇿🇼' },
        { code: 'EUR', name: 'Euro', symbol: '€', rate: 1.08, flag: '🇪🇺' },
        { code: 'GBP', name: 'British Pound', symbol: '£', rate: 1.27, flag: '🇬🇧' },
        { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 0.055, flag: '🇿🇦' },
        { code: 'BWP', name: 'Botswana Pula', symbol: 'P', rate: 0.074, flag: '🇧🇼' },
        { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 0.00066, flag: '🇳🇬' },
        { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rate: 0.0067, flag: '🇰🇪' },
      ];
      dispatch({ type: 'SET_CURRENCIES', payload: currencies });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load currencies' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Load cryptocurrencies
  const loadCryptocurrencies = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const cryptos: CryptoCurrency[] = [
        { code: 'BTC', name: 'Bitcoin', symbol: '₿', price: 43250, change24h: 2.5, logo: '₿' },
        { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', price: 2650, change24h: 1.8, logo: 'Ξ' },
        { code: 'USDT', name: 'Tether', symbol: '₮', price: 1.00, change24h: 0.1, logo: '₮' },
        { code: 'USDC', name: 'USD Coin', symbol: '◉', price: 1.00, change24h: 0.05, logo: '◉' },
        { code: 'ADA', name: 'Cardano', symbol: '₳', price: 0.45, change24h: -1.2, logo: '₳' },
        { code: 'DOT', name: 'Polkadot', symbol: '●', price: 6.80, change24h: 3.1, logo: '●' },
      ];
      dispatch({ type: 'SET_CRYPTOS', payload: cryptos });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cryptocurrencies' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Load bills
  const loadBills = async () => {
    try {
      const savedBills = localStorage.getItem('swumarket_bills');
      if (savedBills) {
        const bills = JSON.parse(savedBills);
        dispatch({ type: 'SET_BILLS', payload: bills });
      } else {
        // Mock bills
        const mockBills: Bill[] = [
          {
            id: '1',
            name: 'ZESA Electricity',
            category: 'electricity',
            amount: 45.50,
            currency: 'USD',
            dueDate: '2024-01-15',
            isPaid: false,
            provider: 'ZESA',
            accountNumber: 'ZESA123456'
          },
          {
            id: '2',
            name: 'University Fees',
            category: 'school',
            amount: 250.00,
            currency: 'USD',
            dueDate: '2024-01-20',
            isPaid: false,
            provider: 'University of Zimbabwe',
            accountNumber: 'UZ2024001'
          },
          {
            id: '3',
            name: 'Econet Internet',
            category: 'internet',
            amount: 25.00,
            currency: 'USD',
            dueDate: '2024-01-10',
            isPaid: true,
            provider: 'Econet',
            accountNumber: 'ECONET789'
          }
        ];
        dispatch({ type: 'SET_BILLS', payload: mockBills });
        localStorage.setItem('swumarket_bills', JSON.stringify(mockBills));
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load bills' });
    }
  };

  // Add bill
  const addBill = async (billData: Omit<Bill, 'id'>) => {
    const newBill: Bill = {
      ...billData,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_BILL', payload: newBill });
    
    // Update localStorage
    const updatedBills = [...state.bills, newBill];
    localStorage.setItem('swumarket_bills', JSON.stringify(updatedBills));
  };

  // Update bill
  const updateBill = async (bill: Bill) => {
    dispatch({ type: 'UPDATE_BILL', payload: bill });
    
    // Update localStorage
    const updatedBills = state.bills.map(b => b.id === bill.id ? bill : b);
    localStorage.setItem('swumarket_bills', JSON.stringify(updatedBills));
  };

  // Delete bill
  const deleteBill = async (id: string) => {
    dispatch({ type: 'DELETE_BILL', payload: id });
    
    // Update localStorage
    const updatedBills = state.bills.filter(b => b.id !== id);
    localStorage.setItem('swumarket_bills', JSON.stringify(updatedBills));
  };

  // Pay bill
  const payBill = async (id: string) => {
    dispatch({ type: 'PAY_BILL', payload: id });
    
    // Add transaction
    const bill = state.bills.find(b => b.id === id);
    if (bill) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'payment',
        amount: bill.amount,
        fromCurrency: bill.currency,
        toCurrency: bill.currency,
        rate: 1,
        fee: 0,
        total: bill.amount,
        timestamp: new Date().toISOString(),
        status: 'completed',
        description: `Payment for ${bill.name}`
      };
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }
    
    // Update localStorage
    const updatedBills = state.bills.map(b => b.id === id ? { ...b, isPaid: true } : b);
    localStorage.setItem('swumarket_bills', JSON.stringify(updatedBills));
  };

  // Exchange currency
  const exchangeCurrency = async (amount: number, from: string, to: string): Promise<Transaction> => {
    const fromCurrency = state.currencies.find(c => c.code === from);
    const toCurrency = state.currencies.find(c => c.code === to);
    
    if (!fromCurrency || !toCurrency) {
      throw new Error('Currency not found');
    }

    const rate = toCurrency.rate / fromCurrency.rate;
    const fee = amount * 0.01; // 1% fee
    const total = (amount * rate) - fee;

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'exchange',
      amount,
      fromCurrency: from,
      toCurrency: to,
      rate,
      fee,
      total,
      timestamp: new Date().toISOString(),
      status: 'completed',
      description: `Exchange ${amount} ${from} to ${to}`
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    return transaction;
  };

  // Buy crypto
  const buyCrypto = async (amount: number, crypto: string): Promise<Transaction> => {
    const cryptoCurrency = state.cryptocurrencies.find(c => c.code === crypto);
    
    if (!cryptoCurrency) {
      throw new Error('Cryptocurrency not found');
    }

    const cryptoAmount = amount / cryptoCurrency.price;
    const fee = amount * 0.02; // 2% fee for crypto
    const total = cryptoAmount - (fee / cryptoCurrency.price);

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'crypto',
      amount,
      fromCurrency: 'USD',
      toCurrency: crypto,
      rate: cryptoCurrency.price,
      fee,
      total,
      timestamp: new Date().toISOString(),
      status: 'completed',
      description: `Buy ${cryptoAmount.toFixed(6)} ${crypto}`
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    return transaction;
  };

  // Load wallets
  const loadWallets = async () => {
    try {
      const savedWallets = localStorage.getItem('swumarket_wallets');
      if (savedWallets) {
        const wallets = JSON.parse(savedWallets);
        dispatch({ type: 'SET_WALLETS', payload: wallets });
      } else {
        // Mock wallets
        const mockWallets: Wallet[] = [
          { id: '1', currency: 'USD', balance: 500.00, type: 'fiat' },
          { id: '2', currency: 'ZWL', balance: 185000, type: 'fiat' },
          { id: '3', currency: 'BTC', balance: 0.012, type: 'crypto' },
          { id: '4', currency: 'ETH', balance: 0.5, type: 'crypto' },
        ];
        dispatch({ type: 'SET_WALLETS', payload: mockWallets });
        localStorage.setItem('swumarket_wallets', JSON.stringify(mockWallets));
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load wallets' });
    }
  };

  // Load exchange rates
  const loadExchangeRates = async () => {
    try {
      // Mock exchange rates - in real app, fetch from API
      const rates: Record<string, number> = {
        'USD_ZWL': 370.37,
        'USD_EUR': 0.92,
        'USD_GBP': 0.79,
        'USD_ZAR': 18.18,
        'USD_BWP': 13.51,
        'USD_NGN': 1515.15,
        'USD_KES': 149.25,
      };
      dispatch({ type: 'SET_EXCHANGE_RATES', payload: rates });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load exchange rates' });
    }
  };

  // Load data on mount
  useEffect(() => {
    loadCurrencies();
    loadCryptocurrencies();
    loadBills();
    loadWallets();
    loadExchangeRates();
  }, []);

  const value = {
    state,
    dispatch,
    loadCurrencies,
    loadCryptocurrencies,
    loadBills,
    addBill,
    updateBill,
    deleteBill,
    payBill,
    exchangeCurrency,
    buyCrypto,
    loadWallets,
    loadExchangeRates,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};

