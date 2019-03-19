/**
 * @param {object} itemObjects
 * @return {string}
 */
export default function createElementItemList(itemObject = {}) {
  const isCompleted = itemObject.completed ? "checked" : "";
  const todoItemElement = `
    <li>
      <input class="" type="checkbox"${isCompleted}/>
        ${itemObject.name}
        <button class="" type=button>delete</button>
    </li>
    `;

  return todoItemElement;
}
