import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const [planInfo, setPlanInfo] = useState<{ plan: string; price: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    const price = params.get("price");
    
    if (plan && price) {
      setPlanInfo({ plan, price });
      
      // Track InitiateCheckout event when checkout page loads
      const priceValue = parseFloat(price);
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: priceValue,
          currency: 'BRL'
        });
      }
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  if (!planInfo) {
    return null;
  }

  const getPlanName = () => {
    if (planInfo.plan === "basic") return "Plano Básico - 120 Banhos";
    if (planInfo.plan === "premium-upsell") return "Plano Premium - 150 Banhos (Oferta Especial)";
    return "Plano Premium - 150 Banhos";
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 space-y-8 border-2 border-primary">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">
              Você está adquirindo: <span className="font-bold text-foreground">{getPlanName()}</span>
            </p>
          </div>

          <div className="bg-card p-6 rounded-md border border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Produto:</span>
              <span>{getPlanName()}</span>
            </div>
            <div className="flex justify-between items-center text-2xl font-bold">
              <span>Total:</span>
              <span className="text-primary">R$ {planInfo.price}</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Esta é uma página de checkout simulada para demonstração.
            </p>
            <Button size="lg" className="w-full" data-testid="button-complete-purchase">
              Finalizar Compra (Simulação)
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => setLocation("/")}
              data-testid="button-back-to-home"
            >
              Voltar para a página inicial
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Pagamento 100% seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Garantia incondicional de 7 dias</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
