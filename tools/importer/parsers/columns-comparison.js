/* eslint-disable */
/* global WebImporter */
/** Parser for columns-comparison. Base: columns. Source: https://www.cupraofficial.co.uk/electric-and-hybrid. */
export default function parse(element, { document }) {
  // Columns blocks: NO field hints (per xwalk hinting rules)
  // 2 side-by-side cards, each becomes a column
  const cards = element.querySelectorAll('.cmp-info-cards-card');

  const col1Frag = document.createDocumentFragment();
  const col2Frag = document.createDocumentFragment();

  cards.forEach((card, idx) => {
    const frag = idx === 0 ? col1Frag : col2Frag;

    // Image
    const img = card.querySelector('.cmp-info-cards-card__image img');
    if (img) frag.appendChild(img.cloneNode(true));

    // Title
    const title = card.querySelector('.cmp-info-cards-card__title h3, h3');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      frag.appendChild(h3);
    }

    // Feature items (h4 + p pairs)
    const featureGrid = card.querySelector('.cmp-info-cards-card__content .aem-Grid, .cmp-info-cards-card__content');
    if (featureGrid) {
      const featureTitles = featureGrid.querySelectorAll('h4');
      const featureTexts = featureGrid.querySelectorAll('.text p, .cmp-text-ds p');

      featureTitles.forEach((ft, i) => {
        const h4 = document.createElement('h4');
        h4.textContent = ft.textContent.trim();
        frag.appendChild(h4);
        if (featureTexts[i]) {
          const p = document.createElement('p');
          p.textContent = featureTexts[i].textContent.trim();
          frag.appendChild(p);
        }
      });
    }

    // CTA link
    const cta = card.querySelector('.cmp-info-cards-card__cta a, ds-link-button');
    if (cta) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = cta.getAttribute('href') || cta.href || '';
      a.textContent = cta.textContent.trim();
      p.appendChild(a);
      frag.appendChild(p);
    }
  });

  // Extract default content (heading + intro text) before replacing
  const sectionTop = element.querySelector('.cmp-info-cards__top');
  const sectionHeading = sectionTop ? sectionTop.querySelector('h2') : null;
  const sectionText = sectionTop ? sectionTop.querySelector('p') : null;

  const cells = [[col1Frag, col2Frag]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-comparison', cells });

  const fragments = [];
  if (sectionHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionHeading.textContent.trim();
    fragments.push(h2);
  }
  if (sectionText) {
    const p = document.createElement('p');
    p.textContent = sectionText.textContent.trim();
    fragments.push(p);
  }
  fragments.push(block);
  element.replaceWith(...fragments);
}
