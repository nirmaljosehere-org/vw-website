/* eslint-disable */
/* global WebImporter */
/** Parser for cards-icon. Base: cards. Source: https://www.cupraofficial.co.uk/electric-and-hybrid. */
export default function parse(element, { document }) {
  // Container block: each card = 1 row with 2 columns (image | text)
  // Icon cards have no real images, so image column will be empty
  const cards = element.querySelectorAll('.cmp-icon-cards-card');
  const cells = [];

  cards.forEach((card) => {
    // Column 1: image (field: image) - empty for icon cards
    const imgFrag = document.createDocumentFragment();

    // Column 2: text (field: text) - title + description + CTA
    const title = card.querySelector('.cmp-icon-cards-card__title h3, h3');
    const text = card.querySelector('.cmp-icon-cards-card__text p, .cmp-text-ds p');
    const cta = card.querySelector('.cmp-icon-cards-card__cta a');

    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      textFrag.appendChild(h3);
    }
    if (text) {
      const p = document.createElement('p');
      p.textContent = text.textContent.trim();
      textFrag.appendChild(p);
    }
    if (cta) {
      const p = document.createElement('p');
      p.appendChild(cta.cloneNode(true));
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  // Extract default content heading before replacing
  const sectionHeading = element.querySelector('.cmp-icon-cards__top h2, :scope > section > .cmp-icon-cards__container > .cmp-icon-cards__top h2');

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-icon', cells });

  if (sectionHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionHeading.textContent.trim();
    element.replaceWith(h2, block);
  } else {
    element.replaceWith(block);
  }
}
