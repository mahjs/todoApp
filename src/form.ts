import "./assets/css/style.css";

// This is the main type for each todo item
interface todo {
  name: string;
  description: string;
  isComplete: boolean;
  createdAt: Date;
  lastUpdate?: Date;
}

// This is the main class that make the whole app functionality.
export default class Form {
  //initialize as blank array
  private toDos: todo[] = [];

  private isEmpty: boolean;

  // This method create the form for adding a new todo app
  createForm(): string {
    return `<form>
        <div class="container">
           <h2>TODO LIST</h2>
           <h3>Add Item</h3>
            <div class="input-wrapper">
              <p>
              <input id="new-task-name" name="new-task-name" value="" type="text" placeholder='Title'/>
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

  // This method handles the add button event for adding new todo
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
          createdAt: new Date(),
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

  // This method functionality is to render the todos on the screen and every time
  // any item is updated
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
                        <span class='item-last-update'>createdAt: ${this.formatDate(
                          li.createdAt
                        )}</span>
                        <span class='item-last-update'>
                          updatedAt: ${this.formatDate(li.lastUpdate)}
                        </span>
                    </div>
                    <button type="button" class="delete-task">Delete</button>
                 </li>`;
      });
    } else {
      liDom = `<li style="text-align: center;color: #898888;font-size: 22px;">Schedule your TODO!!</li>`;
    }
    document.getElementById("incomplete-tasks").innerHTML = liDom;

    // Setting the checked property of completed tasks
    (
      document.querySelectorAll(".checkbox") as NodeListOf<HTMLInputElement>
    ).forEach((checkbox, index) => {
      const checked = this.toDos[index].isComplete;
      checkbox.checked = checked;
    });
  }

  // This method adds the delete and updated event handlere to every item in the showed list
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

  // This method actually delete a tast based on it's index
  deleteTask(id: number): any {
    this.toDos.splice(id, 1);
    this.displayingTaskList();
    this.addEventToTask();
  }

  // This method mark a tast as completed based on it's index
  completeTask(id: number): any {
    const task = this.toDos[id];
    task.isComplete = !task.isComplete;
    task.lastUpdate = new Date();

    this.displayingTaskList();
    this.addEventToTask();
  }

  // Utils

  // Format the date
  formatDate(date: Date): string {
    if (!date) return "-";
    const hour = date.getHours();
    const mins = date.getMinutes().toString().padStart(2, "0");

    const day = date.getDate();
    const monthName = date.toLocaleString("default", {month: "short"});
    const year = date.getFullYear();

    return `${hour}:${mins} - ${day} ${monthName} ${year}`;
  }
}
