import { AuthenticatedUser } from "../../types.js";
import { AuthScreen } from "./auth-screen.js";
import { MemoScreen } from "./memo-screen.js";

const getElement = (id: string): HTMLElement => {
  const element = document.getElementById(id);
  if (element === null) {
    throw new Error(`${id} element not found`);
  }

  return element;
};

export class RootScreen {
  #authScreen: AuthScreen;
  #memoScreen: MemoScreen;
  #screenIds: string[];
  #me: AuthenticatedUser | null;

  constructor(authScreen: AuthScreen, memoScreen: MemoScreen) {
    this.#authScreen = authScreen;
    this.#memoScreen = memoScreen;
    this.#screenIds = ["signin-view", "signup-view", "memo-view"];
    this.#me = null;
  }

  run(): void {
    getElement("goto-signup-btn").addEventListener("click", () => {
      this.showScreen("signup-view");
    });
    getElement("goto-signin-btn").addEventListener("click", () => {
      this.showScreen("signin-view");
    });
    getElement("signin-btn").addEventListener("click", () => {
      this.#me = this.#authScreen.signIn();
      if (this.#me !== null) {
        this.showScreen("memo-view");
        this.#memoScreen.showGrettingMessage(this.#me.username);
      }
    });
    getElement("signup-btn").addEventListener("click", () => {
      const isSuccess = this.#authScreen.signUp();
      if (isSuccess) {
        this.showScreen("signin-view");
      }
    });

    this.showScreen("signin-view");
  }

  showScreen(screenId: string): void {
    for (let i = 0; i < this.#screenIds.length; i++) {
      const screen = getElement(this.#screenIds[i]);
      if (this.#screenIds[i] === screenId) {
        screen.classList.add("active");
      } else {
        screen.classList.remove("active");
      }
    }
  }
}
