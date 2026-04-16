/* eslint-disable */
/* global WebImporter */
/** Parser for cards-article. Base: cards. Source: https://www.cupraofficial.co.uk/electric-and-hybrid. */
export default function parse(element, { document }) {
  // Container block: each card = 1 row with 2 columns (image | text)
  const cards = element.querySelectorAll('.cmp-info-cards-card');
  const cells = [];

  cards.forEach((card) => {
    // Column 1: image (field: image, collapsed: imageAlt)
    const img = card.querySelector('.cmp-info-cards-card__image img');
    const imgFrag = document.createDocumentFragment();
    if (img) {
      imgFrag.appendChild(document.createComment(' field:image '));
      imgFrag.appendChild(img.cloneNode(true));
    }

    // Column 2: text (field: text) - title + CTA link
    const title = card.querySelector('.cmp-info-cards-card__title h3, h3');
    const cta = card.querySelector('.cmp-info-cards-card__cta a, ds-link-button');

    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (title) {
      const h3 = document.createElement('h3');
      // Title may contain a link - get text content
      h3.textContent = title.textContent.trim();
      textFrag.appendChild(h3);
    }
    if (cta) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = cta.getAttribute('href') || cta.href || '';
      a.textContent = cta.textContent.trim();
      p.appendChild(a);
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  // Extract default content heading before replacing
  const sectionHeading = element.querySelector('.cmp-info-cards__top h2, :scope > section > .cmp-info-cards__container > .cmp-info-cards__top h2');

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });

  if (sectionHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionHeading.textContent.trim();
    element.replaceWith(h2, block);
  } else {
    element.replaceWith(block);
  }
}
