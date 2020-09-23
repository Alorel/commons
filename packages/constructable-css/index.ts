import './feature-typedef';

/* eslint-disable no-prototype-builtins */

/** Whether constructable stylesheets are supported or not */
export const SUPPORTS_CONSTRUCTABLE_STYLESHEETS: boolean =
  typeof ShadowRoot !== 'undefined' &&
  typeof CSSStyleSheet !== 'undefined' &&
  ShadowRoot.prototype.hasOwnProperty('adoptedStyleSheets') &&
  CSSStyleSheet.prototype.hasOwnProperty('replace');
