import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Shuffle, CheckCircle, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const flashcards = [
  {
    id: 1,
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    category: "Salvation",
  },
  {
    id: 2,
    reference: "Psalm 23:1",
    text: "The LORD is my shepherd; I shall not want.",
    category: "Comfort",
  },
  {
    id: 3,
    reference: "Philippians 4:13",
    text: "I can do all things through him who strengthens me.",
    category: "Strength",
  },
  {
    id: 4,
    reference: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    category: "Wisdom",
  },
  {
    id: 5,
    reference: "Romans 8:28",
    text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
    category: "Hope",
  },
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const currentCard = flashcards[currentIndex];
  const learnedCount = learnedCards.size;
  const totalCards = flashcards.length;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIndex(randomIndex);
    toast({
      title: "Embaralhado",
      description: "Mostrando um cartão aleatório",
    });
  };

  const handleMarkLearned = () => {
    const newLearned = new Set(learnedCards);
    if (learnedCards.has(currentCard.id)) {
      newLearned.delete(currentCard.id);
      toast({
        title: "Desmarcado",
        description: "Cartão removido dos aprendidos",
      });
    } else {
      newLearned.add(currentCard.id);
      toast({
        title: "Marcado como Aprendido",
        description: "Ótimo trabalho memorizando este versículo!",
      });
    }
    setLearnedCards(newLearned);
  };

  const handleReset = () => {
    setLearnedCards(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
    toast({
      title: "Progresso Resetado",
      description: "Todos os cartões marcados como não aprendidos",
    });
  };

  const isLearned = learnedCards.has(currentCard.id);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">
          Flashcards de Versículos Bíblicos
        </h1>
        <p className="text-lg text-muted-foreground">
          Memorize as escrituras um versículo por vez
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium" data-testid="text-progress">
                {learnedCount} de {totalCards} aprendidos
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              data-testid="button-reset"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Flashcard */}
      <div
        className="perspective-1000"
        style={{ perspective: "1000px" }}
        data-testid="flashcard-container"
      >
        <Card
          className={`relative h-96 cursor-pointer transition-transform duration-500 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          onClick={handleFlip}
          data-testid="flashcard"
        >
          {/* Front */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <CardContent className="h-full flex flex-col items-center justify-center p-8 space-y-6">
              <Badge variant="outline" className="text-sm">
                {currentCard.category}
              </Badge>
              <div className="text-center space-y-4">
                <p className="font-mono text-3xl md:text-4xl font-bold text-primary">
                  {currentCard.reference}
                </p>
                <p className="text-muted-foreground">Toque para revelar o versículo</p>
              </div>
              {isLearned && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Aprendido
                </Badge>
              )}
            </CardContent>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 backface-hidden bg-card"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <CardContent className="h-full flex flex-col items-center justify-center p-8 space-y-6">
              <Badge variant="outline" className="text-sm">
                {currentCard.category}
              </Badge>
              <div className="text-center space-y-4">
                <p className="font-mono text-xl font-semibold text-primary">
                  {currentCard.reference}
                </p>
                <p className="font-serif text-lg leading-relaxed">
                  {currentCard.text}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">Toque para virar de volta</p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleMarkLearned}
          data-testid="button-mark-learned"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          {isLearned ? "Desmarcar" : "Marcar como Aprendido"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleShuffle}
          data-testid="button-shuffle"
        >
          <Shuffle className="h-5 w-5 mr-2" />
          Embaralhar
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          data-testid="button-previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <span className="text-sm font-medium" data-testid="text-card-count">
          Cartão {currentIndex + 1} de {totalCards}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          data-testid="button-next"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
