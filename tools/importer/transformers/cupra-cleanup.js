/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: CUPRA site cleanup.
 * Selectors from captured DOM of https://www.cupraofficial.co.uk/electric-and-hybrid
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie/consent overlays and browser support banner (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="onetrust"]',
      '.seatComponents-banner',
      '#INDshadowRootWrap',
      'ds-theme-provider',
      '[class*="stratuscx"]',
    ]);

    // Remove tracking pixel images (seat.d3.sc.omtrdc.net) that contaminate text content
    element.querySelectorAll('img[src*="omtrdc.net"], img[src*="d3.sc.omtrdc"]').forEach((img) => {
      img.remove();
    });

    // Remove anchor tags wrapping tracking pixels
    element.querySelectorAll('a[href*="omtrdc.net"]').forEach((a) => {
      a.remove();
    });

    // Remove Twitter, Bing, and other tracking pixel images
    element.querySelectorAll(
      'img[src*="t.co/i/adsct"], img[src*="analytics.twitter.com"], img[src*="bat.bing.com"]',
    ).forEach((img) => {
      const parent = img.closest('p');
      if (parent && parent.querySelectorAll('img').length === parent.childNodes.length) {
        parent.remove();
      } else {
        img.remove();
      }
    });

    // Remove "Manage Cookies" buttons/text left by consent dialogs
    element.querySelectorAll('button, span, p, ds-button').forEach((el) => {
      if (el.textContent.trim() === 'Manage Cookies' || el.textContent.trim() === 'MANAGE COOKIES') {
        el.remove();
      }
    });
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      'header',
      '.cmp-global-header',
      '.cmp-global-top',
      'nav.cmp-global-navigation',
      '.secondary',
      'footer',
      '.cmp-global-footer',
      '.cmp-prefooter',
      '.go-app',
      'noscript',
      'iframe',
      'link',
      'source',
    ]);

    // Clean tracking and data attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('data-analytics');
      el.removeAttribute('onclick');
    });
  }
}
