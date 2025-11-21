import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Sparkles, 
  Shield, 
  Zap, 
  Heart, 
  TrendingUp, 
  Moon, 
  Flower2,
  Star,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { PLANS, type Plan, type CheckoutData } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function LandingPage() {
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const basicPlan = PLANS.find(p => p.id === "basic")!;
  const premiumPlan = PLANS.find(p => p.id === "premium")!;
  const upsellPlan = PLANS.find(p => p.id === "premium-upsell")!;

  const checkoutMutation = useMutation({
    mutationFn: async (data: CheckoutData) => {
      const response = await apiRequest("POST", "/api/checkout", data);
      if (!response.ok) {
        throw new Error("Checkout failed");
      }
      return await response.json();
    },
    onSuccess: (_data, variables) => {
      const planPrice = variables.planId === "basic" ? "10" : 
                       variables.planId === "premium-upsell" ? "17" : "27";
      window.location.href = `/checkout?plan=${variables.planId}&price=${planPrice}`;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao processar checkout",
        description: "Por favor, tente novamente.",
      });
    }
  });

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleBasicClick = () => {
    setShowUpsellModal(true);
    setPendingPlan("basic");
  };

  const handlePremiumClick = () => {
    window.location.href = "https://go.invictuspay.app.br/pj4djuh1tx";
  };

  const handleGuaranteeClick = () => {
    window.location.href = "https://go.invictuspay.app.br/pj4djuh1tx";
  };

  const handleUpsellAccept = () => {
    window.location.href = "https://go.invictuspay.app.br/ej7qk";
  };

  const handleUpsellDecline = () => {
    window.location.href = "https://go.invictuspay.app.br/3cmyovl7my";
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <HeroSection onCTAClick={scrollToPricing} />
      <ProblemSection />
      <TransformationSection />
      <BenefitsGrid />
      <AuthorSection />
      <PricingSection 
        ref={pricingRef}
        basicPlan={basicPlan}
        premiumPlan={premiumPlan}
        onBasicClick={handleBasicClick}
        onPremiumClick={handlePremiumClick}
        isLoading={checkoutMutation.isPending}
      />
      <GuaranteeSection onCTAClick={handleGuaranteeClick} />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA onBasicClick={handleBasicClick} onPremiumClick={handlePremiumClick} />
      <Footer />

      <UpsellModal
        open={showUpsellModal}
        onOpenChange={setShowUpsellModal}
        upsellPlan={upsellPlan}
        onAccept={handleUpsellAccept}
        onDecline={handleUpsellDecline}
        isLoading={checkoutMutation.isPending}
      />
    </div>
  );
}

function TopBanner() {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  
  return (
    <div className="bg-destructive text-destructive-foreground py-1 md:py-3 text-center font-semibold animate-gentle-zoom overflow-hidden">
      <div className="px-1 md:px-2 flex items-center justify-center gap-1 flex-wrap text-xs md:text-sm">
        <span>🔥</span>
        <span>BLACK FRIDAY - DESCONTO ESPECIAL APENAS HOJE {formattedDate}</span>
        <span>🔥</span>
      </div>
    </div>
  );
}

interface HeroSectionProps {
  onCTAClick: () => void;
}

