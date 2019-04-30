// ユニークなIDを管理する変数
let todoId = 0;

export default class TodoItemModel {
  /**
   * @constructor
   * @param {string} title Todoアイテムのタイトル
   * @param {boolean} completed Todoアイテムが完了済みならばtrue、そうでない場合はfalse
   */
  constructor({ title, completed }) {
    // idは自動的に連番となりそれぞれのインスタンス毎に異なるものとする
    // eslint-disable-next-line no-plusplus
    this.id = todoId++;
    this.title = title;
    this.completed = completed;
  }
}
