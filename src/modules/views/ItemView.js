import ItemAdd from "../controllers/ItemAdd";

export default class ItemView {
  mounted() {
    // use
    this.TodoAdd = new ItemAdd();

    const addItemInputElement = document.querySelector(".js-addItem-value");
    const addItemButtonElement = document.querySelector(".js-addItem-button");

    addItemButtonElement.addEventListener("click", () => {
      this.TodoAdd.addTodoList(addItemInputElement.value);
    });
  }
}
