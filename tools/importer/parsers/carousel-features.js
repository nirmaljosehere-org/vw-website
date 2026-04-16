/* eslint-disable */
/* global WebImporter */
/** Parser for carousel-features. Base: carousel. Source: https://www.cupraofficial.co.uk/electric-and-hybrid. */
export default function parse(element, { document }) {
  // Container block: each slide = 1 row with 2 columns (image | content)
  // Model fields: media_image (collapsed: media_imageAlt), content_text
  const slides = element.querySelectorAll('.cmp-smooth-vertical-slide-item, article.cmp-smooth-vertical-slide-item');
  const cells = [];

  slides.forEach((slide) => {
    // Column 1: background image (field: media_image, collapsed: media_imageAlt)
    const img = slide.querySelector('.cmp-smooth-vertical-slide-item__image img, .cmp-image__image');
    const imgFrag = document.createDocumentFragment();
    if (img) {
      imgFrag.appendChild(document.createComment(' field:media_image '));
      imgFrag.appendChild(img.cloneNode(true));
    }

    // Column 2: content text (field: content_text) - heading + text
    const heading = slide.querySelector('.cmp-smooth-vertical-slide-item__title h3, h3');
    const text = slide.querySelector('.cmp-smooth-vertical-slide-item__text p, .cmp-text-ds p');

    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content_text '));
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      contentFrag.appendChild(h3);
    }
    if (text) {
      const p = document.createElement('p');
      p.textContent = text.textContent.trim();
      contentFrag.appendChild(p);
    }

    cells.push([imgFrag, contentFrag]);
  });

  // Extract default content (heading + intro text) before replacing
  const sectionTop = element.querySelector('.cmp-smooth-vertical-slide__top');
  const sectionHeading = sectionTop ? sectionTop.querySelector('h2') : null;
  const sectionText = sectionTop ? sectionTop.querySelector('p') : null;

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-features', cells });

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
