import { AuthService } from "../../service/auth-service.js";
import { AuthenticatedUser } from "../../types.js";

const getInputValue = (id: string): string => {
  const element = document.getElementById(id);
  if (!(element instanceof HTMLInputElement)) {
    throw new Error(`${id} input not found`);
  }

  return element.value;
};

const clearInput = (id: string): void => {
  const element = document.getElementById(id);
  if (element instanceof HTMLInputElement) {
    element.value = "";
  }
};

export class AuthScreen {
  #authService: AuthService;

  constructor(authService: AuthService) {
    this.#authService = authService;
  }

  signIn(): AuthenticatedUser | null {
    const inputEmail = getInputValue("email");
    if (inputEmail.includes("@") === false) {
      alert("올바른 이메일 형식이 아닙니다.");
      return null;
    }

    const inputPassword = getInputValue("password");
    if (inputPassword.length < 4) {
      alert("비밀번호는 최소 4자 이상입니다.");
      return null;
    }

    const user = this.#authService.signIn(inputEmail, inputPassword);
    if (user === null) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      return null;
    }

    alert("로그인 성공");
    return user;
  }

  signUp(): boolean {
    const inputEmail = getInputValue("new-email");
    if (inputEmail.includes("@") === false) {
      alert("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    const inputPassword = getInputValue("new-password");
    if (inputPassword.length < 4) {
      alert("비밀번호는 최소 4자 이상입니다.");
      return false;
    }

    const inputUsername = getInputValue("new-username");
    if (inputUsername.length < 1) {
      alert("이름은 최소 1자 이상입니다.");
      return false;
    }

    const isSignedUp = this.#authService.signUp(
      inputEmail,
      inputPassword,
      inputUsername,
    );
    if (isSignedUp === false) {
      alert("이미 존재하는 계정입니다.");
      return false;
    }

    clearInput("new-email");
    clearInput("new-password");
    clearInput("new-username");
    alert("회원 가입에 성공했어요.");
    return true;
  }
}
