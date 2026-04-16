/* eslint-disable */
/* global WebImporter */
/** Parser for hero-dark. Base: hero. Source: https://www.cupraofficial.co.uk/electric-and-hybrid. */
export default function parse(element, { document }) {
  // Extract image from .cmp-hero-ev__image
  const img = element.querySelector('.cmp-hero-ev__image img, .cmp-image__image');

  // Extract heading and text from .cmp-hero-ev__container
  const heading = element.querySelector('.cmp-hero-ev__title h1, h1');
  const text = element.querySelector('.cmp-hero-ev__text p, .cmp-text-ds p');

  const cells = [];

  // Row 1: image (field: image, collapsed: imageAlt)
  if (img) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(img.cloneNode(true));
    cells.push([imgFrag]);
  }

  // Row 2: text (field: text) - heading + paragraph combined
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading.cloneNode(true));
  if (text) textFrag.appendChild(text.cloneNode(true));
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-dark', cells });
  element.replaceWith(block);
}
