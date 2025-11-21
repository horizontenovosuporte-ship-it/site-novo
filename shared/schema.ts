import { z } from "zod";

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  features: z.array(z.string()),
  bathCount: z.number(),
  badge: z.string().optional(),
  highlighted: z.boolean().default(false),
});

export const checkoutSchema = z.object({
  planId: z.string(),
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
});

export type Plan = z.infer<typeof planSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Plano Básico",
    price: 10,
    bathCount: 120,
    features: [
      "120 Banhos Energéticos",
      "Guia Básico de Preparação",
      "Acesso Imediato",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Plano Premium",
    price: 27,
    bathCount: 150,
    badge: "MAIS POPULAR",
    features: [
      "150 Banhos Energéticos com receitas completas",
      "Guia Completo de Preparação e potencialização",
      "Calendário Lunar para maximizar resultados",
      "Manual de Ervas e Seus Poderes",
      "Orações e Mantras para potencializar seus banhos",
      "Acesso Vitalício - baixe e consulte quando quiser",
    ],
    highlighted: true,
  },
  {
    id: "premium-upsell",
    name: "Plano Premium",
    price: 17,
    originalPrice: 27,
    bathCount: 150,
    badge: "OFERTA ESPECIAL",
    features: [
      "150 Banhos Energéticos com receitas completas",
      "Guia Completo de Preparação e potencialização",
      "Calendário Lunar para maximizar resultados",
      "Manual de Ervas e Seus Poderes",
      "Orações e Mantras para potencializar seus banhos",
      "Acesso Vitalício - baixe e consulte quando quiser",
    ],
    highlighted: true,
  },
];
