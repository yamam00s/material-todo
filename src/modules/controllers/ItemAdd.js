import ItemModel from "../models/ItemModel";
import createListElement from "../utility/createListElement";

export default class ItemAdd {
  /**
   * @param {object} inputItemTodoName
   */
  addTodoList(inputItem) {
    this.inputItem = new ItemModel(inputItem);
    const todoAddElement = createListElement(this.inputItem);
    const todoListElement = document.querySelector(".js-todoList");
    todoListElement.innerHTML = todoAddElement;
  }
}
