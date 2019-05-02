/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
import { createElement } from '../utils/createTodoElement';

export default class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {Object} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string)}} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */

  createTodoItemElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? createElement`<li class="list-item-done list-item">
      <label class="list-item-label">
        <input type="checkbox" class="checkbox list-item-checkbox" checked>
        <span class="list-item-text">${todoItem.title}</span>
      </label>
      <button class="delete button-circle button-delete">
        <i class="material-icons">cancel</i>
      </button>
    </li>`
      : createElement`<li class="list-item">
      <label class="list-item-label">
        <input type="checkbox" class="checkbox list-item-checkbox">
        <span class="list-item-text">${todoItem.title}</span>
      </label>
      <button class="delete button-circle button-delete">
        <i class="material-icons">cancel</i>
      </button>
    </li>`;

    // チェックボックスがトグルしたときのイベントリスナー
    const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
    inputCheckboxElement.addEventListener('change', () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    // 削除ボタン(x)をクリック時のイベントリスナー
    const deleteButtonElement = todoItemElement.querySelector('.delete');
    deleteButtonElement.addEventListener('click', () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });

    return todoItemElement;
  }
}
