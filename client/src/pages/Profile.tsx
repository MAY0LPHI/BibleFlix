import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Flame,
  BookOpen,
  Heart,
  Trophy,
  Calendar,
  TrendingUp,
  Award,
} from "lucide-react";

const stats = {
  currentStreak: 5,
  totalDaysActive: 18,
  versesRead: 247,
  devotionalsCompleted: 12,
  quizzesTaken: 3,
  averageScore: 85,
};

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first devotional",
    icon: Award,
    earned: true,
    earnedDate: "2024-01-10",
  },
  {
    id: 2,
    title: "Week Warrior",
    description: "Maintain a 7-day reading streak",
    icon: Flame,
    earned: false,
    progress: 5,
    target: 7,
  },
  {
    id: 3,
    title: "Bible Scholar",
    description: "Read 50 chapters",
    icon: BookOpen,
    earned: false,
    progress: 23,
    target: 50,
  },
  {
    id: 4,
    title: "Quiz Master",
    description: "Score 90% or higher on 5 quizzes",
    icon: Trophy,
    earned: false,
    progress: 1,
    target: 5,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "devotional",
    title: "Completed 'Finding Peace in His Presence'",
    date: "2024-01-18",
  },
  {
    id: 2,
    type: "quiz",
    title: "Scored 90% on 'Old Testament Quiz'",
    date: "2024-01-17",
  },
  {
    id: 3,
    type: "reading",
    title: "Read Psalm 23",
    date: "2024-01-17",
  },
  {
    id: 4,
    type: "devotional",
    title: "Completed 'Grace in the Morning'",
    date: "2024-01-16",
  },
];

export default function Profile() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Não Autorizado",
        description: "Você foi desconectado. Fazendo login novamente...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.profileImageUrl || undefined} className="object-cover" />
              <AvatarFallback className="text-2xl">
                {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-3xl font-bold" data-testid="text-user-name">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.firstName || "User"}
              </h1>
              {user.email && (
                <p className="text-muted-foreground" data-testid="text-user-email">
                  {user.email}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                <Badge className="gap-1">
                  <Flame className="h-3 w-3" />
                  {stats.currentStreak} Dias de Sequência
                </Badge>
                <Badge variant="outline">
                  {stats.totalDaysActive} Dias Ativos
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Versículos Lidos</p>
                <p className="text-2xl font-bold" data-testid="text-verses-read">
                  {stats.versesRead}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Devocionais</p>
                <p className="text-2xl font-bold" data-testid="text-devotionals">
                  {stats.devotionalsCompleted}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Média de Quiz</p>
                <p className="text-2xl font-bold" data-testid="text-quiz-average">
                  {stats.averageScore}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} data-testid={`achievement-${achievement.id}`}>
              <div className="flex items-start gap-4">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    achievement.earned
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.earnedDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Conquistado em {new Date(achievement.earnedDate).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                    {achievement.earned ? (
                      <Badge variant="default">Conquistado</Badge>
                    ) : (
                      <Badge variant="outline">
                        {achievement.progress}/{achievement.target}
                      </Badge>
                    )}
                  </div>
                  {!achievement.earned && achievement.progress !== undefined && achievement.target && (
                    <Progress
                      value={(achievement.progress / achievement.target) * 100}
                      className="h-2"
                    />
                  )}
                </div>
              </div>
              {achievement.id < achievements.length && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4" data-testid={`activity-${activity.id}`}>
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
