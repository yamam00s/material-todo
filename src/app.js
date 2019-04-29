import { createElement } from './utils/createTodoElement';

export default class App {
  // eslint-disable-next-line class-methods-use-this
  mounted() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');

    // Todoアイテム数
    let todoItemCount = 0;

    formElement.addEventListener('submit', event => {
      // 本来のsubmitイベントの動作を止める
      event.preventDefault();
      // 追加するTodoアイテムの要素(li要素)を作成する
      const todoItemElement = createElement`<li>${inputElement.value}<li>`;
      // Todoアイテムをcontainerに追加する
      containerElement.appendChild(todoItemElement);
      // Todoアイテム数を+1し、表示されてるテキストを更新する
      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      // 入力欄を空文字にしてリセットする
      inputElement.value = '';
    });
  }
}
