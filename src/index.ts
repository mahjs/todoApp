// This file is the bootstrap file for the whole app

import App from "./app";
class initApp {
  public appendTo: string;
  public form: any;

  constructor() {
    this.form = new App();
    this.appendTo = this.form.createForm();
  }

  mountApp() {
    document.getElementById("app").innerHTML = this.appendTo;
    this.form.addTodoEvent();
  }
}

new initApp().mountApp();
