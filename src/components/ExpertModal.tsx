import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { findExpertsNear, Expert } from "@/services/experts";

interface ExpertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contextKeyword: string;
}

const ExpertModal = ({ open, onOpenChange, contextKeyword }: ExpertModalProps) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (open) {
      setLoading(true);
      findExpertsNear(contextKeyword).then((res) => {
        if (mounted) setExperts(res);
      }).finally(() => mounted && setLoading(false));
    }
    return () => { mounted = false; };
  }, [open, contextKeyword]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Talk to an Expert</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="text-muted-foreground">Finding nearby experts...</div>
        ) : (
          <div className="space-y-3">
            {experts.map((ex) => (
              <div key={ex.id} className="flex items-center justify-between border rounded-md p-3">
                <div>
                  <div className="font-medium">{ex.name}</div>
                  <div className="text-sm text-muted-foreground">{ex.specialty} • {ex.distanceKm.toFixed(1)} km • ⭐ {ex.rating.toFixed(1)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    <a href={`tel:${ex.phone}`}>Call</a>
                  </Button>
                  <Button variant="outline" asChild size="sm">
                    <a href={`sms:${ex.phone}`}>Message</a>
                  </Button>
                </div>
              </div>
            ))}
            {experts.length === 0 && (
              <div className="text-muted-foreground">No experts found.</div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExpertModal;


