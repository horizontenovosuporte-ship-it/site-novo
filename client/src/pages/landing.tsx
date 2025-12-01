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
import heroImage from "@assets/generated_images/vertical_book_cover_método_da_purificação_total.png";
import bonus1Image from "@assets/1_1764443110192.png";
import bonus2Image from "@assets/2_1764443110193.png";
import bonus3Image from "@assets/3_1764443110193.png";
import bonus4Image from "@assets/4_1764443110193.png";
import client1Image from "@assets/generated_images/brazilian_woman_client_portrait_1.png";
import client2Image from "@assets/generated_images/brazilian_man_client_portrait_2.png";
import client3Image from "@assets/generated_images/mature_brazilian_woman_client_portrait.png";
import authorImage from "@assets/Design_sem_nome_8_1764619642114.png";

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
          <div data-animate id="hero-image" className={`transition-all duration-1000 flex justify-center ${visibleSections['hero-image'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <img src={heroImage} alt="Método da Purificação Total - Limpe sua energia" className="w-40 h-auto md:w-56 rounded-2xl shadow-lg hover:shadow-xl transition-all animate-float-up" />
          </div>

          {/* TÍTULO PRINCIPAL */}
          <div data-animate id="hero-text" className={`text-center transition-all duration-1000 ${visibleSections['hero-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-5xl md:text-6xl font-black text-[#FF9F45] mb-3">
              Se sua energia está pesada, nada flui e você vive cansado…
            </h1>
            <p className="text-lg md:text-xl font-bold text-[#333333] mb-2">
              Isso NÃO é normal. E você pode limpar tudo em 7 dias.
            </p>
            <p className="text-sm md:text-base font-semibold text-[#666]">
              Método espiritual simples, rápido e poderoso — sem ingredientes caros, sem crença obrigatória, sem rituais complexos.
            </p>
          </div>

          {/* COPY AGRESSIVA - 3 PONTOS */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="text-center">
                <p className="font-black text-[#333333]">✨ Limpeza profunda de energias negativas</p>
              </div>
              <div className="text-center">
                <p className="font-black text-[#333333]">🛡️ Proteção espiritual de longo prazo</p>
              </div>
              <div className="text-center">
                <p className="font-black text-[#333333]">⚡ Vibração mais leve e clara</p>
              </div>
              <div className="text-center">
                <p className="font-black text-[#333333]">❤️ Paz interior em poucos dias</p>
              </div>
              <div className="text-center">
                <p className="font-black text-[#333333]">✓ Método testado e aprovado</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollToSection('button-plan-premium')}
            className="w-full py-6 md:py-7 bg-gradient-to-r from-[#FF9F45] to-yellow-400 text-white font-black text-lg md:text-xl rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            data-testid="button-hero-cta"
          >
            👉 QUERO LIMPAR MINHA ENERGIA AGORA
          </button>

          {/* GARANTIA E URGÊNCIA */}
          <div className="text-center space-y-2">
            <p className="font-bold text-green-700 text-sm">✔ Acesso imediato • ✔ 100% seguro • ✔ Garantia de 7 dias</p>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS - VISUAL */}
      <section className="py-20 px-4 bg-[#FFF5E6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-[#333333]">Você está vivendo essas situações? Então sua energia está sobrecarregada.</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Bird, title: 'Cansado mesmo dormindo bem', desc: '' },
              { icon: Shield, title: 'Mente confusa e pesada', desc: '' },
              { icon: Sparkles, title: 'Tudo trava, nada anda', desc: '' },
              { icon: Flame, title: 'Inveja, olho gordo, clima estranho', desc: '' },
              { icon: Heart, title: 'Pessoas que sugam energia', desc: '' },
              { icon: Sun, title: 'Casa carregada, aperto', desc: '' },
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
                  <h3 className="font-black text-lg mb-2 text-[#333333]">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-[#333333]">Bônus Exclusivos — Disponíveis Apenas Hoje</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: bonus1Image, title: 'Mapa de Proteção 24h Contra Inveja', price: 67 },
              { image: bonus2Image, title: '20 Rituais Energéticos de Prosperidade Instantânea', price: 57 },
              { image: bonus3Image, title: 'Guia "Escudo Espiritual"', price: 97 },
              { image: bonus4Image, title: 'Acesso ao Grupo VIP Espiritual', price: 97 },
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
            <p className="text-xl md:text-2xl font-black text-[#333333]">Valor total dos bônus: <span className="line-through text-[#FFB366]">R$ 318</span></p>
            <p className="text-4xl md:text-5xl font-black text-[#FF9F45]">➡ HOJE: R$ 0</p>
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
              
              <div className="space-y-2 mb-10">
                <p className="text-4xl md:text-6xl font-black text-[#FF9F45]">R$ 14,90</p>
              </div>

              <ul className="space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Módulos 1 e 2</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Acesso vitalício</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Material em PDF</li>
              </ul>

              <button onClick={() => handleCheckout('Plano Básico')} className="w-full py-4 bg-gray-600 text-white font-black text-lg rounded-full hover:bg-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 mb-6 cursor-pointer" data-testid="button-plan-basic">
                👉 QUERO O BÁSICO
              </button>

              <p className="text-center text-gray-500 text-xs italic">
                Mas antes de comprar... temos uma oferta AINDA MAIS vantajosa para você! Veja logo abaixo ↓
              </p>
            </div>

            {/* PREMIUM */}
            <div data-animate id="plan-premium" className={`p-8 bg-[#EBEBEB] rounded-3xl border-4 border-[#FF9F45] transition-all duration-300 relative text-center hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer ${visibleSections['plan-premium'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 md:left-auto md:right-8 md:transform-none bg-red-400 text-white px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm">⭐ MAIS VENDIDO</div>
              
              <h3 className="text-3xl font-black mb-3 text-[#333333] mt-4">Plano Premium</h3>
              
              <div className="space-y-2 mb-10">
                <p className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#FF9F45] to-yellow-400 bg-clip-text text-transparent">R$ 24,90</p>
              </div>

              <ul className="space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Módulos 1, 2, 3, 4, 5, 6 e 7</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Todos os 34 banhos</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Todos os bônus (R$ 318 grátis)</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Acesso vitalício</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> Suporte por email</li>
                <li className="flex items-center gap-3 text-[#333333]"><span className="text-[#333333] text-xl">✓</span> PDF + DOCX</li>
              </ul>

              <button id="button-plan-premium" onClick={() => handleCheckout('Plano Premium')} className="w-full py-4 bg-gradient-to-r from-[#FF9F45] to-yellow-400 text-white font-black text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer" data-testid="button-plan-premium">
                🔥 QUERO O PREMIUM COMPLETO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE NOSSOS CLIENTES DIZEM */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#333333] mb-4">Histórias reais de pessoas que transformaram sua energia</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: client1Image,
                name: 'Maria S.',
                profession: 'Terapeuta Holística',
                testimonial: '"Minha energia mudou em 48 horas. Senti leveza e paz como há meses não sentia."'
              },
              {
                image: client2Image,
                name: 'João S.',
                profession: 'Umbandista',
                testimonial: '"Receitas fortes, ancestrais e verdadeiras. Funcionam, ponto."'
              },
              {
                image: client3Image,
                name: 'Ana C.',
                profession: 'Consultora Espiritual',
                testimonial: '"Sigo usando até hoje. É prático, simples e extremamente poderoso."'
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

      {/* SEÇÃO AUTORA - MÃE CELESTE */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div data-animate id="author-section" className={`transition-all duration-1000 ${visibleSections['author-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* FOTO */}
            <img 
              src={authorImage} 
              alt="Mãe Celeste" 
              className="w-56 h-56 md:w-64 md:h-64 aspect-square object-cover rounded-2xl shadow-2xl border-6 border-[#FF9F45] mx-auto mb-8"
            />

            {/* NOME E TÍTULO */}
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-2">
              Mãe Celeste
            </h2>
            <p className="text-lg font-black text-[#FF9F45] mb-6">Guardiã Espiritual</p>

            {/* BIO CONCISA */}
            <p className="text-base text-[#333333] leading-relaxed mb-6 font-semibold">
              12 anos dedicados à energia espiritual e cura profunda. Autoridade reconhecida em limpeza energética, com métodos testados que transformaram a vida de milhares de pessoas.
            </p>

            {/* QUOTE */}
            <p className="text-base text-[#333333] italic font-semibold mb-6 border-l-4 border-[#FF9F45] pl-4">
              "Energia limpa é liberdade. Liberdade é poder. E você merece estar poderoso."
            </p>

            {/* CREDIBILIDADE */}
            <p className="text-sm text-[#666]">
              Cada um dos 34 banhos carrega sabedoria ancestral, testes reais e resultados comprovados. Você está aprendendo com a melhor.
            </p>
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
                <strong className="text-[#333333]">Básico (R$ 14,90):</strong> Módulos 1-2 com 2 tipos de banhos de descarrego. Acesso por 30 dias. Sem bônus. <br/><br/>
                <strong className="text-[#333333]">Premium (R$ 24,90):</strong> Todos os 34 banhos em 7 módulos completos + atualizações mensais + arquivos PDF e DOCX + acesso vitalício + 4 bônus exclusivos (R$ 318 de valor) + suporte por email. <br/><br/>
                <span className="text-[#FF9F45] font-black">O Premium é a escolha inteligente — você paga pouco mais e recebe tudo!</span>
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
        <p>Método da Purificação Total • Mãe Celeste © 2025 • Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
