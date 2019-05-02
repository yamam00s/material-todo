/* eslint-disable class-methods-use-this */
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
      ? createElement`<li><input type="checkbox" class="checkbox" checked>
      <s>${todoItem.title}</s>
      <button class="delete">x</button>
    </li>`
      : createElement`<li><input type="checkbox" class="checkbox">
      ${todoItem.title}
      <button class="delete">x</button>
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
