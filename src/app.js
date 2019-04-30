/* eslint-disable prettier/prettier */
import TodoListModel from './models/TodoListModel';
import TodoItemModel from './models/TodoItemModel';
import { createElement, renderElement } from './utils/createTodoElement';

export default class App {
  /**
   * @constructor
   */
  constructor() {
    this.todoListModel = new TodoListModel();
  }

  mounted() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');

    // Changeイベントリスナーを登録
    this.todoListModel.onChange(() => {
      const todoListElement = createElement`<ul />`;
      const todoItemList = this.todoListModel.getTodoItemList();

      todoItemList.forEach(todoItem => {
        const todoItemElement = todoItem.completed
          ? createElement`<li><input type="checkbox" class="checkbox" checked>
            <s>${todoItem.title}</s>
            <button class="delete">x</button>
          </li>`
          : createElement`<li><input type="checkbox" class="checkbox">
            ${todoItem.title}
            <button class="delete">x</button>
          </li>`;

        // チェックボックスがトグルしたときのイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
        inputCheckboxElement.addEventListener('change', () => {
          this.todoListModel.updateTodo({
            id: todoItem.id,
            completed: !todoItem.completed
          });
        });

        // 削除ボタン(x)をクリック時にTodoListModelからアイテムを削除するリスナー関数を登録
        const deleteButtonElement = todoItemElement.querySelector('.delete');
        deleteButtonElement.addEventListener('click', () => {
          this.todoListModel.deleteTodo({
            id: todoItem.id,
          });
        });

        todoListElement.appendChild(todoItemElement);
      });
      // containerElementの中身をtodoListElementで上書きする
      renderElement(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${
        this.todoListModel.totalCount
      }`;
    });

    formElement.addEventListener('submit', event => {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する（モデルが変更される）
      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false
        })
      );
      inputElement.value = '';
    });
  }
}
