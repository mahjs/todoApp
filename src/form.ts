import {HTML} from "../node_modules/jsx-dom/index";
import "./assets/css/style.css";

interface todo {
  name: string;
  description: string;
  isComplete: boolean;
  lastUpdate: Date;
}

export default class Form {
  private toDos: todo[] = []; //initialize as blank array
  private isEmpty: boolean;
  createForm(): string {
    return `<form>
        <div class="container">
           <h2>TODO LIST</h2>
           <h3>Add Item</h3>
            <div class="input-wrapper">
              <p>
              <input id="new-task-name" name="new-task-name" value="" type="text" placeholder='Name'/>
              </p>
              <p>
              <textarea id="new-task-desc" name="new-task-desc" value="" rows='4' cols='50' placeholder='Description'></textarea>
              </p>
              <button type="button" class="add-btn">Add</button>
            </div>
           <p class="empty">Fields should not be empty</p>
           <h3>Todo</h3>
           <ul id="incomplete-tasks">
           <li style="text-align: center;color: #898888;font-size: 22px;">Schedule your TODO!!</li>
           </ul>
        </div>
     </form>`;
  }
  addTodoEvent(): void {
    document.querySelector(".add-btn").addEventListener("click", (e) => {
      const taskNameElement = <HTMLInputElement>(
        document.getElementById("new-task-name")
      );
      const taskDescElement = <HTMLInputElement>(
        document.getElementById("new-task-desc")
      );
      if (taskNameElement.value && taskDescElement.value) {
        (<HTMLInputElement>document.querySelector(".empty")).style.display =
          "none";
        this.toDos.push({
          name: taskNameElement.value,
          description: taskDescElement.value,
          isComplete: false,
          lastUpdate: new Date(),
        });

        taskNameElement.value = "";
        taskDescElement.value = "";
        this.displayingTaskList();
        this.addEventToTask();
      } else {
        const emptyInput = document.querySelector(".empty") as HTMLInputElement;
        emptyInput.style.display = "block";
      }
    });
  }
  displayingTaskList(): void {
    let liDom: string = "";
    if (this.toDos.length) {
      this.toDos.forEach((li, index) => {
        liDom += `<li class='list-item'>
                    <input type="checkbox" class='checkbox'>
                    <div class='task-item-wrapper'>
                        <span class='item-name ${
                          li.isComplete ? "completed" : ""
                        }'>${li.name}</span>
                        <span class='item-desc ${
                          li.isComplete ? "completed" : ""
                        }'>${li.description}</span>
                        <span class='item-last-update'>${this.formatDate(
                          li.lastUpdate
                        )}</span>
                    </div>
                    <button type="button" class="delete-task">Delete</button>
                 </li>`;
      });
    } else {
      liDom = `<li style="text-align: center;color: #898888;font-size: 22px;">Schedule your TODO!!</li>`;
    }
    document.getElementById("incomplete-tasks").innerHTML = liDom;

    // Settign the checked property of completed tasks
    (
      document.querySelectorAll(".checkbox") as NodeListOf<HTMLInputElement>
    ).forEach((checkbox, index) => {
      const checked = this.toDos[index].isComplete;
      checkbox.checked = checked;
    });
  }
  addEventToTask() {
    let deleteBtn = document.querySelectorAll(".delete-task") as NodeList; // querySelectorAll return nodelist
    let completeBtn: NodeListOf<Element> =
      document.querySelectorAll("li input");
    deleteBtn.forEach((btn: Node, index: number) => {
      btn.addEventListener("click", () => this.deleteTask(index));
    });
    completeBtn.forEach((input: HTMLElement, index: number) => {
      input.addEventListener("change", () => this.completeTask(index));
    });
  }
  deleteTask(id: number): any {
    this.toDos.splice(id, 1);
    this.displayingTaskList();
    this.addEventToTask();
  }
  completeTask(id: number): any {
    const task = this.toDos[id];
    task.isComplete = !task.isComplete;
    task.lastUpdate = new Date();

    this.displayingTaskList();
    this.addEventToTask();
  }

  // Utils
  formatDate(date: Date): string {
    const hour = date.getHours();
    const mins = date.getMinutes();

    const day = date.getDate();
    const monthName = date.toLocaleString("default", {month: "short"});
    const year = date.getFullYear();

    return `${hour}:${mins} - ${day} ${monthName} ${year}`;
  }
}
