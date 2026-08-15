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

const SITE_IMAGES_QUERY = `*[_type == "siteImages"][0]{
  heroSlides[]{ label, image },
  aboutImage,
  beforeAfterPairs[]{ label, beforeImage, afterImage }
}`;

export async function getSiteImages(): Promise<SiteImages | null> {
  try {
    return await sanity.fetch<SiteImages | null>(SITE_IMAGES_QUERY);
  } catch {
    return null;
  }
}
