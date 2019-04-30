const helpers = {
  escapeSpecialChars(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  htmlToTemplateElement(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.firstElementChild;
  }
};

/**
 * HTML文字列からDOM Nodeを作成して返すタグ関数
 *
 * @param {Array} Strings
 * @param {RestParameters} values
 * @return {Element}
 */
export function createElement(strings, ...values) {
  const htmlString = strings.reduce((prev, current, index) => {
    const value = values[index - 1];
    // 文字列の場合のみエスケープ
    if (typeof value === 'string') {
      return prev + helpers.escapeSpecialChars(value);
    }
    return prev + String(value) + current;
  });
  return helpers.htmlToTemplateElement(htmlString);
}

/**
 * コンテナ要素の中身をbodyElementで上書きする
 *
 * @param {Element} bodyElement コンテナ要素の中身となる要素
 * @param {Element} containerElement コンテナ要素
 */
export function renderElement(bodyElement, containerElement) {
  // rootElementの中身を空にする
  // eslint-disable-next-line no-param-reassign
  containerElement.innerHTML = '';
  // rootElementの直下にbodyElementを追加する
  containerElement.appendChild(bodyElement);
}
