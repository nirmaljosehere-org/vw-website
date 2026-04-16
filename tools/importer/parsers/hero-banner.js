/* eslint-disable */
/* global WebImporter */
/** Parser for hero-banner. Base: hero. Source: https://www.cupraofficial.co.uk/electric-and-hybrid. */
export default function parse(element, { document }) {
  // Extract background image from .cmp-banner__image
  const img = element.querySelector('.cmp-banner__image img, .cmp-image__image');

  // Extract heading, text, and CTA from .cmp-banner__content
  const heading = element.querySelector('.cmp-banner__title h2, .cmp-banner__title h1');
  const text = element.querySelector('.cmp-banner__text p, .cmp-text-ds p');
  const cta = element.querySelector('.cmp-banner__buttons a');

  const cells = [];

  // Row 1: image (field: image, collapsed: imageAlt)
  if (img) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(img.cloneNode(true));
    cells.push([imgFrag]);
  }

  // Row 2: text (field: text) - heading + paragraph + CTA
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading.cloneNode(true));
  if (text) textFrag.appendChild(text.cloneNode(true));
  if (cta) {
    const p = document.createElement('p');
    p.appendChild(cta.cloneNode(true));
    textFrag.appendChild(p);
  }
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
