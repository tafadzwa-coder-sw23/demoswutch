import { MarketplaceItem } from "@/types/marketplace-updated";

export interface PriceOffer {
  vendorName: string;
  price: number;
  currency: string;
  shipping?: string;
  deliveryEstimate?: string;
  link?: string;
  rating?: number;
}

export interface PriceComparisonResult {
  itemId: string;
  itemTitle: string;
  offers: PriceOffer[];
  lastUpdated: string;
}

// Mock comparison: generate 3-5 random vendors per item title
const cache = new Map<string, PriceComparisonResult>();

export async function comparePricesForItem(item: MarketplaceItem): Promise<PriceComparisonResult> {
  // Return cached result if available
  const cached = cache.get(item.id);
  if (cached) return cached;

  await new Promise((r) => setTimeout(r, 500));

  const base = (('price' in item && item.price) ? item.price : 20) as number;
  const vendors = ["ZimMall", "HarareDeals", "ChipoShop", "MbareMarket", "ZedMart"];

  const num = 3 + Math.floor(Math.random() * 3);
  const offers: PriceOffer[] = Array.from({ length: num }).map((_, i) => ({
    vendorName: vendors[(i + Math.floor(Math.random() * vendors.length)) % vendors.length],
    price: +(base * (0.85 + Math.random() * 0.4)).toFixed(2),
    currency: 'USD',
    shipping: Math.random() > 0.5 ? 'Free shipping' : 'Calculated at checkout',
    deliveryEstimate: Math.random() > 0.5 ? '2-5 days' : '3-7 days',
    link: 'https://example.com',
    rating: +(3 + Math.random() * 2).toFixed(1)
  }));

  offers.sort((a, b) => a.price - b.price);

  const result: PriceComparisonResult = {
    itemId: item.id,
    itemTitle: item.title,
    offers,
    lastUpdated: new Date().toISOString()
  };

  cache.set(item.id, result);
  return result;
}

