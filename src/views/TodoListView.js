/* eslint-disable class-methods-use-this */
import TodoItemView from './TodoItemView';
import { createElement } from '../utils/createTodoElement';

export default class TodoListView {
  /**
   * `todoItemList`に対応するTodoリストのHTML要素を作成して返す
   * @param {Array} todoItems TodoItemModelの配列
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string)}} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
   */
  createTodoListElement(todoItemList, { onUpdateTodo, onDeleteTodo }) {
    const todoListElement = createElement`<ul class="list-contents" />`;
    todoItemList.forEach(todoItem => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createTodoItemElement(todoItem, {
        onUpdateTodo,
        onDeleteTodo
      });
      todoListElement.appendChild(todoItemElement);
    });

    return todoListElement;
  }
}
