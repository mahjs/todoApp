// This file is the bootstrap file for the whole app

import Form from "./form";
class initApp {
  public appendTo: string;
  public form: any;

  constructor() {
    this.form = new Form();
    this.appendTo = this.form.createForm();
  }

  mountApp() {
    document.getElementById("app").innerHTML = this.appendTo;
    this.form.addTodoEvent();
  }
}

new initApp().mountApp();
