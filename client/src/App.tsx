import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Bible from "@/pages/Bible";
import Devotional from "@/pages/Devotional";
import ReadingPlan from "@/pages/ReadingPlan";
import QA from "@/pages/QA";
import Multimedia from "@/pages/Multimedia";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";
import Quiz from "@/pages/Quiz";
import Flashcards from "@/pages/Flashcards";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/bible" component={Bible} />
          <Route path="/devotional" component={Devotional} />
          <Route path="/reading-plan" component={ReadingPlan} />
          <Route path="/qa" component={QA} />
          <Route path="/multimedia" component={Multimedia} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/profile" component={Profile} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/flashcards" component={Flashcards} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
