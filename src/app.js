import TodoItemModel from './models/TodoItemModel';
import TodoListModel from './models/TodoListModel';
import TodoListView from './views/TodoListView';
import { renderElement } from './utils/createTodoElement';

export default class App {
  /**
   * @constructor
   */
  constructor() {
    this.todoListModel = new TodoListModel();
    this.todoListView = new TodoListView();
  }

  /**
   * Todoを追加時に呼ばれるリスナー関数
   *
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(
      new TodoItemModel({
        title,
        completed: false
      })
    );
  }

  /**
   * Todoの状態を更新時に呼ばれるリスナー関数
   *
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除時に呼ばれるリスナー関数
   *
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  mounted() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');

    // Changeイベントリスナーを登録
    this.todoListModel.onChange(() => {
      const todoItemList = this.todoListModel.getTodoItemList();

      const todoListElement = this.todoListView.createTodoListElement(
        todoItemList,
        {
          onUpdateTodo: ({ id, completed }) => {
            this.handleUpdate({ id, completed });
          },
          onDeleteTodo: ({ id }) => {
            this.handleDelete({ id });
          }
        }
      );
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
      this.handleAdd(inputElement.value);
      inputElement.value = '';
    });
  }
}
