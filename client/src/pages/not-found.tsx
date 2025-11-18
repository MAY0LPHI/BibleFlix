import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-6 p-4">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold font-display">404</h1>
          <p className="text-xl text-muted-foreground">Página não encontrada</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            A página que você está procurando não existe. Vamos te levar de volta.
          </p>
        </div>
        <Button size="lg" asChild data-testid="button-go-home">
          <a href="/">Voltar ao Início</a>
        </Button>
      </div>
    </div>
  );
}
