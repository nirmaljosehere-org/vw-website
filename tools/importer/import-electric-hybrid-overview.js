/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroDarkParser from './parsers/hero-dark.js';
import cardsSpecsParser from './parsers/cards-specs.js';
import columnsComparisonParser from './parsers/columns-comparison.js';
import cardsIconParser from './parsers/cards-icon.js';
import carouselFeaturesParser from './parsers/carousel-features.js';
import heroBannerParser from './parsers/hero-banner.js';
import columnsInfoParser from './parsers/columns-info.js';
import cardsArticleParser from './parsers/cards-article.js';

// TRANSFORMER IMPORTS
import cupraCleanupTransformer from './transformers/cupra-cleanup.js';
import cupraSectionsTransformer from './transformers/cupra-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-dark': heroDarkParser,
  'cards-specs': cardsSpecsParser,
  'columns-comparison': columnsComparisonParser,
  'cards-icon': cardsIconParser,
  'carousel-features': carouselFeaturesParser,
  'hero-banner': heroBannerParser,
  'columns-info': columnsInfoParser,
  'cards-article': cardsArticleParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'electric-hybrid-overview',
  description: 'Electric and hybrid vehicle overview page with hero, model comparison cards, feature highlights, CTA banners, and informational columns',
  urls: [
    'https://www.cupraofficial.co.uk/electric-and-hybrid',
  ],
  blocks: [
    {
      name: 'hero-dark',
      instances: ['.hero-ev'],
    },
    {
      name: 'cards-specs',
      instances: ['.model-table'],
    },
    {
      name: 'columns-comparison',
      instances: ['.info-cards.base-container:has(.cmp-info-cards--extended-cards)'],
    },
    {
      name: 'cards-icon',
      instances: ['.icon-cards'],
    },
    {
      name: 'carousel-features',
      instances: ['.smooth-vertical-slide'],
    },
    {
      name: 'hero-banner',
      instances: [
        '.banner.component:has(.cmp-banner__title #title-266dfc4662)',
        '.banner.component:has(.cmp-banner__title #title-9ce16d5ee3)',
      ],
    },
    {
      name: 'columns-info',
      instances: [
        '.two-columns:has(#title-510ce9a691)',
        '.two-columns:has(#title-225ca081de)',
      ],
    },
    {
      name: 'cards-article',
      instances: ['.info-cards.base-container:has(.cmp-info-cards--mini-cards)'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.hero-ev',
      style: null,
      blocks: ['hero-dark'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Model Comparison',
      selector: '.model-table',
      style: 'dark',
      blocks: ['cards-specs'],
      defaultContent: ['.cmp-model-table__title h2'],
    },
    {
      id: 'section-3',
      name: 'EV vs PHEV Comparison',
      selector: '.info-cards.base-container:has(.cmp-info-cards--extended-cards)',
      style: 'dark',
      blocks: ['columns-comparison'],
      defaultContent: ['.cmp-info-cards--extended-cards .cmp-info-cards__top'],
    },
    {
      id: 'section-4',
      name: 'Find Your EV',
      selector: '.icon-cards',
      style: 'dark',
      blocks: ['cards-icon'],
      defaultContent: ['.cmp-icon-cards__top h2'],
    },
    {
      id: 'section-5',
      name: 'Advantages',
      selector: '.smooth-vertical-slide',
      style: 'dark',
      blocks: ['carousel-features'],
      defaultContent: ['.cmp-smooth-vertical-slide__top'],
    },
    {
      id: 'section-6',
      name: 'Test Drive Banner',
      selector: '.banner.component:has(.cmp-banner__title #title-266dfc4662)',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Charging Map and CUPRA Connect',
      selector: [
        '.two-columns:has(#title-510ce9a691)',
        '.two-columns:has(#title-225ca081de)',
      ],
      style: 'dark',
      blocks: ['columns-info'],
      defaultContent: [],
    },
    {
      id: 'section-8',
      name: 'More EV Info Cards',
      selector: '.info-cards.base-container:has(.cmp-info-cards--mini-cards)',
      style: 'dark',
      blocks: ['cards-article'],
      defaultContent: ['.cmp-info-cards--mini-cards .cmp-info-cards__top h2'],
    },
    {
      id: 'section-9',
      name: 'FAQs Banner',
      selector: '.banner.component:has(.cmp-banner__title #title-9ce16d5ee3)',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-10',
      name: 'Disclaimer',
      selector: '.disclaimer',
      style: 'dark',
      blocks: [],
      defaultContent: ['.cmp-disclaimer__text'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cupraCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [cupraSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