function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-secondary/10 to-background overflow-x-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-center"
          data-testid="text-hero-headline"
        >
          SUAS ENERGIAS ESTÃO<br />
          <span className="text-primary">BLOQUEADAS E PESADAS?</span><br />
          DESBLOQUEIE AGORA!
        </h1>

        <p className="text-base md:text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
          Você vai descobrir os <span className="text-primary font-semibold">poderosos segredos</span> que <span className="text-primary font-semibold">desbloquearam a energia</span> de centenas de pessoas, atraindo <span className="text-primary font-semibold">prosperidade, proteção</span> e realizações através de <span className="text-primary font-semibold">banhos prontos e fáceis de aplicar</span>.
        </p>

        <img 
          src="https://i.ibb.co/8n12Dqny/9-F24546-C-4-B6-F-4-F9-A-B1-BB-562-A6470629-F.png"
          alt="Transformação energética"
          className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
          data-testid="img-hero-transform"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl line-through text-muted-foreground">R$ 67,00</span>
              <p className="text-5xl md:text-6xl font-black text-destructive" data-testid="text-hero-price">R$ 27,00</p>
            </div>
            <p className="text-xs text-destructive font-bold">APENAS HOJE - BLACK FRIDAY</p>
          </div>

          <Button 
            size="lg" 
            className="px-6 md:px-12 py-5 md:py-6 rounded-md bg-primary hover:bg-primary/90 font-black text-sm md:text-base animate-gentle-zoom w-full max-w-md"
            onClick={onCTAClick}
            data-testid="button-hero-cta"
          >
            🔥 Desbloquear Energia Agora! 🔥
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>100% seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Entrega imediata</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Garantia 7 dias</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic">
            ⚠️ Oferta Black Friday por tempo limitado - pode expirar a qualquer momento
          </p>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-16 px-4 bg-card/30 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          VOCÊ SENTE QUE SUA<br />
          <span className="text-primary">ENERGIA ESTÁ BLOQUEADA?</span>
        </h2>

        <p className="text-center text-destructive font-semibold">
          Não está sozinho(a) nessa luta...
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-center mb-8">
          <div className="md:col-span-1">
            <img 
              src="https://i.ibb.co/fYGQD52x/BEDE4492-CC15-4760-9-DFB-59-D7193938-BD.png"
              alt="Bloqueio energético 1"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="md:col-span-1">
            <img 
              src="https://i.ibb.co/rf21Jksk/342-B953-C-9773-458-A-AA81-F28-C19-C35-E5-C.png"
              alt="Bloqueio energético 2"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="md:col-span-1 space-y-4">
            <p className="text-lg font-semibold">
              Por mais que você tente, parece que sua{" "}
              <span className="text-destructive">saúde está ruim</span>. Você
              trabalha duro, mas o dinheiro não prospera. Você quer amar, mas
              seus relacionamentos não funcionam.
            </p>

            <p className="text-lg">
              Você parece ser um ímã <span className="font-semibold">atraindo apenas energia
              pesada, olhares de inveja e mau olhado</span> ao seu redor.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-secondary/20 p-6 border-2 border-secondary">
            <p className="text-lg font-semibold">
              A solução é mais simples do que você imagina:{" "}
              <span className="text-primary">Você precisa limpar</span>,{" "}
              <span className="text-primary">purificar</span> e{" "}
              <span className="text-primary">atrair</span> as energias
              corretas através de <span className="text-primary">banhos energéticos
              poderosos</span>.
            </p>
          </Card>

          <Card className="bg-primary/10 p-6 border-2 border-primary">
            <p className="text-xl font-bold text-center">
              TALVEZ O QUE ESTÁ TE TRAVANDO NÃO SEJA O EXTERNO...<br />
              <span className="text-primary text-2xl">É SUA ENERGIA!</span>
            </p>
            <p className="text-center mt-4 text-muted-foreground">
              Você força, usa técnicas e faz cursos para limpar suas
              energias, e{" "}
              <span className="text-foreground font-semibold">
                antes mesmo de perceber, sente-se vazio(a)
              </span>
              .
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function TransformationSection() {
  return (
    <section className="py-16 px-4 overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          AGORA IMAGINE SUA<br />
          <span className="text-primary">VIDA COM ENERGIA LIMPA E DESBLOQUEADA:</span>
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 mb-8 items-center md:items-start">
          <div className="w-full max-w-sm">
            <img 
              src="https://i.ibb.co/SXznkLFB/DD76-E21-A-39-C5-4968-8-B5-F-7-B8-F8305-F1-D8.png"
              alt="Vida transformada 1"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full max-w-sm">
            <img 
              src="https://i.ibb.co/Y4LhjVXB/627-C0-AB9-5958-47-A3-9969-6930-D57973-E0.png"
              alt="Vida transformada 2"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-3 w-full">
            <div className="flex items-start gap-2 p-3 bg-card rounded-md border border-primary/30">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm">Você acorda <span className="font-semibold">leve, protegido(a)</span></p>
            </div>
            <div className="flex items-start gap-2 p-3 bg-card rounded-md border border-primary/30">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm">O dinheiro <span className="font-semibold">flui</span></p>
            </div>
            <div className="flex items-start gap-2 p-3 bg-card rounded-md border border-primary/30">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm">Sente-se <span className="font-semibold">equilibrado</span></p>
            </div>
            <div className="flex items-start gap-2 p-3 bg-card rounded-md border border-primary/30">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm">Oportunidades <span className="font-semibold">surgem</span></p>
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 border-2 border-primary">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
            120 BANHOS ENERGÉTICOS PRONTOS
          </h3>
          <p className="text-center text-lg">
            Cada banho com{" "}
            <span className="font-semibold">instruções detalhadas</span>,{" "}
            ingredientes fáceis de encontrar e{" "}
            <span className="font-semibold">efeitos comprovados</span> por
            centenas de praticantes.
          </p>
        </Card>
      </div>
    </section>
  );
}

