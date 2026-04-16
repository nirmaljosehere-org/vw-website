/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: CUPRA section breaks and section-metadata.
 * Runs in afterTransform only. Uses payload.template.sections.
 * Selectors from captured DOM of https://www.cupraofficial.co.uk/electric-and-hybrid
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };

    // Process sections in reverse order to avoid DOM position shifts
    const sections = [...template.sections].reverse();

    sections.forEach((section, reverseIdx) => {
      const originalIdx = template.sections.length - 1 - reverseIdx;

      // Find the section element using selector(s)
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add section break (hr) before each section except the first
      if (originalIdx > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
