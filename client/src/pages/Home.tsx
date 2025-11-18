import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ContentCarousel } from "@/components/ContentCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, BookOpen, Heart, TrendingUp, Calendar } from "lucide-react";
import { Link } from "wouter";
import devotionalMountain from "@assets/generated_images/Devotional_mountain_sunrise_background_bf2f3cd5.png";
import devotionalOcean from "@assets/generated_images/Devotional_ocean_sunset_background_babde933.png";
import devotionalForest from "@assets/generated_images/Devotional_forest_path_background_0bab76a4.png";
import bibleStudy from "@assets/generated_images/Bible_study_multimedia_thumbnail_aeba16fa.png";
import biblicalHistory from "@assets/generated_images/Biblical_history_multimedia_thumbnail_d126cac1.png";
import prayerImage from "@assets/generated_images/Prayer_devotional_background_3943ae44.png";

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Não autorizado",
        description: "Você saiu da conta. Redirecionando para login...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12">
        <Skeleton className="h-96 w-full" />
        <div className="px-4 md:px-6 space-y-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Featured Devotional Hero */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${devotionalMountain})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative h-full flex items-end p-6 md:p-12">
          <div className="max-w-2xl space-y-4">
            <Badge variant="secondary" className="mb-2">
              <Calendar className="h-3 w-3 mr-1" />
              Devocional de Hoje
            </Badge>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
              Encontrando Paz em Sua Presença
            </h1>
            <p className="text-lg text-white/90 line-clamp-2">
              Descubra a tranquilidade que vem de passar tempo na palavra e
              presença de Deus. Uma jornada de fé e reflexão.
            </p>
            <div className="flex gap-3">
              <Button size="lg" asChild data-testid="button-read-devotional">
                <Link href="/devotional" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  Ler Agora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Reading */}
      <ContentCarousel title="Continue Lendo" seeAllLink="/bible">
        {[
          { book: "Salmos", chapter: 23, progress: 45 },
          { book: "João", chapter: 3, progress: 20 },
          { book: "Provérbios", chapter: 31, progress: 80 },
        ].map((item, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-64 hover-elevate transition-all cursor-pointer"
            data-testid={`card-continue-${index}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{item.book}</h3>
                  <p className="text-sm text-muted-foreground">
                    Capítulo {item.chapter}
                  </p>
                </div>
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progresso</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ContentCarousel>

      {/* Daily Devotionals */}
      <ContentCarousel title="Devocionais Diários" seeAllLink="/devotional">
        {[
          { title: "Graça pela Manhã", image: devotionalOcean, date: "Hoje" },
          { title: "Caminhando na Fé", image: devotionalForest, date: "Ontem" },
          { title: "Poder da Oração", image: prayerImage, date: "2 dias atrás" },
        ].map((item, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-80 overflow-hidden hover-elevate transition-all cursor-pointer group"
            data-testid={`card-devotional-${index}`}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-3 left-3" variant="secondary">
                {item.date}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Uma reflexão sobre a graça e misericórdia de Deus
              </p>
            </CardContent>
          </Card>
        ))}
      </ContentCarousel>

      {/* Bible Study Videos */}
      <ContentCarousel title="Vídeos de Estudo Bíblico" seeAllLink="/multimedia">
        {[
          { title: "Compreendendo os Salmos", thumbnail: bibleStudy, duration: "15:24" },
          { title: "História Bíblica", thumbnail: biblicalHistory, duration: "22:10" },
          { title: "Parábolas Explicadas", thumbnail: bibleStudy, duration: "18:45" },
        ].map((item, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-80 overflow-hidden hover-elevate transition-all cursor-pointer group"
            data-testid={`card-video-${index}`}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="h-8 w-8 text-black ml-1" />
                </div>
              </div>
              <Badge className="absolute bottom-3 right-3 bg-black/80 text-white">
                {item.duration}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </CardContent>
          </Card>
        ))}
      </ContentCarousel>

      {/* Quick Actions */}
      <section className="px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover-elevate transition-all cursor-pointer" data-testid="card-reading-plan">
            <Link href="/reading-plan">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Plano de Leitura</h3>
                  <p className="text-sm text-muted-foreground">
                    5 dias seguidos
                  </p>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover-elevate transition-all cursor-pointer" data-testid="card-favorites">
            <Link href="/favorites">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Favoritos</h3>
                  <p className="text-sm text-muted-foreground">
                    12 itens salvos
                  </p>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover-elevate transition-all cursor-pointer" data-testid="card-qa">
            <Link href="/qa">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Perguntas</h3>
                  <p className="text-sm text-muted-foreground">
                    Navegar tópicos
                  </p>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
