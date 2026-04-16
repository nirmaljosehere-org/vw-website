/* eslint-disable */
/* global WebImporter */
/** Parser for columns-info. Base: columns. Source: https://www.cupraofficial.co.uk/electric-and-hybrid. */
export default function parse(element, { document }) {
  // Columns blocks: NO field hints (per xwalk hinting rules)
  // Two-column layout: image | text+CTA
  const mediaCol = element.querySelector('.cmp-two-columns-card__media');
  const infoCol = element.querySelector('.cmp-two-columns-card__info');

  const col1Frag = document.createDocumentFragment();
  const col2Frag = document.createDocumentFragment();

  // Column 1: Image
  if (mediaCol) {
    const img = mediaCol.querySelector('img');
    if (img) col1Frag.appendChild(img.cloneNode(true));
  }

  // Column 2: Heading + Text + CTA/App store links
  if (infoCol) {
    const heading = infoCol.querySelector('.cmp-two-columns-card__title h2, .cmp-title__text');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      col2Frag.appendChild(h2);
    }

    const text = infoCol.querySelector('.cmp-two-columns-card__text p, .cmp-text p');
    if (text) {
      const p = document.createElement('p');
      p.textContent = text.textContent.trim();
      col2Frag.appendChild(p);
    }

    // CTA buttons or app store image links
    const buttons = infoCol.querySelectorAll('.cmp-two-columns-card__buttons a');
    buttons.forEach((btn) => {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = btn.getAttribute('href') || btn.href || '';
      // Check if it's an image link (app store badges)
      const btnImg = btn.querySelector('img');
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-info', cells });
  element.replaceWith(block);
}
