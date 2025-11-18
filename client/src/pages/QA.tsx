import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, BookOpen } from "lucide-react";

const categories = ["All", "Biblical Figures", "Theology", "History", "Prophecy", "Teachings"];

const qaData = [
  {
    id: 1,
    question: "Who was Moses?",
    answer:
      "Moses was a prophet and leader of the Israelites who led them out of slavery in Egypt. He received the Ten Commandments from God on Mount Sinai and is one of the most important figures in the Old Testament. Moses authored the first five books of the Bible, known as the Torah or Pentateuch.",
    category: "Biblical Figures",
  },
  {
    id: 2,
    question: "What is the significance of the Last Supper?",
    answer:
      "The Last Supper was the final meal Jesus shared with his disciples before his crucifixion. During this meal, Jesus instituted the practice of communion (or the Eucharist), breaking bread and sharing wine as symbols of his body and blood. This event is commemorated by Christians worldwide.",
    category: "History",
  },
  {
    id: 3,
    question: "What does it mean to have faith?",
    answer:
      "Faith, according to Hebrews 11:1, is 'the assurance of things hoped for, the conviction of things not seen.' It involves trust in God and His promises, even when we cannot see the outcome. Faith is both believing in God's existence and trusting in His character and promises.",
    category: "Theology",
  },
  {
    id: 4,
    question: "Who was King David?",
    answer:
      "David was the second king of Israel, known for defeating Goliath as a young shepherd and later uniting the tribes of Israel. He was a man after God's own heart, despite his flaws, and authored many of the Psalms. Jesus Christ is referred to as a descendant of David.",
    category: "Biblical Figures",
  },
  {
    id: 5,
    question: "What is grace?",
    answer:
      "Grace is God's unmerited favor and love toward humanity. It is a gift that cannot be earned through good works or righteousness. Through grace, believers receive salvation and forgiveness of sins through faith in Jesus Christ (Ephesians 2:8-9).",
    category: "Theology",
  },
  {
    id: 6,
    question: "What is the Great Commission?",
    answer:
      "The Great Commission refers to Jesus' instruction to his disciples in Matthew 28:18-20 to 'go and make disciples of all nations.' It emphasizes spreading the Gospel message, baptizing believers, and teaching them to obey Jesus' commands.",
    category: "Teachings",
  },
];

export default function QA() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredQA = qaData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold">
          Perguntas e Respostas
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Encontre respostas para perguntas bíblicas comuns e explore tópicos sobre
          escrituras, fé e teologia.
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar perguntas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-qa"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer px-3 py-1.5 hover-elevate active-elevate-2"
            onClick={() => setSelectedCategory(category)}
            data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Q&A List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {filteredQA.length} Perguntas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredQA.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger
                  className="text-left hover:no-underline"
                  data-testid={`question-${item.id}`}
                >
                  <div className="flex flex-col items-start gap-2">
                    <span className="font-semibold">{item.question}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredQA.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhuma pergunta encontrada correspondente à sua busca.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
