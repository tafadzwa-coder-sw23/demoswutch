import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PriceComparisonResult } from "@/services/priceComparison";

interface PriceComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result?: PriceComparisonResult | null;
}

const PriceComparisonModal = ({ open, onOpenChange, result }: PriceComparisonModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Price comparison{result?.itemTitle ? `: ${result.itemTitle}` : ''}</DialogTitle>
        </DialogHeader>

        {!result ? (
          <div className="text-muted-foreground">Fetching comparison...</div>
        ) : (
          <div className="space-y-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Shipping</TableHead>
                  <TableHead>Delivery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.offers.map((o, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{o.vendorName}</TableCell>
                    <TableCell>${o.price.toFixed(2)} {o.currency}</TableCell>
                    <TableCell>{o.shipping || '-'}</TableCell>
                    <TableCell>{o.deliveryEstimate || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-xs text-muted-foreground">Last updated {new Date(result.lastUpdated).toLocaleString()}</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PriceComparisonModal;

