import { BehaviorSubject } from "rxjs";

class CategoriesBrowseState {
  constructor() {
    this.currentPosition = new BehaviorSubject();
  }
}

export const categoriesBrowseState = new CategoriesBrowseState();
