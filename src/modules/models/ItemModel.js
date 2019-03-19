export default class ItemModel {
  /**
   * @param {string} text
   * @param {boolean} isCompleted
   * @return {object}
   */
  constructor(text, isCompleted = false) {
    let itemId = 0;
    this.item = {
      id: (itemId += 1),
      name: text,
      completed: isCompleted
    };
  }
}
