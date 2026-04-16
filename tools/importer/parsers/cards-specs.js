/* eslint-disable */
/* global WebImporter */
/** Parser for cards-specs. Base: cards. Source: https://www.cupraofficial.co.uk/electric-and-hybrid. */
export default function parse(element, { document }) {
  // Container block: each card = 1 row with 2 columns (image | text)
  const cards = element.querySelectorAll('.cmp-model-table-card, article.cmp-model-table-card');
  const cells = [];

  cards.forEach((card) => {
    // Column 1: image (field: image, collapsed: imageAlt)
    const img = card.querySelector('.cmp-model-table-card__image img');
    const imgFrag = document.createDocumentFragment();
    if (img) {
      imgFrag.appendChild(document.createComment(' field:image '));
      imgFrag.appendChild(img.cloneNode(true));
    }

    // Column 2: text (field: text) - title + type + specs + link
    const title = card.querySelector('.cmp-model-table-card__title');
    const typeLabel = card.querySelector('.cmp-model-table-card__description p, .cmp-text-ds p');
    const rows = card.querySelectorAll('.cmp-model-table-card__row');
    const link = card.querySelector('.cmp-model-table-card__cta a, a');

    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      textFrag.appendChild(h3);
    }
    if (typeLabel) {
      const p = document.createElement('p');
      p.textContent = typeLabel.textContent.trim();
      textFrag.appendChild(p);
    }
    rows.forEach((row) => {
      const label = row.querySelector('.cmp-model-table-card__label');
      const value = row.querySelector('.cmp-model-table-card__value');
      if (label && value) {
        const p = document.createElement('p');
        const unit = value.querySelector('.cmp-model-table-card__unit');
        p.textContent = `${label.textContent.trim()}: ${value.textContent.trim()}`;
        textFrag.appendChild(p);
      }
    });
    if (link) {
      const p = document.createElement('p');
      p.appendChild(link.cloneNode(true));
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  // Extract default content heading before replacing
  const sectionHeading = element.querySelector('.cmp-model-table__title h2, :scope > section > .cmp-model-table__container > .cmp-model-table__top h2');

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-specs', cells });

  if (sectionHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionHeading.textContent.trim();
    element.replaceWith(h2, block);
  } else {
    element.replaceWith(block);
  }
}
