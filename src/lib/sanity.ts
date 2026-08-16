/**
 * Sanity read client + image URL helper.
 *
 * The `production` dataset is public, so no token is needed for the images
 * this site renders. `useCdn` serves cached, edge-delivered responses.
 */
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const sanity = createClient({
  projectId: "c6i8g8qm",
  dataset: "production",
  apiVersion: "2026-08-13",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanity);

/** Build a CDN image URL from a Sanity image reference. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface SanityImageWithAlt {
  asset?: { _ref: string; _id?: string };
  alt?: string;
}

export interface HeroSlide {
  label: string;
  image?: SanityImageWithAlt;
}

export interface BeforeAfterPairImages {
  label: string;
  beforeImage?: SanityImageWithAlt;
  afterImage?: SanityImageWithAlt;
}

export interface SiteImages {
  heroSlides?: HeroSlide[];
  aboutImage?: SanityImageWithAlt;
  beforeAfterPairs?: BeforeAfterPairImages[];
}

// Hero slides, the before/after pairs, and the about photo each live in
// their own document now (heroCarousel, beforeAfterCarousel, siteImages) so
// editors get a dedicated, easy-to-find entry per section in the Studio —
// this query just re-flattens them into the same shape the rest of the
// codebase already expects.
// Each singleton is looked up by its exact _id, not just _type — a stray
// second document of the same _type (e.g. a leftover draft, or one an
// editor accidentally created before the Studio's structure.ts pinning
// kicked in) would otherwise make "[0]" pick a document at random.
const SITE_IMAGES_QUERY = `{
  "heroSlides": *[_type == "heroCarousel" && _id == "heroCarousel"][0].slides[]{ label, image },
  "aboutImage": *[_type == "siteImages" && _id == "siteImages"][0].aboutImage,
  "beforeAfterPairs": *[_type == "beforeAfterCarousel" && _id == "beforeAfterCarousel"][0].pairs[]{ label, beforeImage, afterImage }
}`;

export async function getSiteImages(): Promise<SiteImages | null> {
  try {
    return await sanity.fetch<SiteImages | null>(SITE_IMAGES_QUERY);
  } catch {
    return null;
  }
}
