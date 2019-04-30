import EventEmitter from '../EventEmitter';

export default class TodoListModel extends EventEmitter {
  /**
   * @constructor
   * @param {Array} [itemList] 初期アイテム一覧（デフォルトは空の配列）
   */
  constructor(itemList = []) {
    super();
    this.itemList = itemList;
  }

  /**
   * TodoItemの合計数を返す
   *
   * @returns {number}
   */
  get totalCount() {
    return this.itemList.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   *
   * @returns {Array}
   */
  getTodoItemList() {
    return this.itemList;
  }

  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   *
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener('change', listener);
  }

  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange() {
    this.emit('change');
  }

  /**
   * TodoItemを追加する
   *
   * @param {Object} todoItem
   */
  addTodo(todoItem) {
    this.itemList.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{ id:number, completed: boolean }}
   */
  updateTodo({ id, completed }) {
    const todoItem = this.itemList.find(item => item.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }
}
