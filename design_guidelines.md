# Design Guidelines: Banhos Energéticos Sales Landing Page

## Design Approach
**Reference-Based**: High-converting sales pages (ClickFunnels, Russell Brunson style) with spiritual/mystical aesthetic. Inspiration from premium digital product pages with strong conversion psychology.

## Core Design Principles
- **Psychological Emphasis**: Premium plan (R$27) must be visually dominant through size, positioning, badges, and visual hierarchy
- **Urgency & Scarcity**: Countdown timers, limited-time messaging throughout
- **Emotional Journey**: Pain → Agitation → Solution → Transformation flow
- **Trust Building**: Guarantees, testimonials, author credibility prominently displayed

## Typography System
- **Headlines**: Bold, aggressive, attention-grabbing (2.5rem-4rem desktop, 1.75rem-2.5rem mobile)
- **Subheadlines**: Medium weight, supporting emotional narrative (1.25rem-1.75rem)
- **Body Copy**: Readable, persuasive (1rem-1.125rem with 1.6-1.8 line-height)
- **CTAs**: Bold, uppercase or mixed-case with high contrast
- Use Google Fonts: Montserrat (headlines), Open Sans (body)

## Layout System
- **Spacing Units**: Tailwind 4, 6, 8, 12, 16, 24 for consistent rhythm
- **Container**: max-w-6xl for content, full-width for pricing section
- **Single Column Flow**: All sections stack vertically for narrative progression

## Color Strategy (Descriptive Only)
Dark mystical background with golden/purple accents for spiritual premium feel. High contrast for CTAs and important elements.

## Section Structure

### 1. Hero Section
- Strong headline addressing pain point immediately
- Subheadline showing solution + benefit
- Countdown timer creating urgency
- Single prominent CTA button
- **No hero image** - focus on copy impact

### 2. Problem Agitation
- 3-4 pain points with emotional copywriting
- Icon + text format for each pain point

### 3. Transformation Section
- "Vida com energia desbloqueada" benefits
- Visual icons representing each transformation
- 4-6 key benefits in grid (2 columns mobile, 3-4 desktop)

### 4. Recipe Categories Grid
- Categories: Purificação, Proteção, Prosperidade, Amor, Sucesso, etc.
- Icon + category name cards
- 2 columns mobile, 4-6 columns desktop
- Brief description under each category

### 5. Author Credibility (Marina Silva)
- Professional photo placement
- Credentials and authority markers
- Personal connection copy

### 6. Pricing Comparison (Critical Section)
- **Two-column layout** (Basic vs Premium)
- Premium plan: Larger card, "Mais Popular" badge, visual prominence
- Basic plan: Smaller, less emphasis but still professional
- **Premium**: R$27 clearly displayed, feature list with checkmarks
- **Basic**: R$10, reduced feature list
- Each plan has distinct CTA button

### 7. Upsell Modal (R$17 Offer)
**Trigger**: Clicking "Comprar Plano Básico"
**Modal Content**:
- Overlay with centered modal box
- Headline: "ESPERE! Oferta Exclusiva"
- Copy explaining why this one-time R$17 promotion exists
- Premium plan card replica with R$27 crossed out, R$17 prominent
- Two clear buttons:
  - **SIM** (green/positive): Goes to R$17 Premium checkout
  - **NÃO** (neutral): Goes to R$10 Basic checkout
- Close X button (also goes to R$10 checkout)

### 8. Guarantee Section
- 7-day unconditional guarantee badge
- Reassuring copy reducing purchase anxiety
- Risk-reversal language

### 9. Testimonials
- 3-6 client testimonials with 5-star ratings
- Name + brief result
- Grid layout (1 column mobile, 2-3 columns desktop)

### 10. FAQ Accordion
- 5-8 common questions
- Expandable/collapsible design
- Addresses objections directly

### 11. Final CTA
- Urgent call-to-action repeating offer
- Scarcity messaging ("últimas vagas", "oferta terminando")
- Direct links to both plans

## Component Specifications

### Pricing Cards
- Premium: Larger scale (1.05-1.1x), subtle shadow/glow, "Recomendado" badge
- Feature lists with check icons
- Price display: Large number, "R$" smaller, "por apenas" copy
- CTA buttons full-width within cards

### Modal Design
- Dark overlay (backdrop-blur)
- White/light modal centered
- Max-width: 600px
- Padding: p-8
- Clear visual hierarchy: headline → price → buttons

### Buttons
- Primary (Premium): Larger, bolder, high-contrast
- Secondary (Basic): Standard size, less prominent
- Modal Yes: Positive action styling
- Modal No: Neutral/subtle styling
- All buttons: Rounded corners, adequate padding (py-4 px-8)

## Responsiveness
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Pricing cards: Stack on mobile, side-by-side on tablet+
- Typography scales down 20-30% on mobile
- Touch-friendly tap targets (min 44px)
- Modal adapts to mobile viewport (full-width minus margin)

## Icons
Use Heroicons (CDN) for all UI icons: check marks, category icons, close buttons, arrows

## Checkout Integration
Three checkout flows:
1. Premium R$27 (direct from pricing)
2. Premium R$17 (from upsell modal "Sim")
3. Basic R$10 (from pricing or modal "Não")