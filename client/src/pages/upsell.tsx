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
                <div className="inline-block bg-red-500 text-white px-8 py-3 rounded-full font-black text-base animate-bounce">
                  🚨 ESPERA! NÃO PERCA!
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight max-w-2xl">
                  <span className="text-[#333333]">Você estava prestes a</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#FF9F45] to-yellow-400 bg-clip-text text-transparent">PERDER</span>
                  <br />
                  <span className="text-[#333333]">uma OPORTUNIDADE</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#FF9F45] to-yellow-400 bg-clip-text text-transparent">IMPERDÍVEL!</span>
                </h1>
              </div>

              <div className="relative max-w-xl mx-auto w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF9F45] to-yellow-400 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-br from-white to-[#FFF9F0] border-2 border-[#FF9F45] rounded-3xl p-8 space-y-6">
                  <div className="space-y-4">
                    <p className="text-[#FF9F45] font-black text-lg">PREÇO ESPECIAL EXCLUSIVO</p>
                    
                    <div className="space-y-4">
                      {/* PREÇO ANTIGO */}
                      <div className="text-center">
                        <p className="text-sm text-[#666] font-semibold mb-1">De:</p>
                        <p className="text-3xl md:text-5xl font-black line-through text-red-500">R$ 17,99</p>
                      </div>
                      
                      {/* SETA */}
                      <div className="flex justify-center">
                        <div className="text-2xl md:text-4xl font-black text-[#FF9F45] animate-bounce">↓</div>
                      </div>
                      
                      {/* PREÇO NOVO */}
                      <div className="text-center space-y-2">
                        <p className="text-sm text-[#FF9F45] font-black">Por apenas:</p>
                        <div className="space-y-1">
                          <p className="text-4xl md:text-6xl lg:text-7xl font-black">
                            <span className="text-[#FF9F45]">R$</span>
                            <span className="ml-1 md:ml-2 bg-gradient-to-r from-[#FF9F45] to-yellow-400 bg-clip-text text-transparent">11,99</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-[#FFD9B3] pt-4 text-center">
                    <p className="text-green-600 font-black text-sm md:text-xl">
                      ✓ Você economiza R$ 6,00
                    </p>
                    <p className="text-base md:text-lg font-black text-[#FF9F45] mt-2">
                      33% DE DESCONTO
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
                        "50 banhos completos",
                        "Acesso vitalício",
                        "Atualizações mensais",
                        "Arquivos PDF + DOCX",
                        "4 Bônus exclusivos"
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
            No valor total de R$ 378 - 100% GRÁTIS
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: bonus1Image, title: 'Guia de Proteção Contra Inveja', price: 47, delay: 0 },
              { image: bonus2Image, title: '20 Rituais Energéticos para Prosperidade', price: 37, delay: 100 },
              { image: bonus3Image, title: 'Grupo VIP Espiritualidade', price: 97, delay: 200 },
              { image: bonus4Image, title: '30 Rituais Energéticos para Atrair Pessoas', price: 197, delay: 300 },
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
              <p className="text-xl font-black text-[#FF9F45]">💰 VOCÊ ECONOMIZA</p>
              <p className="text-5xl md:text-6xl font-black text-green-600">R$ 6,00</p>
              <div className="bg-white rounded-2xl p-4 border-2 border-[#FFD9B3]">
                <p className="text-sm font-semibold text-[#666] mb-1">Mais 4 Bônus Exclusivos:</p>
                <p className="text-2xl font-black text-[#FF9F45]">R$ 378 GRÁTIS</p>
              </div>
              <p className="text-[#666] font-semibold">De R$ 17,99 por apenas R$ 11,99 + Bônus</p>
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
                <p className="text-lg md:text-xl leading-tight">SIM! QUERO O PREMIUM</p>
                <p className="text-3xl md:text-4xl font-black mt-1">R$ 11,99</p>
              </div>
            </button>

            {/* REJECT */}
            <button
              onClick={handleRejectUpsell}
              className="w-full max-w-lg group"
              data-testid="button-reject-upsell"
            >
              <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-black rounded-full py-5 md:py-6 px-8 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 transform">
                <p className="text-base md:text-lg">Quero o Básico</p>
                <p className="text-sm md:text-base font-semibold mt-1">Apenas R$ 7,99</p>
              </div>
            </button>
          </div>

          {/* GUARANTEE */}
          <div className="text-center space-y-3 pt-8 border-t-2 border-[#FFD9B3]">
            <p className="font-black text-[#333333] text-lg">✓ Garantia Incondicional de 7 Dias</p>
            <p className="text-[#666] font-semibold">Acesso imediato • Pagamento seguro • Suporte 24/7</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t-2 border-[#FFD9B3] text-center text-white text-sm bg-[#34383B]">
        <p>50 Banhos de Descarrego Pesado. Todos os direitos reservados. © 2025</p>
      </footer>
    </div>
  );
}
