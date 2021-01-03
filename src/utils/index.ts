import { pathToRegexp } from 'path-to-regexp';

/**
 *
 *
 * @param {[]} layouts
 * @param {string} pathname
 * @returns
 */
export const queryLayout = (layouts: [], pathname: string) => {
  let result = '';
  for (let layout of layouts) {
    if (layout.include) {
      for (let regexp of layout.include) {
        if (matchPathRegexp(regexp, pathname)) {
          result = layout.name;
        }
      }
    }
  }
  return result;
};

/**
 *
 *
 * @param {*} regexp
 * @param {string} pathanme
 * @returns
 */
export function matchPathRegexp(regexp: any, pathanme: string) {
  return pathToRegexp(regexp).exec(pathanme);
}
