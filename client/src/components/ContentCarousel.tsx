import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface ContentCarouselProps {
  title: string;
  seeAllLink?: string;
  children: ReactNode;
}

export function ContentCarousel({ title, seeAllLink, children }: ContentCarouselProps) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {seeAllLink && (
          <Link href={seeAllLink}>
            <Button variant="ghost" size="sm" className="gap-1" data-testid={`button-see-all-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              Ver Tudo
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-4 md:px-6 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
}
