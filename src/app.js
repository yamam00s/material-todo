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
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach(item => {
        const todoItemElement = createElement`<li>${item.title}</li>`;
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
