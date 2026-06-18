import { AuthenticatedUser } from "../../types.js";
import { AuthScreen } from "./auth-screen.js";
import { MemoScreen } from "./memo-screen.js";

export class RootScreen {
  #authScreen: AuthScreen;
  #memoScreen: MemoScreen;

  constructor(authScreen: AuthScreen, memoScreen: MemoScreen) {
    this.#authScreen = authScreen;
    this.#memoScreen = memoScreen;
  }

  run(): void {
    let me: AuthenticatedUser | undefined;

    while (true) {
      while (me === undefined) {
        const choice = this.#authScreen.showAuthUI();
        if (choice === "0") {
          me = this.#authScreen.showSignInUI();
        } else if (choice === "1") {
          this.#authScreen.showSignUpUI();
        } else if (choice === "q") {
          process.exit(0);
        } else {
          this.#authScreen.showInvalidInputUI();
        }
      }

      console.log();

      while (me !== undefined) {
        console.log(`[${me.username}의 메모장]`);
        const choice = this.#memoScreen.showMenuUI();

        if (choice === "0") {
          this.#memoScreen.showAllMemosUI(me.credential);
        } else if (choice === "1") {
          this.#memoScreen.showCreateMemoUI(me.credential);
        } else if (choice === "2") {
          me = undefined;
          break;
        } else if (choice === "q") {
          process.exit(0);
        } else {
          console.log("잘못된 입력입니다.\n");
        }
      }
    }
  }
}
