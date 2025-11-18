import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, TrendingUp, Award, Video, Users } from "lucide-react";
import devotionalImage from "@assets/generated_images/Devotional_mountain_sunrise_background_bf2f3cd5.png";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Wash */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${devotionalImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
            Experimente as Escrituras
            <br />
            Como Nunca Antes
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Uma plataforma moderna de estudo bíblico com devocionais, planos de leitura e
            ferramentas interativas de aprendizado em uma interface inspirada na Netflix.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto"
            asChild
            data-testid="button-get-started"
          >
            <a href="/api/login">Começar Agora</a>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Tudo o Que Você Precisa para Estudar a Bíblia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          {[
            {
              icon: BookOpen,
              title: "Bíblia Completa",
              description: "Leia as escrituras em múltiplas versões com marcações e anotações pessoais",
            },
            {
              icon: Heart,
              title: "Devocionais Diários",
              description: "Comece cada dia com devocionais inspiradores e reflexões",
            },
            {
              icon: TrendingUp,
              title: "Planos de Leitura",
              description: "Acompanhe seu progresso com planos de leitura bíblica personalizáveis",
            },
            {
              icon: Award,
              title: "Quizzes Interativos",
              description: "Teste seus conhecimentos e aprenda com quizzes bíblicos envolventes",
            },
            {
              icon: Video,
              title: "Conteúdo Multimídia",
              description: "Assista vídeos e ouça podcasts sobre as escrituras",
            },
            {
              icon: Users,
              title: "Perguntas e Respostas",
              description: "Encontre respostas para perguntas e tópicos bíblicos comuns",
            },
          ].map((feature, index) => (
            <Card key={index} className="hover-elevate transition-all">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Pronto para Começar Sua Jornada?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Junte-se a milhares estudando as escrituras com nossa plataforma moderna.
            Entre com Google, Apple, GitHub ou email.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild data-testid="button-cta-login">
            <a href="/api/login">Comece a Aprender Hoje</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
