import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Zap, Heart, Star, Gift, ArrowRight, X } from "lucide-react";
import bonus1Image from "@assets/1_1764443110192.png";
import bonus2Image from "@assets/2_1764443110193.png";
import bonus3Image from "@assets/3_1764443110193.png";
import bonus4Image from "@assets/4_1764443110193.png";

export default function UpsellPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [hoveredBonus, setHoveredBonus] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showDownsell, setShowDownsell] = useState(false);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll reveal with animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleAcceptUpsell = () => {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
    window.location.href = 'https://go.invictuspay.app.br/fndzv';
  };

  const handleRejectUpsell = () => {
    setShowDownsell(true);
  };

  const handleAcceptDownsell = () => {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
    window.location.href = 'https://go.invictuspay.app.br/xkvg4';
  };

  const handleRejectDownsell = () => {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
    window.location.href = 'https://go.invictuspay.app.br/3asbcxnibo';
  };

  // Restore scroll position when leaving upsell
  useEffect(() => {
    return () => {
      // This runs when component unmounts
      const savedPosition = localStorage.getItem('scrollPosition');
      if (savedPosition && parseInt(savedPosition) > 0) {
        // Schedule scroll after navigation completes
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
        }, 100);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#333333] overflow-x-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#FF9F45]/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400/5 to-transparent rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* STICKY BANNER */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#FF9F45] to-yellow-400 text-white py-3 px-4 text-center font-black shadow-lg">
        <p className="text-sm md:text-base">🔥 OFERTA EXCLUSIVA - VÁLIDA APENAS NESTE MOMENTO!</p>
      </div>

      {/* HERO WITH PARALLAX */}
      <section className="relative pt-8 md:pt-16 pb-16 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {/* HERO CENTERED */}
            <div data-animate id="hero-left" className={`space-y-8 transition-all duration-1000 transform text-center ${visibleSections['hero-left'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="space-y-6 flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-2xl text-[#333333]">
                  Espere! Antes de finalizar…
                </h2>
                
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-black text-[#FF9F45]">💫 Leve o Premium por apenas R$ 17,90!</p>
                  <p className="text-base md:text-lg font-semibold text-[#666]">(Apenas +R$ 3,00 e recebe tudo!)</p>
                </div>
              </div>

              <div className="relative max-w-xl mx-auto w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF9F45] to-yellow-400 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-br from-white to-[#FFF9F0] border-2 border-[#FF9F45] rounded-3xl p-8 space-y-6">
                  <div className="space-y-4">
                    <p className="text-[#FF9F45] font-black text-lg">A MAIORIA ESCOLHE O PREMIUM PORQUE LEVA:</p>
                    
                    <div className="space-y-3 text-left bg-[#FFF5E6] rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-[#FF9F45]">✔</span>
                        <span className="font-semibold text-[#333333]">Todos os 34 banhos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-[#FF9F45]">✔</span>
                        <span className="font-semibold text-[#333333]">Todos os bônus</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-[#FF9F45]">✔</span>
                        <span className="font-semibold text-[#333333]">PDF + DOCX</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-[#FF9F45]">✔</span>
                        <span className="font-semibold text-[#333333]">Suporte por email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-[#FF9F45]">✔</span>
                        <span className="font-semibold text-[#333333]">Atualizações</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-[#FFD9B3] pt-4 text-center">
                    <p className="text-lg md:text-2xl font-black text-[#FF9F45]">
                      POR APENAS R$ 17,90
                    </p>
                    <p className="text-sm text-[#666] font-semibold mt-2">
                      Diferença de apenas R$ 3,00
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT - PREMIUM BADGE */}
          <div className="mt-12">
            <div data-animate id="hero-right" className={`transition-all duration-1000 transform ${visibleSections['hero-right'] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9F45]/20 to-yellow-400/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-gradient-to-br from-[#FF9F45] to-yellow-400 rounded-3xl p-1">
                  <div className="bg-white rounded-3xl p-8 space-y-6 text-center">
                    <div className="space-y-3">
                      <Star className="w-16 h-16 mx-auto text-[#FF9F45] animate-bounce" />
                      <h2 className="text-3xl font-black text-[#333333]">Plano Premium</h2>
                      <p className="text-[#666] font-semibold">Acesso Completo + Bônus Exclusivos</p>
                    </div>

                    <div className="space-y-3 bg-gradient-to-r from-[#FFF9F0] to-[#FFE8CC] rounded-2xl p-6">
                      <p className="text-sm font-black text-[#FF9F45]">INCLUI TODOS OS BENEFÍCIOS:</p>
                      {[
                        "34 banhos completos",
                        "Acesso vitalício",
                        "Atualizações mensais",
                        "Arquivos PDF + DOCX",
                        "4 Bônus exclusivos (R$ 318)"
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-left">
                          <Zap size={16} className="text-[#FF9F45] flex-shrink-0" />
                          <span className="font-semibold text-[#333333]">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-red-100 border-2 border-red-500 rounded-xl p-4">
                      <p className="font-black text-red-600 text-sm">VÁLIDO APENAS AGORA</p>
                      <p className="font-black text-red-500 text-lg">Esta é uma oferta limitada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÔNUS SECTION */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-white to-blue-50 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-4 text-[#333333]">
            4 Bônus Exclusivos
          </h2>
          <p className="text-center text-base md:text-lg lg:text-xl font-black text-[#FF9F45] mb-16">
            No valor total de R$ 318 - 100% GRÁTIS
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: bonus1Image, title: 'Mapa de Proteção 24h Contra Inveja', price: 67, delay: 0 },
              { image: bonus2Image, title: '20 Rituais Energéticos de Prosperidade Instantânea', price: 57, delay: 100 },
              { image: bonus3Image, title: 'Guia "Escudo Espiritual"', price: 97, delay: 200 },
              { image: bonus4Image, title: 'Acesso ao Grupo VIP Espiritual', price: 97, delay: 300 },
            ].map((bonus, idx) => (
              <div
                key={idx}
                data-animate
                id={`bonus-${idx}`}
                className={`transition-all duration-700 transform ${visibleSections[`bonus-${idx}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                style={{ transitionDelay: `${bonus.delay}ms` }}
                onMouseEnter={() => setHoveredBonus(idx)}
                onMouseLeave={() => setHoveredBonus(null)}
              >
                <div className={`group relative h-full bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer ${hoveredBonus === idx ? 'shadow-2xl scale-105' : ''}`}>
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#FF9F45]/10 to-yellow-400/10">
                    <img
                      src={bonus.image}
                      alt={bonus.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${hoveredBonus === idx ? 'scale-125' : 'scale-100'}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#FF9F45]/40 to-transparent transition-opacity duration-300 ${hoveredBonus === idx ? 'opacity-100' : 'opacity-0'}`} />
                    
                    {hoveredBonus === idx && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Gift className="w-16 h-16 text-white animate-bounce" />
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-black text-[#333333] text-base leading-tight min-h-14">{bonus.title}</h3>
                    
                    <div className="space-y-2">
                      <p className="text-[#666] text-sm font-semibold">Valor:</p>
                      <p className="text-3xl font-black text-[#FF9F45]">R$ {bonus.price}</p>
                    </div>

                    {hoveredBonus === idx && (
                      <div className="bg-green-100 border-2 border-green-500 rounded-lg p-3 text-center animate-bounce">
                        <p className="font-black text-green-600 text-sm">✓ INCLUÍDO GRÁTIS</p>
                      </div>
                    )}
                  </div>

                  {/* GLOW EFFECT */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#FF9F45]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                </div>
              </div>
            ))}
          </div>

          {/* BONUS TOTAL */}
          <div data-animate id="bonus-total" className={`mt-16 relative transition-all duration-1000 transform ${visibleSections['bonus-total'] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9F45] to-yellow-400 rounded-3xl blur-2xl opacity-30 animate-pulse" />
            <div className="relative bg-gradient-to-r from-[#FF9F45] to-yellow-400 rounded-3xl p-6 md:p-8 lg:p-12 text-center text-white space-y-4">
              <p className="text-base md:text-lg font-black">VALOR TOTAL DOS BÔNUS</p>
              <p className="text-3xl md:text-5xl lg:text-7xl font-black">R$ 378</p>
              <p className="text-lg md:text-2xl font-black">🎁 100% GRÁTIS HOJE</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* SAVINGS CARD */}
          <div data-animate id="savings-card" className={`relative transition-all duration-1000 transform ${visibleSections['savings-card'] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-2xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-[#FFF5E6] to-orange-50 border-3 border-[#FF9F45] rounded-3xl p-8 md:p-12 text-center space-y-6">
              <p className="text-xl font-black text-[#FF9F45]">💰 VOCÊ ECONOMIZA R$ 318</p>
              <p className="text-4xl md:text-5xl font-black text-green-600">em Bônus</p>
              <div className="bg-white rounded-2xl p-4 border-2 border-[#FFD9B3]">
                <p className="text-sm font-semibold text-[#666] mb-1">Todos os 4 Bônus Exclusivos:</p>
                <p className="text-2xl font-black text-[#FF9F45]">R$ 318 GRÁTIS</p>
              </div>
              <p className="text-[#666] font-semibold">De R$ 24,90 por apenas R$ 17,90 + Bônus</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="space-y-4 flex flex-col items-center w-full">
            {/* ACCEPT */}
            <button
              onClick={handleAcceptUpsell}
              className="w-full max-w-lg group"
              data-testid="button-accept-upsell"
            >
              <div className="bg-gradient-to-r from-[#FF9F45] to-yellow-400 text-white font-black rounded-full py-6 md:py-7 px-8 text-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 transform">
                <p className="text-lg md:text-xl leading-tight">👉 SIM, EU QUERO O PREMIUM</p>
                <p className="text-3xl md:text-4xl font-black mt-1">R$ 17,90</p>
              </div>
            </button>

            {/* REJECT */}
            <button
              onClick={handleRejectUpsell}
              className="w-full max-w-lg group"
              data-testid="button-reject-upsell"
            >
              <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-black rounded-full py-5 md:py-6 px-8 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 transform">
                <p className="text-base md:text-lg">❌ Prefiro continuar com o Básico</p>
              </div>
            </button>
          </div>

          {/* GUARANTEE */}
          <div className="text-center space-y-3 pt-8 border-t-2 border-[#FFD9B3]">
            <p className="font-black text-[#333333] text-lg">✓ Garantia Incondicional de 7 Dias</p>
            <p className="text-[#666] font-semibold">Acesso imediato • Pagamento seguro • Suporte por email</p>
          </div>
        </div>
      </section>

      {/* DOWNSELL MODAL */}
      {showDownsell && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[95vh] overflow-y-auto">
            {/* URGENCY BANNER */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 text-center font-black sticky top-0">
              <p className="text-sm md:text-base">🚨 ÚLTIMA CHANCE - ESTA OFERTA NÃO VOLTA</p>
            </div>

            <div className="relative bg-gradient-to-br from-white to-[#FFF9F0] p-6 md:p-8 space-y-6">
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowDownsell(false)}
                className="absolute top-6 right-6 text-[#666] hover:text-[#FF9F45] transition-colors"
              >
                <X size={28} />
              </button>

              {/* HEADLINE */}
              <div className="space-y-4 pt-2">
                <h2 className="text-3xl md:text-5xl font-black text-[#333333] leading-tight">
                  Espera aí... Você tem certeza?
                </h2>
                
                <div className="space-y-2 bg-gradient-to-r from-[#FF9F45]/20 to-yellow-400/20 rounded-xl p-4 border-l-4 border-[#FF9F45]">
                  <p className="text-base font-black text-[#FF9F45]">✨ OFERTA DE SALVA-VIDAS</p>
                  <p className="text-2xl md:text-3xl font-black text-[#333333]">Premium + 3 Bônus por R$ 14,90</p>
                  <p className="text-sm font-semibold text-[#666]">(Mesmo preço do básico, mas você leva tudo!)</p>
                </div>
              </div>

              {/* COMPARISON TABLE */}
              <div className="space-y-3">
                <p className="text-sm font-black text-[#FF9F45] uppercase">Veja o que você está deixando passar:</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* BASIC */}
                  <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
                    <p className="font-black text-[#333333] mb-3">BÁSICO</p>
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 text-lg">✗</span>
                        <span className="text-[#666] font-semibold">Módulos 1-2 (acesso limitado)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 text-lg">✗</span>
                        <span className="text-[#666] font-semibold">Sem Bônus</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 text-lg">✗</span>
                        <span className="text-[#666] font-semibold">Suporte limitado</span>
                      </div>
                    </div>
                    <p className="font-black text-lg text-[#333333] mt-4">R$ 14,90</p>
                  </div>

                  {/* PREMIUM */}
                  <div className="bg-gradient-to-br from-[#FF9F45] to-yellow-400 rounded-xl p-4 border-3 border-[#FF9F45] relative transform scale-105">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-black">
                      MELHOR
                    </div>
                    <p className="font-black text-white mb-3">PREMIUM</p>
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-white text-lg font-black">✓</span>
                        <span className="text-white font-semibold">Todos os 34 banhos</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white text-lg font-black">✓</span>
                        <span className="text-white font-semibold">3 Bônus (R$ 221)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white text-lg font-black">✓</span>
                        <span className="text-white font-semibold">Suporte por email</span>
                      </div>
                    </div>
                    <p className="font-black text-white text-lg mt-4">R$ 14,90</p>
                  </div>
                </div>
              </div>

              {/* OBJECTION BREAKER */}
              <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 space-y-3">
                <p className="font-black text-blue-600 text-sm">💡 POR QUE ESCOLHER O PREMIUM?</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-black text-lg">•</span>
                    <p className="text-sm font-semibold text-[#333333]"><span className="font-black">Mesma preço:</span> Você paga exatamente o mesmo do básico</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-black text-lg">•</span>
                    <p className="text-sm font-semibold text-[#333333]"><span className="font-black">7 módulos completos:</span> Todos os 34 banhos em Módulos 1-7 vs apenas 1-2</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-black text-lg">•</span>
                    <p className="text-sm font-semibold text-[#333333]"><span className="font-black">R$ 221 em bônus:</span> Guias + Rituais + Grupo VIP (de graça!)</p>
                  </div>
                </div>
              </div>

              {/* MISSING BONUS HIGHLIGHT */}
              <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4">
                <p className="font-black text-red-600 mb-2 text-sm">⚠️ FIQUE ATENTO</p>
                <p className="text-sm font-semibold text-[#333333]">Se você escolher o Básico, <span className="font-black text-red-600">perde o acesso ao Grupo VIP Espiritual</span> (avaliado em R$ 97) e outros 2 bônus exclusivos de prosperidade.</p>
              </div>

              {/* GUARANTEE */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-4 text-center">
                <p className="font-black text-green-600 text-sm mb-2">✓ RISCO ZERO</p>
                <p className="text-xs font-semibold text-[#666]">Teste por 7 dias sem risco. Se não gostar, devolvemos seu dinheiro 100%.</p>
              </div>

              {/* BUTTONS */}
              <div className="space-y-3 pt-2">
                {/* ACCEPT */}
                <button
                  onClick={handleAcceptDownsell}
                  className="w-full group"
                  data-testid="button-accept-downsell"
                >
                  <div className="bg-gradient-to-r from-[#FF9F45] to-yellow-400 text-white font-black rounded-full py-6 md:py-7 px-8 text-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 transform">
                    <p className="text-lg md:text-xl leading-tight">👉 SIM! ACEITAR POR R$ 14,90</p>
                    <p className="text-xs md:text-sm font-semibold mt-1">(Desbloqueio imediato + 3 bônus)</p>
                  </div>
                </button>

                {/* REJECT */}
                <button
                  onClick={handleRejectDownsell}
                  className="w-full group"
                >
                  <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-black rounded-full py-4 md:py-5 px-8 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 transform">
                    <p className="text-base md:text-lg">Continuar com o Básico (sem bônus)</p>
                  </div>
                </button>
              </div>

              {/* FINAL WARNING */}
              <div className="text-center pt-2 border-t-2 border-[#FFD9B3]">
                <p className="text-xs font-black text-red-600 uppercase">⏰ Esta oferta desaparece depois que você sair</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t-2 border-[#FFD9B3] text-center text-white text-sm bg-[#34383B]">
        <p>Método da Purificação Total • Mãe Celeste © 2025 • Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
