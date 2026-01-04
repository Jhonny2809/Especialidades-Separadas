
export interface SpecialtyClass {
  name: string;
  count: number;
  color: string;
  gradient: string;
  items: string[];
  price: string;
  checkoutUrl: string;
  logo?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatarColor: string;
  image?: string;
}

export interface SampleItem {
  title: string;
  image: string;
}

export interface PricingState {
  title: string;
  subtitle: string;
  cardTitle: string;
  cardSubtitle: string;
  originalPrice: string;
  currentPrice: string;
  discountLabel: string;
  paymentLabel: string;
  offerItems: string[];
  bonusItems?: string[];
  cardFeatures: string[];
}

export interface FooterState {
  guaranteeTitle: string;
  guaranteeText: string;
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaButton: string;
}

export interface GlobalSettings {
  pixelCode: string;
  enableAnimations: boolean;
  checkoutUrl: string;
  upsellCheckoutUrl: string;
  marqueeSpeed: number;
  testimonialSpeed: number;
}

export interface ContentState {
  hero: {
    title: string;
    subtitle: string;
    highlight: string;
    cta: string;
    badges: string[];
    coverImage: string;
    logo: string;
  };
  classes: SpecialtyClass[];
  samples: SampleItem[];
  features: Feature[];
  testimonials: Testimonial[];
  pricing: PricingState;
  footer: FooterState;
  settings: GlobalSettings;
}