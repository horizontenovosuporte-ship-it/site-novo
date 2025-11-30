import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Bird, Shield, Sparkles, Heart, Leaf, Flame, Wind, Sun, Moon, Star, Zap, Gift, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@assets/Design_sem_nome_9_1764440988721.png";
import bonus1Image from "@assets/1_1764443110192.png";
import bonus2Image from "@assets/2_1764443110193.png";
import bonus3Image from "@assets/3_1764443110193.png";
import bonus4Image from "@assets/4_1764443110193.png";
import client1Image from "@assets/generated_images/brazilian_woman_client_portrait_1.png";
import client2Image from "@assets/generated_images/brazilian_man_client_portrait_2.png";
import client3Image from "@assets/generated_images/mature_brazilian_woman_client_portrait.png";

export default function LandingPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState("23:59:59");
  const [currentDate, setCurrentDate] = useState("");
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    setCurrentDate(formatted);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const distance = endOfDay.getTime() - now;
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
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

  // Notifications
  useEffect(() => {
    const customers = [
      { name: 'Maria Silva', city: 'São Paulo', state: 'SP' },
      { name: 'João Santos', city: 'Rio de Janeiro', state: 'RJ' },
      { name: 'Ana Costa', city: 'Belo Horizonte', state: 'MG' },
      { name: 'José Oliveira', city: 'Salvador', state: 'BA' },
      { name: 'Francisca Pereira', city: 'Fortaleza', state: 'CE' },
      { name: 'Paula Gomes', city: 'Brasília', state: 'DF' },
      { name: 'Roberto Santos', city: 'Curitiba', state: 'PR' },
      { name: 'Lucia Ferreira', city: 'Recife', state: 'PE' },
      { name: 'Carlos Mendes', city: 'Porto Alegre', state: 'RS' },
      { name: 'Beatriz Alves', city: 'Manaus', state: 'AM' },
      { name: 'Fernando Teixeira', city: 'Belém', state: 'PA' },
      { name: 'Cristina Rocha', city: 'Goiânia', state: 'GO' },
    ];
    const plans = ['Plano Básico', 'Plano Premium'];
    
    const showNotification = () => {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      
      toast({
        title: `${customer.name} adquiriu os 50 Banhos de Descarrego!`,
        duration: 3500,
      });
      setTimeout(showNotification, Math.random() * 25000 + 18000);
    };

    setTimeout(showNotification, 8000);
  }, [toast]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Handle checkout click - save position
  const handleCheckout = (plan: string) => {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
    if (plan === 'Plano Básico') {
      setLocation('/upsell');
    } else {
      window.location.href = 'https://go.invictuspay.app.br/h74rluqxrx';
    }
  };

  // Restore scroll position on page load with multiple fallbacks
  useEffect(() => {
    const restoreScroll = (delay: number = 0) => {
      setTimeout(() => {
        const savedPosition = localStorage.getItem('scrollPosition');
        if (savedPosition && parseInt(savedPosition) > 0) {
          window.scrollTo({ top: parseInt(savedPosition), behavior: 'auto' });
          localStorage.removeItem('scrollPosition');
        }
      }, delay);
    };

    // Restore immediately
    restoreScroll(0);
    
    // Restore after short delay for DOM readiness
    restoreScroll(50);
    
    // Restore after longer delay for full page load
    restoreScroll(200);

    // Also listen for visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        restoreScroll(0);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for page load complete
    window.addEventListener('load', () => restoreScroll(100));

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('load', () => restoreScroll(100));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#333333]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 159, 69, 0.03) 0%, transparent 50%)' }}>
      {/* BANNER URGÊNCIA */}
      <div className="sticky top-0 z-50 bg-[#FF9F45] text-white py-3 px-4 text-center font-black animate-zoom-boom">
        <p className="text-sm md:text-base">⏰ OFERTA ACABA HOJE {currentDate}</p>
        <p className="text-xs md:text-sm mt-1">GARANTA SEU ACESSO AGORA</p>
      </div>

      {/* HERO */}
      <section className="relative pt-8 pb-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* IMAGEM */}
          <div data-animate id="hero-image" className={`transition-all duration-1000 ${visibleSections['hero-image'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <img src={heroImage} alt="50 Banhos" className="w-full h-auto rounded-2xl shadow-lg hover:shadow-xl transition-all animate-float-up" />
          </div>

          {/* TÍTULO PRINCIPAL */}
          <div data-animate id="hero-text" className={`text-center transition-all duration-1000 ${visibleSections['hero-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-5xl md:text-6xl font-black text-[#FF9F45] mb-3">
              50 Banhos de Descarrego Pesado
            </h1>
            <p className="text-lg md:text-xl font-bold text-[#333333]">
              Liberte-se de energias negativas em 7 dias
            </p>
          </div>

          {/* COPY AGRESSIVA - 3 PONTOS */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-base md:text-lg font-black text-[#FF9F45] mb-2">
                Cansado de carregar mau-olhado, inveja e bloqueios?
              </p>
              <p className="text-sm md:text-base font-semibold text-[#666]">
                Você merece estar leve, protegido e vibrando alto.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="text-center">
                <p className="font-black text-[#333333]">✨ Limpeza espiritual profunda</p>
              </div>
              <div className="text-center">
                <p className="font-black text-[#333333]">🛡️ Proteção energética completa</p>
              </div>
              <div className="text-center">
                <p className="font-black text-[#333333]">⚡ Elevação de vibração</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollToSection('button-plan-premium')}
            className="w-full py-6 md:py-7 bg-gradient-to-r from-[#FF9F45] to-yellow-400 text-white font-black text-lg md:text-xl rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            data-testid="button-hero-cta"
          >
            LIBERTA-SE AGORA
          </button>

          {/* GARANTIA E URGÊNCIA */}
          <div className="text-center space-y-2">
            <p className="font-bold text-red-600 text-sm">⏱️ Oferta acaba hoje - vagas limitadas</p>
            <p className="font-bold text-green-700 text-sm">✓ Garantia de 7 dias - devolução 100%</p>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS - VISUAL */}
      <section className="py-20 px-4 bg-[#FFF5E6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-[#333333]">O Que Você Vai Receber</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Bird, title: 'Paz Interior', desc: 'Energia leve e calma' },
              { icon: Shield, title: 'Proteção', desc: 'Contra energias negativas' },
              { icon: Sparkles, title: 'Limpeza', desc: 'Descarrego profundo' },
              { icon: Flame, title: 'Transformação', desc: 'Vida renovada' },
              { icon: Heart, title: 'Equilíbrio', desc: 'Harmonia espiritual' },
              { icon: Sun, title: 'Elevação', desc: 'Vibração elevada' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-animate
                  id={`benefit-${idx}`}
                  className={`p-6 bg-white rounded-2xl border-2 border-[#FFD9B3] text-center transition-all duration-300 hover:shadow-xl hover:border-[#FF9F45] hover:-translate-y-2 cursor-pointer ${
                    visibleSections[`benefit-${idx}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <Icon size={40} className="text-[#FF9F45] mx-auto mb-4" />
                  <h3 className="font-black text-xl mb-2 text-[#333333]">{item.title}</h3>
                  <p className="text-[#333333]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-[#333333]">Bônus Exclusivos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: bonus1Image, title: 'Guia de Proteção Contra Inveja', price: 47 },
              { image: bonus2Image, title: '20 Rituais Energéticos de Prosperidade', price: 37 },
              { image: bonus3Image, title: 'Grupo VIP Espiritualidade', price: 97 },
              { image: bonus4Image, title: '30 Rituais Energéticos Atração de Pessoas', price: 197 },
            ].map((bonus, idx) => (
              <div key={idx} data-animate id={`bonus-${idx}`} className={`transition-all duration-700 ${visibleSections[`bonus-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                  <img src={bonus.image} alt={bonus.title} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
                  <div className="p-4">
                    <h3 className="font-black text-[#333333] mb-2 text-sm">{bonus.title}</h3>
                    <p className="text-2xl font-black text-[#FF9F45]">R$ {bonus.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 space-y-4">
            <p className="text-xl md:text-2xl font-black text-[#333333]">Total de Bônus: <span className="line-through text-[#FFB366]">R$ 378</span></p>
            <p className="text-4xl md:text-5xl font-black text-[#FF9F45]">HOJE: GRÁTIS</p>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="pricing-section" className="py-20 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          {/* COUNTDOWN HEADER */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-2xl font-black text-red-500">OFERTA LIMITADA -<br />TERMINA EM:</h2>
            <div className="text-6xl md:text-7xl font-black font-mono text-[#FF9F45]">{countdown}</div>
          </div>

          {/* PLANOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BÁSICO */}
            <div data-animate id="plan-basic" className={`p-8 bg-white rounded-3xl border border-gray-200 transition-all duration-300 text-center hover:shadow-lg hover:-translate-y-2 cursor-pointer ${visibleSections['plan-basic'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h3 className="text-3xl font-black mb-3 text-[#333333]">Plano Básico</h3>
              <p className="text-[#666] mb-8 font-semibold">Para começar sua limpeza espiritual</p>
              
              <div className="space-y-2 mb-10">
                <p className="text-gray-400 line-through text-lg">R$ 49,99</p>
                <p className="text-4xl md:text-6xl font-black text-[#FF9F45]">R$ 7,99</p>
              </div>

              <ul className="space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> 20 banhos de descarrego</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Formato PDF</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Acesso vitalício</li>
              </ul>

              <button onClick={() => handleCheckout('Plano Básico')} className="w-full py-4 bg-gray-600 text-white font-black text-lg rounded-full hover:bg-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 mb-6 cursor-pointer" data-testid="button-plan-basic">
                QUERO O BÁSICO
              </button>

              <p className="text-center text-gray-500 text-xs italic">
                Mas antes de comprar... temos uma oferta AINDA MAIS vantajosa para você! Veja logo abaixo ↓
              </p>
            </div>

            {/* PREMIUM */}
            <div data-animate id="plan-premium" className={`p-8 bg-[#EBEBEB] rounded-3xl border-4 border-[#FF9F45] transition-all duration-300 relative text-center hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer ${visibleSections['plan-premium'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 md:left-auto md:right-8 md:transform-none bg-red-400 text-white px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm">MAIS VENDIDO</div>
              
              <h3 className="text-3xl font-black mb-3 text-[#333333] mt-4">Plano Premium</h3>
              <p className="text-[#666] mb-8 font-semibold">Para quem quer proteção espiritual completa</p>
              
              <div className="space-y-2 mb-10">
                <p className="text-gray-400 line-through text-lg">R$ 97,00</p>
                <p className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#FF9F45] to-yellow-400 bg-clip-text text-transparent">R$ 17,99</p>
              </div>

              <ul className="space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Os 50 banhos completos</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Acesso vitalício</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Atualizações mensais</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Arquivos editáveis: PDF, DOCX</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Ebook extra "15 rituais para atrair amizades boas e afastar as ruins"</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Suporte prioritário</li>
              </ul>

              <div className="bg-[#EBEBEB] p-6 mb-10 space-y-3">
                <p className="text-sm text-[#333333]"><Gift size={18} className="inline text-[#FF9F45] mr-2" /> BÔNUS #1: Guia de Proteção Contra Inveja</p>
                <p className="text-sm text-[#333333]"><Gift size={18} className="inline text-[#FF9F45] mr-2" /> BÔNUS #2: 20 Rituais Energéticos para Prosperidade</p>
                <p className="text-sm text-[#333333]"><Gift size={18} className="inline text-[#FF9F45] mr-2" /> BÔNUS #3: Grupo VIP de Espiritualidade</p>
                <p className="text-sm text-[#333333]"><Gift size={18} className="inline text-[#FF9F45] mr-2" /> BÔNUS #4: 30 Rituais Energéticos para Atrair Pessoas</p>
              </div>

              <button id="button-plan-premium" onClick={() => handleCheckout('Plano Premium')} className="w-full py-4 bg-gradient-to-r from-[#FF9F45] to-yellow-400 text-white font-black text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer" data-testid="button-plan-premium">
                GARANTIR O PREMIUM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE NOSSOS CLIENTES DIZEM */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#333333] mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-lg text-[#666] font-semibold">Histórias reais de transformação espiritual</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: client1Image,
                name: 'Maria Silva',
                profession: 'Terapeuta Holística',
                testimonial: '"Os banhos são de uma potência excepcional. Minha energia mudou completamente desde que comecei a usar. Recomendo demais!"'
              },
              {
                image: client2Image,
                name: 'João Santos',
                profession: 'Praticante de Umbanda',
                testimonial: '"Finalmente encontrei receitas que seguem as tradições ancestrais. A eficácia é impressionante e os bônus valem muito a pena."'
              },
              {
                image: client3Image,
                name: 'Ana Costa',
                profession: 'Consultora Espiritual',
                testimonial: '"Investimento que se pagou na primeira semana. A variedade de banhos permite atender qualquer necessidade. Excelente!"'
              }
            ].map((client, idx) => (
              <div key={idx} data-animate id={`testimonial-${idx}`} className={`bg-white rounded-2xl p-8 border border-[#E5E5E5] text-center transition-all duration-300 hover:shadow-xl hover:border-[#FF9F45]/50 hover:-translate-y-2 cursor-pointer ${visibleSections[`testimonial-${idx}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="flex justify-center mb-6">
                  <img src={client.image} alt={client.name} className="w-20 h-20 rounded-full border-4 border-[#FF9F45] object-cover" />
                </div>
                <h3 className="text-lg font-black text-[#333333] mb-1">{client.name}</h3>
                <p className="text-sm text-[#FF9F45] font-semibold mb-4">{client.profession}</p>
                <p className="text-[#555] italic leading-relaxed">{client.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-20 px-4 bg-[#FFF5E6]">
        <div className="max-w-2xl mx-auto text-center">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
            <path d="M12 2L4 6V12C4 17.5 12 22 12 22C12 22 20 17.5 20 12V6L12 2Z" stroke="#FF9F45" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke="#FF9F45" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-3xl font-black mb-6 text-[#333333]">Garantia Incondicional de 7 Dias</h2>
          <p className="text-lg text-[#333333] leading-relaxed mb-4">Estamos tão confiantes na eficácia dos nossos banhos que oferecemos uma garantia incondicional de 7 dias. Se por qualquer motivo você não estiver completamente satisfeito, devolvemos 100% do seu investimento, sem perguntas.</p>
          <p className="text-lg font-black text-[#333333]">Você não tem nada a perder e uma vida espiritual transformada a ganhar!</p>
        </div>
      </section>

      {/* PERGUNTAS FREQUENTES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#333333] mb-3">Perguntas Frequentes</h2>
            <p className="text-lg text-[#666]">Tire todas as suas dúvidas sobre os banhos</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="item-1" className="bg-[#FFF9F0] border-2 border-[#FFD9B3] rounded-xl px-6 transition-all duration-300 hover:border-[#FF9F45] hover:shadow-md">
              <AccordionTrigger className="text-left font-black text-[#333333] hover:text-[#FF9F45] py-4">
                Como recebo os banhos após a compra?
              </AccordionTrigger>
              <AccordionContent className="text-[#555] leading-relaxed pb-4">
                Após a confirmação do pagamento, você recebe um email com o link de acesso imediato. Os arquivos estão disponíveis para download em PDF ou DOCX (conforme seu plano). Você pode acessar a qualquer hora do dia ou noite, em qualquer dispositivo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-[#FFF9F0] border-2 border-[#FFD9B3] rounded-xl px-6 transition-all duration-300 hover:border-[#FF9F45] hover:shadow-md">
              <AccordionTrigger className="text-left font-black text-[#333333] hover:text-[#FF9F45] py-4">
                Em quais formatos os banhos estão disponíveis?
              </AccordionTrigger>
              <AccordionContent className="text-[#555] leading-relaxed pb-4">
                No Plano Básico, os banhos estão em formato PDF. No Plano Premium, você recebe em PDF e DOCX (Word), permitindo que você edite, personalize e salve da forma que preferir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-[#FFF9F0] border-2 border-[#FFD9B3] rounded-xl px-6 transition-all duration-300 hover:border-[#FF9F45] hover:shadow-md">
              <AccordionTrigger className="text-left font-black text-[#333333] hover:text-[#FF9F45] py-4">
                Preciso de conhecimento prévio em espiritualidade?
              </AccordionTrigger>
              <AccordionContent className="text-[#555] leading-relaxed pb-4">
                Não! Os banhos são feitos para iniciantes e praticantes avançados. Cada receita vem com instruções claras e passo a passo. Você só precisa ter vontade de se transformar e elevar sua vibração.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-[#FFF9F0] border-2 border-[#FFD9B3] rounded-xl px-6 transition-all duration-300 hover:border-[#FF9F45] hover:shadow-md">
              <AccordionTrigger className="text-left font-black text-[#333333] hover:text-[#FF9F45] py-4">
                A garantia realmente funciona?
              </AccordionTrigger>
              <AccordionContent className="text-[#555] leading-relaxed pb-4">
                Sim! É 100% incondicional. Se em 7 dias você não gostar, devolvemos todo o seu dinheiro. Sem burocracia, sem perguntas. Confiamos totalmente na qualidade e potência dos nossos banhos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-[#FFF9F0] border-2 border-[#FFD9B3] rounded-xl px-6 transition-all duration-300 hover:border-[#FF9F45] hover:shadow-md">
              <AccordionTrigger className="text-left font-black text-[#333333] hover:text-[#FF9F45] py-4">
                Qual a diferença entre o plano Básico e Premium?
              </AccordionTrigger>
              <AccordionContent className="text-[#555] leading-relaxed pb-4">
                O Plano Básico inclui 20 banhos com acesso por 30 dias. O Plano Premium inclui os 50 banhos completos, acesso vitalício, atualizações mensais, arquivos editáveis e 4 bônus exclusivos no valor de R$ 378. Premium é mais completo e mais em conta!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-[#FFF9F0] border-2 border-[#FFD9B3] rounded-xl px-6 transition-all duration-300 hover:border-[#FF9F45] hover:shadow-md">
              <AccordionTrigger className="text-left font-black text-[#333333] hover:text-[#FF9F45] py-4">
                Posso usar os banhos para ajudar outras pessoas?
              </AccordionTrigger>
              <AccordionContent className="text-[#555] leading-relaxed pb-4">
                Com certeza! Você pode compartilhar as receitas e conhecimento com amigos, familiares e clientes. Muitos terapeutas, videntes e praticantes espirituais usam nossos banhos no seu trabalho com excelentes resultados.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-[#FFF9F0] border-2 border-[#FFD9B3] rounded-xl px-6 transition-all duration-300 hover:border-[#FF9F45] hover:shadow-md">
              <AccordionTrigger className="text-left font-black text-[#333333] hover:text-[#FF9F45] py-4">
                Terei acesso a novos banhos no futuro?
              </AccordionTrigger>
              <AccordionContent className="text-[#555] leading-relaxed pb-4">
                Sim! Se você tiver o Plano Premium, recebe atualizações mensais com novos banhos, rituais e conteúdos exclusivos. No Plano Básico, você tem acesso por 30 dias, após isso pode renovar quando desejar.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-[#FFF9F0] border-2 border-[#FFD9B3] rounded-xl px-6 transition-all duration-300 hover:border-[#FF9F45] hover:shadow-md">
              <AccordionTrigger className="text-left font-black text-[#333333] hover:text-[#FF9F45] py-4">
                Como funciona o suporte?
              </AccordionTrigger>
              <AccordionContent className="text-[#555] leading-relaxed pb-4">
                Nosso suporte é feito exclusivamente por email. Se tiver dúvidas, problemas de acesso ou qualquer outra questão, envie um email para <span className="font-black text-[#FF9F45]">horizontenovosuporte@gmail.com</span> e responderemos em até 24h com a solução.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-[#333333]">Não Perca Esta Oportunidade!</h2>
          
          <p className="text-lg text-[#333333] leading-relaxed">
            Aprenda com os banhos de um jeito fácil e envolvente: são mais de 50 receitas poderosas prontas para transformar sua vida espiritual!
          </p>
          
          <div className="space-y-3 pt-4">
            <p className="text-2xl font-black text-red-500">OFERTA LIMITADA - ACABA EM BREVE!</p>
            <p className="text-xl font-black text-[#FF9F45]">Garantia incondicional de 7 dias</p>
          </div>

          <button
            onClick={() => scrollToSection('button-plan-premium')}
            className="px-6 md:px-16 py-4 bg-gradient-to-r from-[#FF9F45] to-yellow-400 text-white font-black text-lg rounded-full hover:shadow-lg transition-all hover:scale-105 mx-auto block w-full md:w-auto"
            data-testid="button-cta-final"
          >
            GARANTIR MEUS BANHOS AGORA
          </button>
          
          <p className="text-[#666] text-sm pt-4">Acesso imediato • Pagamento 100% seguro • Garantia de 7 dias</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t-2 border-[#FFD9B3] text-center text-white text-sm" style={{ backgroundColor: '#34383B' }}>
        <p>50 Banhos de Descarrego Pesado. Todos os direitos reservados. © 2025</p>
      </footer>
    </div>
  );
}
