/* eslint-disable @typescript-eslint/no-unused-vars */

interface CSSStyleSheet {
  replace(css: string): Promise<this>;

  replaceSync(css: string): void;
}

interface Document {
  adoptedStyleSheets: CSSStyleSheet[] | readonly CSSStyleSheet[] | null;
}

interface ShadowRoot {
  adoptedStyleSheets: CSSStyleSheet[] | readonly CSSStyleSheet[] | null;
}
