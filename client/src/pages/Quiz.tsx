import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quizQuestions = [
  {
    id: 1,
    question: "Who led the Israelites out of Egypt?",
    options: ["Abraham", "Moses", "David", "Solomon"],
    correctAnswer: 1,
    category: "Old Testament",
  },
  {
    id: 2,
    question: "How many disciples did Jesus have?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "New Testament",
  },
  {
    id: 3,
    question: "What is the first book of the Bible?",
    options: ["Exodus", "Genesis", "Leviticus", "Numbers"],
    correctAnswer: 1,
    category: "General",
  },
  {
    id: 4,
    question: "Who wrote most of the Psalms?",
    options: ["Solomon", "David", "Moses", "Isaiah"],
    correctAnswer: 1,
    category: "Old Testament",
  },
  {
    id: 5,
    question: "In which city was Jesus born?",
    options: ["Nazareth", "Jerusalem", "Bethlehem", "Capernaum"],
    correctAnswer: 2,
    category: "New Testament",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { toast } = useToast();

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setHasAnswered(true);

    const isCorrect = selectedAnswer === question.correctAnswer;
    toast({
      title: isCorrect ? "Correto!" : "Incorreto",
      description: isCorrect
        ? "Muito bem!"
        : `A resposta correta é: ${question.options[question.correctAnswer]}`,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setShowResults(false);
    setHasAnswered(false);
  };

  const score = answers.filter(
    (answer, index) => answer === quizQuestions[index].correctAnswer
  ).length;
  const percentage = Math.round((score / quizQuestions.length) * 100);

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-display">
              Quiz Completo!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-16 w-16 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2" data-testid="text-quiz-score">
                  {percentage}%
                </p>
                <p className="text-lg text-muted-foreground">
                  {score} de {quizQuestions.length} corretas
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {quizQuestions.map((q, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-accent"
                    data-testid={`result-${index}`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{q.question}</p>
                      {!isCorrect && userAnswer !== null && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Correto: {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleRestart}
              data-testid="button-restart-quiz"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Refazer Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Badge variant="outline">{question.category}</Badge>
            <CardTitle className="text-2xl font-display">
              {question.question}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = hasAnswered && isCorrect;
              const showIncorrect = hasAnswered && isSelected && !isCorrect;

              return (
                <Button
                  key={index}
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto py-4 px-6 ${
                    showCorrect ? "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800" :
                    showIncorrect ? "bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800" : ""
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={hasAnswered}
                  data-testid={`option-${index}`}
                >
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle2 className="h-5 w-5 ml-2" />}
                  {showIncorrect && <XCircle className="h-5 w-5 ml-2" />}
                </Button>
              );
            })}
          </div>

          <div className="flex gap-3 pt-4">
            {!hasAnswered ? (
              <Button
                size="lg"
                className="w-full"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                data-testid="button-submit-answer"
              >
                Enviar Resposta
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-full"
                onClick={handleNextQuestion}
                data-testid="button-next-question"
              >
                {currentQuestion < quizQuestions.length - 1
                  ? "Próxima Pergunta"
                  : "Ver Resultados"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
