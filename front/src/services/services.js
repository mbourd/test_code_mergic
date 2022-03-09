import app from "./app/app.service";
import github from "./github/github.service";

export class services {
  constructor() {
    this.github = new github();
    this.app = new app();
  }
}
