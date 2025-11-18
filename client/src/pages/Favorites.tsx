import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Video, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const favoriteVerses = [
  {
    id: 1,
    reference: "Psalm 23:1",
    text: "The LORD is my shepherd; I shall not want.",
    addedAt: "2024-01-15",
  },
  {
    id: 2,
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    addedAt: "2024-01-14",
  },
  {
    id: 3,
    reference: "Philippians 4:13",
    text: "I can do all things through him who strengthens me.",
    addedAt: "2024-01-13",
  },
];

const favoriteDevotionals = [
  {
    id: 1,
    title: "Finding Peace in His Presence",
    date: "2024-01-18",
    addedAt: "2024-01-18",
  },
  {
    id: 2,
    title: "Grace in the Morning",
    date: "2024-01-17",
    addedAt: "2024-01-17",
  },
];

const favoriteVideos = [
  {
    id: 1,
    title: "Understanding the Book of Psalms",
    duration: "15:24",
    addedAt: "2024-01-16",
  },
  {
    id: 2,
    title: "Biblical History: Ancient Israel",
    duration: "22:10",
    addedAt: "2024-01-15",
  },
];

export default function Favorites() {
  const [activeTab, setActiveTab] = useState("verses");
  const { toast } = useToast();

  const handleRemove = (type: string, id: number) => {
    toast({
      title: "Removido dos Favoritos",
      description: `Item removido de seus ${type}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary" />
          Favoritos
        </h1>
        <p className="text-lg text-muted-foreground">
          Seus versículos, devocionais e conteúdos multimídia salvos
        </p>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="verses" className="gap-2" data-testid="tab-verses">
            <BookOpen className="h-4 w-4" />
            Versículos
          </TabsTrigger>
          <TabsTrigger value="devotionals" className="gap-2" data-testid="tab-devotionals">
            <Heart className="h-4 w-4" />
            Devocionais
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2" data-testid="tab-media">
            <Video className="h-4 w-4" />
            Mídia
          </TabsTrigger>
        </TabsList>

        {/* Favorite Verses */}
        <TabsContent value="verses" className="space-y-4 mt-6">
          {favoriteVerses.map((verse) => (
            <Card key={verse.id} className="hover-elevate transition-all" data-testid={`card-verse-${verse.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {verse.reference}
                    </Badge>
                    <p className="font-serif text-lg leading-relaxed">
                      {verse.text}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Adicionado em {new Date(verse.addedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove("verses", verse.id)}
                    data-testid={`button-remove-verse-${verse.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {favoriteVerses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhum versículo favorito ainda. Comece a adicionar versículos durante a leitura!
              </p>
            </div>
          )}
        </TabsContent>

        {/* Favorite Devotionals */}
        <TabsContent value="devotionals" className="space-y-4 mt-6">
          {favoriteDevotionals.map((devotional) => (
            <Card key={devotional.id} className="hover-elevate transition-all" data-testid={`card-devotional-${devotional.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{devotional.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Devocional de {devotional.date}</span>
                      <span>•</span>
                      <span>Salvo em {new Date(devotional.addedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove("devotionals", devotional.id)}
                    data-testid={`button-remove-devotional-${devotional.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {favoriteDevotionals.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhum devocional favorito ainda. Salve os devocionais que você ama!
              </p>
            </div>
          )}
        </TabsContent>

        {/* Favorite Media */}
        <TabsContent value="media" className="space-y-4 mt-6">
          {favoriteVideos.map((video) => (
            <Card key={video.id} className="hover-elevate transition-all" data-testid={`card-video-${video.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">{video.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="outline">{video.duration}</Badge>
                      <span>Salvo em {new Date(video.addedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove("media", video.id)}
                    data-testid={`button-remove-video-${video.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {favoriteVideos.length === 0 && (
            <div className="text-center py-12">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhuma mídia favorita ainda. Salve vídeos e podcasts que você gosta!
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
