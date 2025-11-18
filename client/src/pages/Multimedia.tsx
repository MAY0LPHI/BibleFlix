import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Headphones, Music } from "lucide-react";
import bibleStudy from "@assets/generated_images/Bible_study_multimedia_thumbnail_aeba16fa.png";
import biblicalHistory from "@assets/generated_images/Biblical_history_multimedia_thumbnail_d126cac1.png";

const videos = [
  {
    id: 1,
    title: "Understanding the Book of Psalms",
    description: "An in-depth study of the Psalms and their historical context",
    thumbnail: bibleStudy,
    duration: "15:24",
    category: "Bible Study",
  },
  {
    id: 2,
    title: "Biblical History: Ancient Israel",
    description: "Explore the history of ancient Israel and its significance",
    thumbnail: biblicalHistory,
    duration: "22:10",
    category: "History",
  },
  {
    id: 3,
    title: "The Parables of Jesus Explained",
    description: "Understand the deeper meanings of Jesus' parables",
    thumbnail: bibleStudy,
    duration: "18:45",
    category: "Teachings",
  },
  {
    id: 4,
    title: "Overview of the New Testament",
    description: "A comprehensive guide to the New Testament books",
    thumbnail: biblicalHistory,
    duration: "28:30",
    category: "Bible Study",
  },
];

const podcasts = [
  {
    id: 1,
    title: "Daily Devotional Podcast",
    description: "Short daily reflections on scripture",
    episodes: 365,
    category: "Devotional",
  },
  {
    id: 2,
    title: "Bible Study Deep Dive",
    description: "Weekly in-depth biblical analysis",
    episodes: 52,
    category: "Study",
  },
  {
    id: 3,
    title: "Faith Conversations",
    description: "Discussions about faith and modern life",
    episodes: 104,
    category: "Discussion",
  },
];

const music = [
  {
    id: 1,
    title: "Worship Essentials",
    description: "Classic worship songs and hymns",
    tracks: 25,
  },
  {
    id: 2,
    title: "Contemporary Christian",
    description: "Modern Christian music playlist",
    tracks: 30,
  },
  {
    id: 3,
    title: "Instrumental Meditation",
    description: "Peaceful instrumental music for prayer",
    tracks: 20,
  },
];

export default function Multimedia() {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">
          Biblioteca Multimídia
        </h1>
        <p className="text-lg text-muted-foreground">
          Assista vídeos, ouça podcasts e aproveite músicas de adoração
        </p>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="videos" className="gap-2" data-testid="tab-videos">
            <Play className="h-4 w-4" />
            Vídeos
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="gap-2" data-testid="tab-podcasts">
            <Headphones className="h-4 w-4" />
            Podcasts
          </TabsTrigger>
          <TabsTrigger value="music" className="gap-2" data-testid="tab-music">
            <Music className="h-4 w-4" />
            Música
          </TabsTrigger>
        </TabsList>

        {/* Videos */}
        <TabsContent value="videos" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden hover-elevate transition-all cursor-pointer group"
                data-testid={`card-video-${video.id}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-8 w-8 text-black ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-3 right-3 bg-black/80 text-white">
                    {video.duration}
                  </Badge>
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {video.category}
                  </Badge>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Podcasts */}
        <TabsContent value="podcasts" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast) => (
              <Card
                key={podcast.id}
                className="hover-elevate transition-all cursor-pointer"
                data-testid={`card-podcast-${podcast.id}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Headphones className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline">{podcast.category}</Badge>
                    <h3 className="font-semibold text-xl">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {podcast.description}
                    </p>
                    <p className="text-xs text-muted-foreground pt-2">
                      {podcast.episodes} episódios
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Music */}
        <TabsContent value="music" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {music.map((playlist) => (
              <Card
                key={playlist.id}
                className="hover-elevate transition-all cursor-pointer"
                data-testid={`card-music-${playlist.id}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Music className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl">{playlist.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {playlist.description}
                    </p>
                    <p className="text-xs text-muted-foreground pt-2">
                      {playlist.tracks} faixas
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
