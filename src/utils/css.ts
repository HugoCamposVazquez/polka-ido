import { css as cssClassname, cx } from 'emotion';
import postcss from 'postcss';
// @ts-ignore
import postcssJs from 'postcss-js';

const cssStyle = (cssText: TemplateStringsArray, ...values: string[]) => {
  const combinedCss = cssText.reduce((acc, value, index) => {
    return acc + value + (values[index] ? values[index] : '');
  }, '');
  const root = postcss.parse(combinedCss);

  return postcssJs.objectify(root);
};

export const cs = (...cssStyles: object[]) => {
  return Object.assign({}, ...cssStyles);
};

export { cx };
export const styled = { cssStyle, cssClassName: cssClassname };
