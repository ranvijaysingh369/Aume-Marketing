/* ============================================================
 * src/lib/assets.ts — typed asset registry
 *
 * Mirrors content-brief.md §D asset budget.
 * Only assets with a job in the brief appear here.
 * vid-2 / vid-4 / vid-5 are reserved for future journal posts
 * and intentionally excluded from this registry.
 * ============================================================ */

export interface ImageAsset {
  id: string;
  source: string;
  webp: string;
  jpg: string;
  description: string;
  usedOn: readonly string[];
}

export interface VideoAsset {
  id: string;
  source: string;
  src: string;
  src720: string;
  poster: string;
  subject: string;
  usedOn: readonly string[];
}

export const images = {
  'logo-3d': {
    id: 'logo-3d',
    source: 'Aume Final Logo 3d.jpg',
    webp: '/assets/images/aume-final-logo-3d.webp',
    jpg:  '/assets/images/aume-final-logo-3d.jpg',
    description: 'aumé wordmark',
    usedOn: ['/buy §3 watermark close', 'global footer'],
  },
  // Two product photos used across the site. Each picked for the section
  // whose copy it actually serves. Sections without a clear photo job have
  // no image at all — copy carries the section.
  'honey-jar': {
    id: 'honey-jar',
    source: 'hf_20260501_043643_a2959d2a-0872-4201-a628-f438cc22ea37.png',
    webp: '/assets/images/honey-jar.webp',
    jpg:  '/assets/images/honey-jar.jpg',
    description: 'aumé Himalayan Clear Honey jar — 12 oz, gold lid, centre product shot',
    usedOn: ['/ §2 the premise', '/buy §1 product'],
  },
  'honey-front-and-back': {
    id: 'honey-front-and-back',
    source: 'honey front and back.jpeg',
    webp: '/assets/images/honey-front-and-back.webp',
    jpg:  '/assets/images/honey-front-and-back.jpg',
    description: 'aumé Himalayan Clear Honey jar — front and back labels visible',
    usedOn: ['/story §2 the valley', '/the-honey §3 back label'],
  },
  // Black-background variant — used on /v2/the-honey §3 so the
  // photograph blends into the dark page surface.
  'honey-front-and-back-black': {
    id: 'honey-front-and-back-black',
    source: 'honey front and back - black.JPG',
    webp: '/assets/images/honey-front-and-back-black.webp',
    jpg:  '/assets/images/honey-front-and-back-black.jpg',
    description: 'aumé Himalayan Clear Honey jar — front and back labels visible, black background',
    usedOn: ['/v2/the-honey §3 notes'],
  },
  // /v2/the-ghee §3 product photograph — A2 Bilona Ghee jar.
  'bilona-v2': {
    id: 'bilona-v2',
    source: 'bilona v2.png',
    webp: '/assets/images/bilona-v2.webp',
    jpg:  '/assets/images/bilona-v2.jpg',
    description: 'aumé A2 Bilona Ghee jar — product photograph',
    usedOn: ['/v2/the-ghee §3 notes'],
  },
} as const satisfies Record<string, ImageAsset>;

export const videos = {
  'dancer-honey': {
    id: 'dancer-honey',
    source: 'dancer honey.mp4',
    src:    '/assets/video/dancer-honey.mp4',
    src720: '/assets/video/dancer-honey-720.mp4',
    poster: '/assets/images/poster-dancer-honey.jpg',
    subject: 'Dancer interacting with falling honey — flagship cinematic hero',
    usedOn: ['/the-honey full-bleed backdrop'],
  },
  'honey-hover': {
    id: 'honey-hover',
    source: 'honey hover.mp4',
    src:    '/assets/video/honey-hover.mp4',
    src720: '/assets/video/honey-hover-720.mp4',
    poster: '/assets/images/poster-honey-hover.jpg',
    subject: 'Honey close-up / viscous pour, golden light — encoded native 1440² CRF 17',
    usedOn: ['/ §1 hero backdrop'],
  },
  'honey-drinking-flower': {
    id: 'honey-drinking-flower',
    source: 'honey drinking flower.mp4',
    src:    '/assets/video/honey-drinking-flower.mp4',
    src720: '/assets/video/honey-drinking-flower-720.mp4',
    poster: '/assets/images/poster-honey-drinking-flower.jpg',
    subject: 'Honey drinking flower — encoded native CRF 17 from canonical source',
    usedOn: ['/story full-bleed backdrop'],
  },
  'aume-hero': {
    id: 'aume-hero',
    source: 'From the earth hero page.mp4',
    src:    '/assets/video/aume-hero-fte.mp4',
    src720: '/assets/video/aume-hero-fte-720.mp4',
    poster: '/assets/images/poster-aume-hero-fte.jpg',
    subject: 'From the Earth hero footage — brand-level signifier (not a product origin claim)',
    usedOn: ['/v2/ §1 hero backdrop'],
  },
  // v2 §2 honey tile — honey-hover footage per founder direction.
  'honey-tile': {
    id: 'honey-tile',
    source: 'honey hover.mp4',
    src:    '/assets/video/honey-hover.mp4',
    src720: '/assets/video/honey-hover-720.mp4',
    poster: '/assets/images/poster-honey-hover.jpg',
    subject: 'Honey hover — close-up jar with bees and dripping honey',
    usedOn: ['/v2/ §2 honey tile backdrop'],
  },
  // §3 ghee tile on /v2/ home — bilona ghee hero footage.
  'ghee-tile': {
    id: 'ghee-tile',
    source: 'bilona ghee hero.mp4',
    src:    '/assets/video/bilona-ghee-hero.mp4',
    src720: '/assets/video/bilona-ghee-hero-720.mp4',
    poster: '/assets/images/poster-bilona-ghee-hero.jpg',
    subject: 'Bilona ghee hero — process footage',
    usedOn: ['/v2/ §3 ghee tile backdrop'],
  },
  // /v2/the-ghee §1 product hero — Bilona Ghee Making footage.
  'ghee-product': {
    id: 'ghee-product',
    source: 'Bilona Ghee Making Video.mp4',
    src:    '/assets/video/aume-ghee.mp4',
    src720: '/assets/video/aume-ghee-720.mp4',
    poster: '/assets/images/poster-aume-ghee.jpg',
    subject: 'Bilona ghee making — slow hand-churn process footage',
    usedOn: ['/v2/the-ghee §1 product hero'],
  },
  // /v2/the-honey §1 product hero — bees drinking from blossoms.
  'honey-product': {
    id: 'honey-product',
    source: 'honey drinking flower.mp4',
    src:    '/assets/video/honey-drinking-flower.mp4',
    src720: '/assets/video/honey-drinking-flower-720.mp4',
    poster: '/assets/images/poster-honey-drinking-flower.jpg',
    subject: 'Bees drinking nectar from blossoms — provenance footage',
    usedOn: ['/v2/the-honey §1 product hero'],
  },
} as const satisfies Record<string, VideoAsset>;

export function img(id: keyof typeof images): ImageAsset { return images[id]; }
export function vid(id: keyof typeof videos): VideoAsset { return videos[id]; }
