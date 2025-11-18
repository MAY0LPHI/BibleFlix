import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Heart, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "verses" | "devotionals" | "multimedia">("all");

  const filters = [
    { value: "all", label: "Tudo", icon: Search },
    { value: "verses", label: "Versículos", icon: BookOpen },
    { value: "devotionals", label: "Devocionais", icon: Heart },
    { value: "multimedia", label: "Mídia", icon: Video },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-display">Buscar</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar versículos, devocionais, vídeos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              autoFocus
              data-testid="input-search"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {filters.map(({ value, label, icon: Icon }) => (
              <Badge
                key={value}
                variant={filter === value ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5 hover-elevate active-elevate-2"
                onClick={() => setFilter(value)}
                data-testid={`filter-${value}`}
              >
                <Icon className="h-3.5 w-3.5 mr-1.5" />
                {label}
              </Badge>
            ))}
          </div>

          {/* Results placeholder */}
          <div className="py-8">
            <p className="text-center text-muted-foreground text-sm">
              {searchQuery
                ? "Digite para buscar..."
                : "Digite um termo para encontrar versículos, devocionais e mais"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
