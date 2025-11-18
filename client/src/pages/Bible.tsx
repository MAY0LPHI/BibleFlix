import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Highlighter, StickyNote, Copy, Share2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Sample Bible books data
const bibleBooks = {
  old: [
    { id: "gen", name: "Genesis", chapters: 50 },
    { id: "exo", name: "Exodus", chapters: 40 },
    { id: "psa", name: "Psalms", chapters: 150 },
    { id: "pro", name: "Proverbs", chapters: 31 },
    { id: "isa", name: "Isaiah", chapters: 66 },
  ],
  new: [
    { id: "mat", name: "Matthew", chapters: 28 },
    { id: "joh", name: "John", chapters: 21 },
    { id: "act", name: "Acts", chapters: 28 },
    { id: "rom", name: "Romans", chapters: 16 },
    { id: "rev", name: "Revelation", chapters: 22 },
  ],
};

export default function Bible() {
  const [selectedBook, setSelectedBook] = useState("psa");
  const [selectedChapter, setSelectedChapter] = useState(23);
  const [selectedVersion, setSelectedVersion] = useState("NVI");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const { toast } = useToast();

  const currentBook =
    [...bibleBooks.old, ...bibleBooks.new].find((b) => b.id === selectedBook) ||
    bibleBooks.old[0];

  // Sample verses for Psalm 23
  const verses = [
    { number: 1, text: "The LORD is my shepherd; I shall not want." },
    { number: 2, text: "He makes me lie down in green pastures. He leads me beside still waters." },
    { number: 3, text: "He restores my soul. He leads me in paths of righteousness for his name's sake." },
    { number: 4, text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
    { number: 5, text: "You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows." },
    { number: 6, text: "Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the LORD forever." },
  ];

  const handleHighlight = (color: string) => {
    if (selectedVerse === null) return;
    toast({
      title: "Versículo Destacado",
      description: `Versículo ${selectedVerse} destacado em ${color}`,
    });
  };

  const handleAddNote = () => {
    if (selectedVerse === null || !noteText.trim()) return;
    toast({
      title: "Anotação Adicionada",
      description: `Anotação adicionada ao versículo ${selectedVerse}`,
    });
    setNoteText("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Book Selector Sidebar */}
      <aside className="lg:w-64 flex-shrink-0">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Livros
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="old" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="old" className="flex-1" data-testid="tab-old-testament">
                  Antigo Testamento
                </TabsTrigger>
                <TabsTrigger value="new" className="flex-1" data-testid="tab-new-testament">
                  Novo Testamento
                </TabsTrigger>
              </TabsList>
              <TabsContent value="old" className="mt-0">
                <ScrollArea className="h-96">
                  <div className="p-4 space-y-1">
                    {bibleBooks.old.map((book) => (
                      <Button
                        key={book.id}
                        variant={selectedBook === book.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedBook(book.id);
                          setSelectedChapter(1);
                        }}
                        data-testid={`button-book-${book.id}`}
                      >
                        {book.name}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {book.chapters}
                        </span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="new" className="mt-0">
                <ScrollArea className="h-96">
                  <div className="p-4 space-y-1">
                    {bibleBooks.new.map((book) => (
                      <Button
                        key={book.id}
                        variant={selectedBook === book.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedBook(book.id);
                          setSelectedChapter(1);
                        }}
                        data-testid={`button-book-${book.id}`}
                      >
                        {book.name}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {book.chapters}
                        </span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </aside>

      {/* Reading Panel */}
      <div className="flex-1 space-y-6">
        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Capítulo</label>
                <Select
                  value={selectedChapter.toString()}
                  onValueChange={(value) => setSelectedChapter(parseInt(value))}
                >
                  <SelectTrigger data-testid="select-chapter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(
                      (chapter) => (
                        <SelectItem key={chapter} value={chapter.toString()}>
                          Capítulo {chapter}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Versão</label>
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                  <SelectTrigger data-testid="select-version">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NVI">NVI - Nova Versão Internacional</SelectItem>
                    <SelectItem value="ARA">ARA - Almeida Revista e Atualizada</SelectItem>
                    <SelectItem value="KJV">KJV - King James Version</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 items-end">
                <Button variant="outline" size="icon" data-testid="button-copy">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" data-testid="button-share">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verses */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">
              {currentBook.name} {selectedChapter}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 font-serif text-lg leading-loose">
              {verses.map((verse) => (
                <div
                  key={verse.number}
                  className={`p-3 rounded-md transition-colors cursor-pointer hover-elevate ${
                    selectedVerse === verse.number
                      ? "bg-accent"
                      : ""
                  }`}
                  onClick={() => setSelectedVerse(verse.number)}
                  data-testid={`verse-${verse.number}`}
                >
                  <sup className="text-primary font-mono text-sm font-semibold mr-2">
                    {verse.number}
                  </sup>
                  {verse.text}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tools - Show when verse is selected */}
        {selectedVerse !== null && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Ferramentas do Versículo {selectedVerse}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Highlight Colors */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Highlighter className="h-4 w-4" />
                  Destacar
                </label>
                <div className="flex gap-2">
                  {[
                    { color: "amarelo", label: "Amarelo", class: "bg-yellow-300" },
                    { color: "verde", label: "Verde", class: "bg-green-300" },
                    { color: "azul", label: "Azul", class: "bg-blue-300" },
                    { color: "rosa", label: "Rosa", class: "bg-pink-300" },
                  ].map(({ color, label, class: bgClass }) => (
                    <Button
                      key={color}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleHighlight(color)}
                      data-testid={`button-highlight-${color}`}
                    >
                      <div className={`h-4 w-4 rounded-full ${bgClass}`} />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Add Note */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <StickyNote className="h-4 w-4" />
                  Adicionar Anotação
                </label>
                <Textarea
                  placeholder="Escreva suas anotações sobre este versículo..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="min-h-[100px]"
                  data-testid="textarea-note"
                />
                <Button
                  className="mt-2"
                  onClick={handleAddNote}
                  disabled={!noteText.trim()}
                  data-testid="button-save-note"
                >
                  Salvar Anotação
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
