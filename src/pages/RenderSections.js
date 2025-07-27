// Variants des sections
import {
  HeroDefault,
  HeroSplit,
  HeroSplitInverse,
  HeroMinimal,
  HeroInfo,
  HeroInfoInverse,
  HeroCarousel,
  HeroLocalisation,
  HeroWithFilters,
} from "../components/sections/HeroVariants";
import {
  GridColumns,
  GridIcons,
  GridCards,
  GridSplit,
  GridSplitDark,
  GridSections,
  TwoCardsGrid,
  CategoryGrid,
  LatestProductsGrid,
  GridThreeIcon,
} from "../components/sections/GridVariants";
import { FaqAccordion, FaqList } from "../components/sections/FaqVariants";
import {
  CtaAppDownload,
  CtaCentered,
  CtaContact,
  CtaNewsletter,
  CtaSplit,
} from "../components/sections/CallToActionVariants";
import {
  CarouselSimple,
  CarouselWithCaptions,
  CarouselYTB,
} from "../components/sections/CarouelsVariants";

// Fonction d'affichage selon le type + variant
export function RenderSection(section) {
  const { type, variant, id } = section;

  const map = {
    hero: {
      default: HeroDefault,
      split: HeroSplit,
      "split-inverse": HeroSplitInverse,
      minimal: HeroMinimal,
      carousel: HeroCarousel,
      localisation: HeroLocalisation,
      info: HeroInfo,
      "info-inverse": HeroInfoInverse,
      "with-filters": HeroWithFilters,
    },
    grid: {
      columns: GridColumns,
      icons: GridIcons,
      cards: GridCards,
      "three-icons": GridThreeIcon,
      split: GridSplit,
      "split-dark": GridSplitDark,
      sections: GridSections,
      "two-cards": TwoCardsGrid,
      "latest-products": LatestProductsGrid,
      categories: CategoryGrid,
    },
    calltoaction: {
      centered: CtaCentered,
      split: CtaSplit,
      app: CtaAppDownload,
      newsletter: CtaNewsletter,
      contact: CtaContact,
    },
    carousel: {
      simple: CarouselSimple,
      link: CarouselYTB,
      "with-captions": CarouselWithCaptions,
    },
    faq: {
      accordion: FaqAccordion,
      list: FaqList,
    },
  };

  const Component = map[type]?.[variant];
  return Component ? <Component key={id} section={section} /> : null;
}
