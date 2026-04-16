var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-electric-hybrid-overview.js
  var import_electric_hybrid_overview_exports = {};
  __export(import_electric_hybrid_overview_exports, {
    default: () => import_electric_hybrid_overview_default
  });

  // tools/importer/parsers/hero-dark.js
  function parse(element, { document }) {
    const img = element.querySelector(".cmp-hero-ev__image img, .cmp-image__image");
    const heading = element.querySelector(".cmp-hero-ev__title h1, h1");
    const text = element.querySelector(".cmp-hero-ev__text p, .cmp-text-ds p");
    const cells = [];
    if (img) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(img.cloneNode(true));
      cells.push([imgFrag]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading.cloneNode(true));
    if (text) textFrag.appendChild(text.cloneNode(true));
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-dark", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-specs.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(".cmp-model-table-card, article.cmp-model-table-card");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".cmp-model-table-card__image img");
      const imgFrag = document.createDocumentFragment();
      if (img) {
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(img.cloneNode(true));
      }
      const title = card.querySelector(".cmp-model-table-card__title");
      const typeLabel = card.querySelector(".cmp-model-table-card__description p, .cmp-text-ds p");
      const rows = card.querySelectorAll(".cmp-model-table-card__row");
      const link = card.querySelector(".cmp-model-table-card__cta a, a");
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        textFrag.appendChild(h3);
      }
      if (typeLabel) {
        const p = document.createElement("p");
        p.textContent = typeLabel.textContent.trim();
        textFrag.appendChild(p);
      }
      rows.forEach((row) => {
        const label = row.querySelector(".cmp-model-table-card__label");
        const value = row.querySelector(".cmp-model-table-card__value");
        if (label && value) {
          const p = document.createElement("p");
          const unit = value.querySelector(".cmp-model-table-card__unit");
          p.textContent = `${label.textContent.trim()}: ${value.textContent.trim()}`;
          textFrag.appendChild(p);
        }
      });
      if (link) {
        const p = document.createElement("p");
        p.appendChild(link.cloneNode(true));
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const sectionHeading = element.querySelector(".cmp-model-table__title h2, :scope > section > .cmp-model-table__container > .cmp-model-table__top h2");
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-specs", cells });
    if (sectionHeading) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionHeading.textContent.trim();
      element.replaceWith(h2, block);
    } else {
      element.replaceWith(block);
    }
  }

  // tools/importer/parsers/columns-comparison.js
  function parse3(element, { document }) {
    const cards = element.querySelectorAll(".cmp-info-cards-card");
    const col1Frag = document.createDocumentFragment();
    const col2Frag = document.createDocumentFragment();
    cards.forEach((card, idx) => {
      const frag = idx === 0 ? col1Frag : col2Frag;
      const img = card.querySelector(".cmp-info-cards-card__image img");
      if (img) frag.appendChild(img.cloneNode(true));
      const title = card.querySelector(".cmp-info-cards-card__title h3, h3");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        frag.appendChild(h3);
      }
      const featureGrid = card.querySelector(".cmp-info-cards-card__content .aem-Grid, .cmp-info-cards-card__content");
      if (featureGrid) {
        const featureTitles = featureGrid.querySelectorAll("h4");
        const featureTexts = featureGrid.querySelectorAll(".text p, .cmp-text-ds p");
        featureTitles.forEach((ft, i) => {
          const h4 = document.createElement("h4");
          h4.textContent = ft.textContent.trim();
          frag.appendChild(h4);
          if (featureTexts[i]) {
            const p = document.createElement("p");
            p.textContent = featureTexts[i].textContent.trim();
            frag.appendChild(p);
          }
        });
      }
      const cta = card.querySelector(".cmp-info-cards-card__cta a, ds-link-button");
      if (cta) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = cta.getAttribute("href") || cta.href || "";
        a.textContent = cta.textContent.trim();
        p.appendChild(a);
        frag.appendChild(p);
      }
    });
    const sectionTop = element.querySelector(".cmp-info-cards__top");
    const sectionHeading = sectionTop ? sectionTop.querySelector("h2") : null;
    const sectionText = sectionTop ? sectionTop.querySelector("p") : null;
    const cells = [[col1Frag, col2Frag]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-comparison", cells });
    const fragments = [];
    if (sectionHeading) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionHeading.textContent.trim();
      fragments.push(h2);
    }
    if (sectionText) {
      const p = document.createElement("p");
      p.textContent = sectionText.textContent.trim();
      fragments.push(p);
    }
    fragments.push(block);
    element.replaceWith(...fragments);
  }

  // tools/importer/parsers/cards-icon.js
  function parse4(element, { document }) {
    const cards = element.querySelectorAll(".cmp-icon-cards-card");
    const cells = [];
    cards.forEach((card) => {
      const imgFrag = document.createDocumentFragment();
      const title = card.querySelector(".cmp-icon-cards-card__title h3, h3");
      const text = card.querySelector(".cmp-icon-cards-card__text p, .cmp-text-ds p");
      const cta = card.querySelector(".cmp-icon-cards-card__cta a");
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        textFrag.appendChild(h3);
      }
      if (text) {
        const p = document.createElement("p");
        p.textContent = text.textContent.trim();
        textFrag.appendChild(p);
      }
      if (cta) {
        const p = document.createElement("p");
        p.appendChild(cta.cloneNode(true));
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const sectionHeading = element.querySelector(".cmp-icon-cards__top h2, :scope > section > .cmp-icon-cards__container > .cmp-icon-cards__top h2");
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-icon", cells });
    if (sectionHeading) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionHeading.textContent.trim();
      element.replaceWith(h2, block);
    } else {
      element.replaceWith(block);
    }
  }

  // tools/importer/parsers/carousel-features.js
  function parse5(element, { document }) {
    const slides = element.querySelectorAll(".cmp-smooth-vertical-slide-item, article.cmp-smooth-vertical-slide-item");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector(".cmp-smooth-vertical-slide-item__image img, .cmp-image__image");
      const imgFrag = document.createDocumentFragment();
      if (img) {
        imgFrag.appendChild(document.createComment(" field:media_image "));
        imgFrag.appendChild(img.cloneNode(true));
      }
      const heading = slide.querySelector(".cmp-smooth-vertical-slide-item__title h3, h3");
      const text = slide.querySelector(".cmp-smooth-vertical-slide-item__text p, .cmp-text-ds p");
      const contentFrag = document.createDocumentFragment();
      contentFrag.appendChild(document.createComment(" field:content_text "));
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        contentFrag.appendChild(h3);
      }
      if (text) {
        const p = document.createElement("p");
        p.textContent = text.textContent.trim();
        contentFrag.appendChild(p);
      }
      cells.push([imgFrag, contentFrag]);
    });
    const sectionTop = element.querySelector(".cmp-smooth-vertical-slide__top");
    const sectionHeading = sectionTop ? sectionTop.querySelector("h2") : null;
    const sectionText = sectionTop ? sectionTop.querySelector("p") : null;
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-features", cells });
    const fragments = [];
    if (sectionHeading) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionHeading.textContent.trim();
      fragments.push(h2);
    }
    if (sectionText) {
      const p = document.createElement("p");
      p.textContent = sectionText.textContent.trim();
      fragments.push(p);
    }
    fragments.push(block);
    element.replaceWith(...fragments);
  }

  // tools/importer/parsers/hero-banner.js
  function parse6(element, { document }) {
    const img = element.querySelector(".cmp-banner__image img, .cmp-image__image");
    const heading = element.querySelector(".cmp-banner__title h2, .cmp-banner__title h1");
    const text = element.querySelector(".cmp-banner__text p, .cmp-text-ds p");
    const cta = element.querySelector(".cmp-banner__buttons a");
    const cells = [];
    if (img) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(img.cloneNode(true));
      cells.push([imgFrag]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading.cloneNode(true));
    if (text) textFrag.appendChild(text.cloneNode(true));
    if (cta) {
      const p = document.createElement("p");
      p.appendChild(cta.cloneNode(true));
      textFrag.appendChild(p);
    }
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-info.js
  function parse7(element, { document }) {
    const mediaCol = element.querySelector(".cmp-two-columns-card__media");
    const infoCol = element.querySelector(".cmp-two-columns-card__info");
    const col1Frag = document.createDocumentFragment();
    const col2Frag = document.createDocumentFragment();
    if (mediaCol) {
      const img = mediaCol.querySelector("img");
      if (img) col1Frag.appendChild(img.cloneNode(true));
    }
    if (infoCol) {
      const heading = infoCol.querySelector(".cmp-two-columns-card__title h2, .cmp-title__text");
      if (heading) {
        const h2 = document.createElement("h2");
        h2.textContent = heading.textContent.trim();
        col2Frag.appendChild(h2);
      }
      const text = infoCol.querySelector(".cmp-two-columns-card__text p, .cmp-text p");
      if (text) {
        const p = document.createElement("p");
        p.textContent = text.textContent.trim();
        col2Frag.appendChild(p);
      }
      const buttons = infoCol.querySelectorAll(".cmp-two-columns-card__buttons a");
      buttons.forEach((btn) => {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = btn.getAttribute("href") || btn.href || "";
        const btnImg = btn.querySelector("img");
        if (btnImg) {
          a.appendChild(btnImg.cloneNode(true));
        } else {
          a.textContent = btn.textContent.trim();
          if (btn.title) a.title = btn.title;
        }
        p.appendChild(a);
        col2Frag.appendChild(p);
      });
    }
    const cells = [[col1Frag, col2Frag]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-info", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse8(element, { document }) {
    const cards = element.querySelectorAll(".cmp-info-cards-card");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".cmp-info-cards-card__image img");
      const imgFrag = document.createDocumentFragment();
      if (img) {
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(img.cloneNode(true));
      }
      const title = card.querySelector(".cmp-info-cards-card__title h3, h3");
      const cta = card.querySelector(".cmp-info-cards-card__cta a, ds-link-button");
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        textFrag.appendChild(h3);
      }
      if (cta) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = cta.getAttribute("href") || cta.href || "";
        a.textContent = cta.textContent.trim();
        p.appendChild(a);
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const sectionHeading = element.querySelector(".cmp-info-cards__top h2, :scope > section > .cmp-info-cards__container > .cmp-info-cards__top h2");
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    if (sectionHeading) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionHeading.textContent.trim();
      element.replaceWith(h2, block);
    } else {
      element.replaceWith(block);
    }
  }

  // tools/importer/transformers/cupra-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="onetrust"]',
        ".seatComponents-banner",
        "#INDshadowRootWrap",
        "ds-theme-provider",
        '[class*="stratuscx"]'
      ]);
      element.querySelectorAll('img[src*="omtrdc.net"], img[src*="d3.sc.omtrdc"]').forEach((img) => {
        img.remove();
      });
      element.querySelectorAll('a[href*="omtrdc.net"]').forEach((a) => {
        a.remove();
      });
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        ".cmp-global-header",
        ".cmp-global-top",
        "nav.cmp-global-navigation",
        ".secondary",
        "footer",
        ".cmp-global-footer",
        ".cmp-prefooter",
        ".go-app",
        "noscript",
        "iframe",
        "link",
        "source"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("data-analytics");
        el.removeAttribute("onclick");
      });
    }
  }

  // tools/importer/transformers/cupra-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const sections = [...template.sections].reverse();
      sections.forEach((section, reverseIdx) => {
        const originalIdx = template.sections.length - 1 - reverseIdx;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (originalIdx > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-electric-hybrid-overview.js
  var parsers = {
    "hero-dark": parse,
    "cards-specs": parse2,
    "columns-comparison": parse3,
    "cards-icon": parse4,
    "carousel-features": parse5,
    "hero-banner": parse6,
    "columns-info": parse7,
    "cards-article": parse8
  };
  var PAGE_TEMPLATE = {
    name: "electric-hybrid-overview",
    description: "Electric and hybrid vehicle overview page with hero, model comparison cards, feature highlights, CTA banners, and informational columns",
    urls: [
      "https://www.cupraofficial.co.uk/electric-and-hybrid"
    ],
    blocks: [
      {
        name: "hero-dark",
        instances: [".hero-ev"]
      },
      {
        name: "cards-specs",
        instances: [".model-table"]
      },
      {
        name: "columns-comparison",
        instances: [".info-cards.base-container:has(.cmp-info-cards--extended-cards)"]
      },
      {
        name: "cards-icon",
        instances: [".icon-cards"]
      },
      {
        name: "carousel-features",
        instances: [".smooth-vertical-slide"]
      },
      {
        name: "hero-banner",
        instances: [
          ".banner.component:has(.cmp-banner__title #title-266dfc4662)",
          ".banner.component:has(.cmp-banner__title #title-9ce16d5ee3)"
        ]
      },
      {
        name: "columns-info",
        instances: [
          ".two-columns:has(#title-510ce9a691)",
          ".two-columns:has(#title-225ca081de)"
        ]
      },
      {
        name: "cards-article",
        instances: [".info-cards.base-container:has(.cmp-info-cards--mini-cards)"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".hero-ev",
        style: null,
        blocks: ["hero-dark"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Model Comparison",
        selector: ".model-table",
        style: "dark",
        blocks: ["cards-specs"],
        defaultContent: [".cmp-model-table__title h2"]
      },
      {
        id: "section-3",
        name: "EV vs PHEV Comparison",
        selector: ".info-cards.base-container:has(.cmp-info-cards--extended-cards)",
        style: "dark",
        blocks: ["columns-comparison"],
        defaultContent: [".cmp-info-cards--extended-cards .cmp-info-cards__top"]
      },
      {
        id: "section-4",
        name: "Find Your EV",
        selector: ".icon-cards",
        style: "dark",
        blocks: ["cards-icon"],
        defaultContent: [".cmp-icon-cards__top h2"]
      },
      {
        id: "section-5",
        name: "Advantages",
        selector: ".smooth-vertical-slide",
        style: "dark",
        blocks: ["carousel-features"],
        defaultContent: [".cmp-smooth-vertical-slide__top"]
      },
      {
        id: "section-6",
        name: "Test Drive Banner",
        selector: ".banner.component:has(.cmp-banner__title #title-266dfc4662)",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Charging Map and CUPRA Connect",
        selector: [
          ".two-columns:has(#title-510ce9a691)",
          ".two-columns:has(#title-225ca081de)"
        ],
        style: "dark",
        blocks: ["columns-info"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "More EV Info Cards",
        selector: ".info-cards.base-container:has(.cmp-info-cards--mini-cards)",
        style: "dark",
        blocks: ["cards-article"],
        defaultContent: [".cmp-info-cards--mini-cards .cmp-info-cards__top h2"]
      },
      {
        id: "section-9",
        name: "FAQs Banner",
        selector: ".banner.component:has(.cmp-banner__title #title-9ce16d5ee3)",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-10",
        name: "Disclaimer",
        selector: ".disclaimer",
        style: "dark",
        blocks: [],
        defaultContent: [".cmp-disclaimer__text"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_electric_hybrid_overview_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_electric_hybrid_overview_exports);
})();