function BenefitsGrid() {
  const categories = [
    {
      icon: Sparkles,
      title: "Purificação",
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
      items: "Arruda, Guiné, Sal Grosso, 7 Ervas, Descarrego e mais"
    },
    {
      icon: Shield,
      title: "Proteção",
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      items: "Espada de São Jorge, Alho, Mirra, Anti-Inveja e mais"
    },
    {
      icon: Zap,
      title: "Prosperidade",
      color: "from-yellow-500/20 to-yellow-600/10",
      borderColor: "border-yellow-500/30",
      items: "Canela, Louro, Manjericão, Mel, Abundância e mais"
    },
    {
      icon: Heart,
      title: "Amor",
      color: "from-pink-500/20 to-pink-600/10",
      borderColor: "border-pink-500/30",
      items: "Rosas, Pétalas Vermelhas, Jasmim, Sedução e mais"
    },
    {
      icon: TrendingUp,
      title: "Sucesso",
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
      items: "Vitória, Abre Caminhos, Vencedor, Oportunidades e mais"
    },
    {
      icon: Moon,
      title: "Ritualísticos",
      color: "from-indigo-500/20 to-indigo-600/10",
      borderColor: "border-indigo-500/30",
      items: "Lua Cheia, Ano Novo, Iemanjá, Oxum, Orixás e mais"
    },
    {
      icon: Flower2,
      title: "Beleza",
      color: "from-rose-500/20 to-rose-600/10",
      borderColor: "border-rose-500/30",
      items: "Rosas Brancas, Leite e Mel, Deusa, Encanto Natural e mais"
    },
    {
      icon: TrendingUp,
      title: "Energia Vital",
      color: "from-orange-500/20 to-orange-600/10",
      borderColor: "border-orange-500/30",
      items: "Poder Pessoal, Coragem, Força, Autoconfiança e mais"
    },
  ];

  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          <span className="text-primary">O QUE VOCÊ RECEBE:</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground">
          120 BANHOS ENERGÉTICOS prontos para aplicar
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.title}
                className={`p-6 bg-gradient-to-br ${category.color} border-2 ${category.borderColor} hover-elevate`}
                data-testid={`card-category-${category.title.toLowerCase()}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">{category.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{category.items}</p>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 border-2 border-primary">
          <h3 className="text-2xl font-bold text-center mb-6">
            <span className="text-primary">+ BÔNUS EXCLUSIVOS INCLUSOS:</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p>Guia de Preparação de Banhos</p>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p>Calendário Lunar para Banhos</p>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p>Manual de Ervas e Seus Poderes</p>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p>Orações e Mantras para Potencializar</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function AuthorSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-xs">
              <div className="border-3 border-primary/30 rounded-lg overflow-hidden shadow-lg aspect-[3/4]">
                <img 
                  src="https://i.ibb.co/FkSRM3zG/Chat-GPT-Image-19-de-nov-de-2025-19-46-47.png"
                  alt="Marina Silva"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5">
                <div className="bg-primary text-primary-foreground py-2 px-4 rounded-md text-center text-sm font-bold whitespace-nowrap">
                  Marina Silva
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
              CONHEÇA A AUTORA
            </h2>
            
            <p className="text-base text-center md:text-left">
              <span className="font-bold text-primary">Marina Silva</span> é aromaterapeuta especialista em rituais energéticos com 10+ anos de experiência transformando vidas através dos banhos energéticos.
            </p>

            <Card className="bg-secondary/20 p-4 border-l-4 border-primary">
              <p className="italic text-sm text-center md:text-left">
                "Minha missão é democratizar acesso aos banhos energéticos. Cada banho é oportunidade de renovação."
              </p>
              <p className="font-bold text-sm mt-2 text-center md:text-left">— Marina Silva</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PricingSectionProps {
  basicPlan: Plan;
  premiumPlan: Plan;
  onBasicClick: () => void;
  onPremiumClick: () => void;
  isLoading: boolean;
}

const PricingSection = React.forwardRef<HTMLElement, PricingSectionProps>(
  ({ basicPlan, premiumPlan, onBasicClick, onPremiumClick, isLoading }, ref) => {
  return (
    <section ref={ref} className="py-16 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-primary">OFERTA ESPECIAL POR TEMPO LIMITADO</span>
          </h2>
          <div className="flex items-start justify-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="font-semibold">Esta oferta pode encerrar a qualquer momento!</p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Valor Real do Produto Completo:</p>
          <p className="text-3xl font-bold line-through text-muted-foreground">R$ 67,00</p>
          <p className="text-sm text-destructive font-semibold">
            Não pague R$ 67,00
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto px-0">
          <Card 
            className="p-6 md:p-8 space-y-6 border-2"
            data-testid="card-plan-basic"
          >
            <div className="text-center space-y-2">
              <h3 className="text-lg md:text-2xl font-bold">{basicPlan.bathCount} BANHOS</h3>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-bold text-primary">R$ {basicPlan.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-3">
              {basicPlan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="w-full bg-primary/80 hover:bg-primary"
              onClick={onBasicClick}
              disabled={isLoading}
              data-testid="button-buy-basic"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                "COMPRAR AGORA"
              )}
            </Button>
          </Card>

          <Card 
            className="p-6 md:p-8 space-y-6 border-4 border-primary relative transform md:scale-110 shadow-2xl ring-2 ring-primary/50"
            data-testid="card-plan-premium"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-destructive text-destructive-foreground px-3 md:px-4 py-0.5 md:py-1 text-xs md:text-sm font-bold">
                {premiumPlan.badge}
              </Badge>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg md:text-2xl font-bold">{premiumPlan.bathCount} BANHOS</h3>
              <div className="space-y-1">
                <p className="text-4xl md:text-5xl font-bold text-primary">R$ {premiumPlan.price.toFixed(2)}</p>
                <p className="text-xs md:text-sm font-semibold text-foreground uppercase">
                  Acesso Completo e Vitalício
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {premiumPlan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90 animate-gentle-zoom"
              onClick={onPremiumClick}
              disabled={isLoading}
              data-testid="button-buy-premium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                "GARANTIR ACESSO COMPLETO"
              )}
            </Button>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-center text-muted-foreground mt-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Acesso imediato após confirmação do pagamento</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Compra 100% segura e protegida</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Garantia incondicional de 7 dias</span>
          </div>
        </div>
      </div>
    </section>
  );
});

PricingSection.displayName = "PricingSection";

interface UpsellModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  upsellPlan: Plan;
  onAccept: () => void;
  onDecline: () => void;
  isLoading: boolean;
}

function UpsellModal({ open, onOpenChange, upsellPlan, onAccept, onDecline, isLoading }: UpsellModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-screen overflow-y-auto p-4 sm:p-6" data-testid="modal-upsell">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl text-center font-bold">
            ESPERE! OFERTA EXCLUSIVA
          </DialogTitle>
          <DialogDescription className="text-center space-y-2 pt-2">
            <p className="text-xs sm:text-sm">
              Antes de finalizar, oferta <span className="text-foreground font-bold">única</span>!
            </p>
            <p className="text-destructive font-semibold text-xs sm:text-sm">
              R$ 17,00 - só agora!
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Card className="p-4 border-4 border-primary bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="space-y-3">
              <div className="text-center">
                <Badge className="bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-bold mb-2">
                  {upsellPlan.badge}
                </Badge>
                <h3 className="text-lg font-bold mb-2">
                  {upsellPlan.bathCount} BANHOS
                </h3>
                <div className="flex items-center justify-center gap-2 flex-wrap justify-center">
                  <span className="text-sm line-through text-muted-foreground">
                    R$ {upsellPlan.originalPrice?.toFixed(2)}
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    R$ {upsellPlan.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                {upsellPlan.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-2 mt-4">
          <Button 
            size="lg" 
            className="w-full text-base py-5 bg-primary hover:bg-primary/90"
            onClick={onAccept}
            disabled={isLoading}
            data-testid="button-upsell-yes"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              "SIM! QUERO POR R$ 17,00"
            )}
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="w-full py-5"
            onClick={onDecline}
            disabled={isLoading}
            data-testid="button-upsell-no"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              "Manter R$ 10,00"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface GuaranteeSectionProps {
  onCTAClick: () => void | string;
}

function GuaranteeSection({ onCTAClick }: GuaranteeSectionProps) {
  return (
    <section className="py-16 px-4 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 md:p-12 border-4 border-primary bg-gradient-to-br from-primary/10 to-secondary/10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <div className="text-center">
                <Shield className="w-10 h-10 text-primary-foreground mx-auto mb-1" />
                <p className="text-sm font-bold text-primary-foreground">7 DIAS</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold">
            GARANTIA INCONDICIONAL<br />
            <span className="text-primary">DE 7 DIAS</span>
          </h2>

          <p className="text-lg">
            Você tem <span className="font-bold">7 dias completos</span> para testar os banhos energéticos. Se
            por qualquer motivo você não se sentir satisfeito(a), basta enviar um
            e-mail e <span className="font-bold text-primary">devolvemos 100% do seu investimento</span>.
          </p>

          <p className="text-sm text-muted-foreground">
            Ou seja, você pode testar completamente sem risco. Você tem 7 dias.
            Se funcionar para você, ótimo! Se não, devolvemos seu dinheiro.
          </p>

          <p className="text-xl font-bold text-primary">
            O risco é todo nosso!
          </p>

          <Button size="lg" className="mt-6" onClick={onCTAClick} data-testid="button-guarantee-cta">
            TESTAR SEM RISCO
          </Button>
        </Card>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Letícia Martins",
      image: "https://i.ibb.co/d4PCZ5cK/Foto-de-Perfil-Mulher-Negra-Brasileira.png",
      text: "Depois que comecei a usar os banhos do guia, minha vida mudou completamente. Consegui um emprego melhor, minhas energias estão leves e até meu relacionamento melhorou! Recomendo demais.",
      rating: 5
    },
    {
      name: "Mariana Santos",
      image: "https://i.ibb.co/4RJQP6GT/Foto-de-Perfil-Realista-Sorrindo.png",
      text: "Estava muito cética, mas após o primeiro banho de proteção já senti a diferença! Parece que um peso saiu das minhas costas. Agora faço regularmente e sinto que tudo flui melhor em minha vida.",
      rating: 5
    },
    {
      name: "Rodrigo Silva",
      image: "https://i.ibb.co/gHqLbyQ/Foto-de-Perfil-Realista.png",
      text: "Comprei para minha esposa, mas acabei fazendo também. Os banhos de prosperidade realmente funcionam! Conseguimos pagar dívidas antigas e ainda sobrou. É incrível como a energia muda tudo.",
      rating: 5
    },
  ];

  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          VEJA O QUE NOSSOS CLIENTES<br />
          <span className="text-primary">DIZEM:</span>
        </h2>

        <p className="text-center text-muted-foreground">
          Centenas de pessoas já transformaram suas vidas
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card 
              key={idx} 
              className="p-6 space-y-4 hover-elevate"
              data-testid={`card-testimonial-${idx}`}
            >
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  data-testid={`img-testimonial-${idx}`}
                />
                <p className="font-bold text-sm">— {testimonial.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Como vou receber o produto?",
      answer: "Após a confirmação do pagamento, você receberá imediatamente um e-mail com o link para download de todo o material em PDF. Você pode baixar e consultar quando quiser, de qualquer dispositivo."
    },
    {
      question: "Preciso de ingredientes caros ou difíceis?",
      answer: "Não! Todos os banhos foram criados com ingredientes fáceis de encontrar em mercados, feiras e lojas de produtos naturais. Priorizamos receitas acessíveis e práticas."
    },
    {
      question: "Os banhos são complicados de preparar?",
      answer: "De forma alguma! Cada receita vem com instruções passo a passo super simples. Mesmo quem nunca fez um banho energético consegue preparar facilmente."
    },
    {
      question: "Em quanto tempo vou sentir os resultados?",
      answer: "Os resultados variam de pessoa para pessoa, mas muitos clientes relatam sensações de leveza e proteção logo após o primeiro banho. Os efeitos mais profundos aparecem com a prática regular."
    },
    {
      question: "Qual é a garantia do produto?",
      answer: "Oferecemos garantia incondicional de 7 dias. Se você não gostar ou não se sentir satisfeito por qualquer motivo, devolvemos 100% do seu dinheiro sem questionamentos."
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          <span className="text-primary">PERGUNTAS FREQUENTES ?</span>
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`}
              className="border border-border rounded-md px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

