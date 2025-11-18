import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Flame, CheckCircle2, Circle, TrendingUp, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const readingPlanData = {
  currentStreak: 5,
  totalDays: 365,
  completedDays: 18,
  progress: 5,
};

const todayReading = {
  day: 18,
  readings: [
    { book: "Genesis", chapters: "15-17" },
    { book: "Psalms", chapters: "18" },
  ],
};

const upcomingReadings = [
  {
    day: 19,
    date: "Tomorrow",
    readings: [
      { book: "Genesis", chapters: "18-20" },
      { book: "Psalms", chapters: "19" },
    ],
  },
  {
    day: 20,
    date: "Jan 20",
    readings: [
      { book: "Genesis", chapters: "21-23" },
      { book: "Psalms", chapters: "20" },
    ],
  },
];

const thematicPlans = [
  {
    id: 1,
    name: "Faith Journey",
    description: "Explore biblical stories of faith and trust",
    duration: "30 days",
    category: "Faith",
  },
  {
    id: 2,
    name: "Hope & Healing",
    description: "Find comfort and restoration in scripture",
    duration: "21 days",
    category: "Hope",
  },
  {
    id: 3,
    name: "Love & Relationships",
    description: "Discover God's design for relationships",
    duration: "14 days",
    category: "Love",
  },
];

export default function ReadingPlan() {
  const [completedToday, setCompletedToday] = useState(false);
  const { toast } = useToast();

  const handleMarkComplete = () => {
    setCompletedToday(true);
    toast({
      title: "Dia Completo!",
      description: `${readingPlanData.currentStreak + 1} dias de sequência 🔥`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center flex-shrink-0">
                <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sequência Atual</p>
                <p className="text-3xl font-bold" data-testid="text-streak">
                  {readingPlanData.currentStreak} dias
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progresso</p>
                <p className="text-3xl font-bold" data-testid="text-progress">
                  {readingPlanData.progress}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completados</p>
                <p className="text-3xl font-bold" data-testid="text-completed">
                  {readingPlanData.completedDays}/{readingPlanData.totalDays}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Reading */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Dia {todayReading.day} - Leitura de Hoje
            </CardTitle>
            <Badge variant={completedToday ? "default" : "secondary"}>
              {completedToday ? "Completo" : "Em Progresso"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {todayReading.readings.map((reading, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-accent"
                data-testid={`reading-${index}`}
              >
                <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold">{reading.book}</p>
                  <p className="text-sm text-muted-foreground">
                    Capítulos {reading.chapters}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!completedToday && (
            <Button
              size="lg"
              className="w-full"
              onClick={handleMarkComplete}
              data-testid="button-mark-complete"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Marcar como Completo
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Plan Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming" data-testid="tab-upcoming">
            Próximas
          </TabsTrigger>
          <TabsTrigger value="thematic" data-testid="tab-thematic">
            Planos Temáticos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <h2 className="text-2xl font-bold">Próximas Leituras</h2>
          <div className="space-y-4">
            {upcomingReadings.map((day) => (
              <Card key={day.day} className="hover-elevate transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Dia {day.day}</h3>
                      <p className="text-sm text-muted-foreground">{day.date}</p>
                    </div>
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    {day.readings.map((reading, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {reading.book} {reading.chapters}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="thematic" className="space-y-4">
          <h2 className="text-2xl font-bold">Planos de Leitura Temáticos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thematicPlans.map((plan) => (
              <Card key={plan.id} className="hover-elevate transition-all" data-testid={`card-plan-${plan.id}`}>
                <CardContent className="p-6 space-y-4">
                  <Badge variant="outline">{plan.category}</Badge>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      Duração: {plan.duration}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" data-testid={`button-start-plan-${plan.id}`}>
                    Iniciar Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Progress Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Anual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={readingPlanData.progress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {readingPlanData.completedDays} dias completados
              </span>
              <span>
                {readingPlanData.totalDays - readingPlanData.completedDays} dias
                restantes
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
