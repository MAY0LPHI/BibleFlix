import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Clock, Check } from "lucide-react";
import devotionalMountain from "@assets/generated_images/Devotional_mountain_sunrise_background_bf2f3cd5.png";
import devotionalOcean from "@assets/generated_images/Devotional_ocean_sunset_background_babde933.png";
import devotionalForest from "@assets/generated_images/Devotional_forest_path_background_0bab76a4.png";
import prayerImage from "@assets/generated_images/Prayer_devotional_background_3943ae44.png";
import { useToast } from "@/hooks/use-toast";

const devotionals = [
  {
    id: 1,
    title: "Finding Peace in His Presence",
    content:
      "In the stillness of the morning, we find God's presence. Like a shepherd leading his sheep to still waters, He guides us to places of rest and renewal. Today, take a moment to be still and know that He is God.",
    image: devotionalMountain,
    date: "2024-01-18",
    verseReference: "Psalm 46:10",
    readingTime: 5,
    isToday: true,
  },
  {
    id: 2,
    title: "Grace in the Morning",
    content:
      "Each new day brings fresh mercies and grace. As the sun rises over the ocean, so does God's faithfulness rise with every morning. His compassions never fail, and His love is new every morning.",
    image: devotionalOcean,
    date: "2024-01-17",
    verseReference: "Lamentations 3:22-23",
    readingTime: 4,
    isToday: false,
  },
  {
    id: 3,
    title: "Walking in Faith",
    content:
      "The journey of faith is like walking through a forest path - sometimes we can't see far ahead, but we trust the One who guides our steps. Each step forward is an act of faith.",
    image: devotionalForest,
    date: "2024-01-16",
    verseReference: "Proverbs 3:5-6",
    readingTime: 6,
    isToday: false,
  },
  {
    id: 4,
    title: "The Power of Prayer",
    content:
      "Prayer is our direct line to the throne of grace. When we bow our heads and lift our hearts, we enter into communion with the Creator of the universe. He hears every word, every sigh, every silent plea.",
    image: prayerImage,
    date: "2024-01-15",
    verseReference: "Philippians 4:6-7",
    readingTime: 5,
    isToday: false,
  },
];

export default function Devotional() {
  const { toast } = useToast();

  const handleMarkAsRead = (id: number) => {
    toast({
      title: "Marcado como Lido",
      description: "Devocional adicionado ao seu histórico de leitura",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Today's Featured Devotional */}
      {devotionals
        .filter((d) => d.isToday)
        .map((devotional) => (
          <Card
            key={devotional.id}
            className="overflow-hidden"
            data-testid="card-featured-devotional"
          >
            <div className="relative h-96 md:h-[500px]">
              <img
                src={devotional.image}
                alt={devotional.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-end">
                <div className="p-6 md:p-12 max-w-3xl">
                  <Badge variant="secondary" className="mb-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    Devocional de Hoje
                  </Badge>
                  <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                    {devotional.title}
                  </h1>
                  <p className="text-lg text-white/90 mb-4 line-clamp-3">
                    {devotional.content}
                  </p>
                  <div className="flex items-center gap-4 text-white/80 text-sm mb-6">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {devotional.verseReference}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {devotional.readingTime} min de leitura
                    </span>
                  </div>
                  <Button size="lg" data-testid="button-mark-read">
                    <Check className="h-5 w-5 mr-2" />
                    Marcar como Lido
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

      {/* Previous Devotionals */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Devocionais Anteriores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devotionals
            .filter((d) => !d.isToday)
            .map((devotional) => (
              <Card
                key={devotional.id}
                className="overflow-hidden hover-elevate transition-all cursor-pointer group"
                data-testid={`card-devotional-${devotional.id}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={devotional.image}
                    alt={devotional.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {new Date(devotional.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">{devotional.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {devotional.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {devotional.verseReference}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {devotional.readingTime} min
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleMarkAsRead(devotional.id)}
                    data-testid={`button-mark-read-${devotional.id}`}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Marcar como Lido
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