interface FinalCTAProps {
  onBasicClick: () => void;
  onPremiumClick: () => void;
}

function FinalCTA({ onBasicClick, onPremiumClick }: FinalCTAProps) {
  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 md:p-12 border-4 border-primary bg-gradient-to-br from-primary/10 to-secondary/10 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">
            VOCÊ ESTÁ A<br />
            <span className="text-primary text-4xl md:text-5xl">UM CLIQUE DE DISTÂNCIA</span><br />
            DE TRANSFORMAR SUA<br />
            VIDA!
          </h2>

          <p className="text-lg">
            Imagine acordar amanhã <span className="font-bold">com acesso a 120 banhos poderosos</span> que podem
            desbloquear sua energia, atrair prosperidade e se livrar de tudo que te impede
            de evoluir.
          </p>

          <p className="text-muted-foreground">
            Você pode continuar lutando contra energias bloqueadas, <span className="font-semibold text-foreground">
            ou pode tomar a decisão que</span> <span className="font-bold text-primary">centenas de pessoas</span> já
            tomaram!
          </p>

          <Card className="bg-secondary/20 p-6 border-2 border-destructive">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-destructive font-bold uppercase">⚠️ Última chance!</p>
            </div>
            <p className="text-sm">
              Esta oferta de R$ 27,00 pode encerrar a qualquer momento. Não deixe a
              oportunidade passar!
            </p>
          </Card>

          <div className="space-y-3 pt-4">
            <Button 
              size="lg" 
              className="w-full text-sm md:text-lg py-6"
              onClick={onPremiumClick}
              data-testid="button-final-cta-premium"
            >
              GARANTIR ACESSO PREMIUM AGORA
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full"
              onClick={onBasicClick}
              data-testid="button-final-cta-basic"
            >
              Ver Plano Básico
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Pagamento 100% seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Entrega instantânea via e-mail</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Acesso vitalício ao material</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border overflow-x-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="p-4 bg-primary/10 border-2 border-primary rounded-lg space-y-2">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="font-bold text-primary">AVISO IMPORTANTE</p>
          </div>
          <p className="text-sm text-foreground">
            Os banhos energéticos são <span className="font-semibold">práticas complementares de bem-estar e espiritualidade</span>. 
            Os resultados podem variar de acordo com a <span className="font-semibold">dedicação e receptividade de cada pessoa</span>.
            <span className="block mt-2 text-primary font-semibold">Não substituem consultas com profissionais qualificados.</span>
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground">
          © 2025 Banhos Energéticos. Todos os direitos reservados.
        </p>
        <p className="text-xs text-muted-foreground">
          Desenvolvido com amor para transformar energias e vidas.
        </p>
      </div>
    </footer>
  );
}
